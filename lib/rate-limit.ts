/**
 * Rate Limiting léger — basé sur Map en mémoire
 * Pour la production avec plusieurs instances, utiliser Upstash Redis
 * Limite : nombre de requêtes par fenêtre de temps
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  /** Nombre maximum de requêtes autorisées */
  maxRequests: number;
  /** Fenêtre de temps en millisecondes */
  windowMs: number;
}

/**
 * Vérifier si une clé (IP, userId, etc.) a dépassé la limite
 * @returns true si la requête est autorisée, false si bloquée
 */
export function checkRateLimit(
  key: string,
  options: RateLimitOptions
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  // Nettoyer les entrées expirées périodiquement
  if (rateLimitMap.size > 10000) {
    for (const [k, v] of rateLimitMap) {
      if (v.resetAt < now) rateLimitMap.delete(k);
    }
  }

  // Nouvelle entrée ou fenêtre expirée
  if (!entry || entry.resetAt < now) {
    const resetAt = now + options.windowMs;
    rateLimitMap.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: options.maxRequests - 1, resetAt };
  }

  // Incrémenter le compteur
  entry.count++;

  if (entry.count > options.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  return {
    allowed: true,
    remaining: options.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Limites prédéfinies pour les routes sensibles
 */
export const RATE_LIMITS = {
  login: { maxRequests: 5, windowMs: 15 * 60 * 1000 },       // 5 tentatives / 15 min
  register: { maxRequests: 3, windowMs: 60 * 60 * 1000 },    // 3 inscriptions / heure
  passwordReset: { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 resets / heure
  api: { maxRequests: 100, windowMs: 60 * 1000 },             // 100 requêtes / min
} as const;
