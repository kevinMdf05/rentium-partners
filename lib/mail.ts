import { Resend } from "resend";

/**
 * Client Resend pour l'envoi d'emails transactionnels
 * Limite gratuite : 3 000 emails/mois, 100/jour
 */
export const resend = new Resend(process.env.RESEND_API_KEY);

/** Adresse expéditeur par défaut */
const FROM_EMAIL = "Rentium Partners <noreply@rentiumpartners.fr>";

/**
 * Email de bienvenue après inscription
 */
export async function sendWelcomeEmail(to: string, prenom: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Bienvenue chez Rentium Partners, ${prenom}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAFAF9;">
        <div style="background: #080808; padding: 40px 32px; text-align: center;">
          <h1 style="color: #C8A96E; font-size: 24px; margin: 0;">Rentium Partners</h1>
        </div>
        <div style="padding: 40px 32px;">
          <h2 style="color: #080808; font-size: 22px;">Bienvenue, ${prenom} !</h2>
          <p style="color: #57534E; line-height: 1.7; font-size: 16px;">
            Votre compte a été créé avec succès. Vous faites désormais partie d'une clientèle
            qui exige l'excellence dans la gestion de son patrimoine immobilier.
          </p>
          <h3 style="color: #080808; font-size: 18px;">Pour commencer :</h3>
          <ol style="color: #57534E; line-height: 2; font-size: 15px;">
            <li>Accédez à votre tableau de bord</li>
            <li>Ajoutez vos biens immobiliers</li>
            <li>Déposez vos premiers documents</li>
          </ol>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/tableau-de-bord"
               style="background: linear-gradient(135deg, #C8A96E, #E2C080); color: #080808;
                      padding: 14px 32px; text-decoration: none; border-radius: 8px;
                      font-weight: 600; font-size: 15px; display: inline-block;">
              Accéder à mon espace →
            </a>
          </div>
        </div>
        <div style="background: #F0EDE8; padding: 24px 32px; text-align: center;">
          <p style="color: #A8A29E; font-size: 13px; margin: 0;">
            © ${new Date().getFullYear()} Rentium Partners — Gestion immobilière d'excellence
          </p>
        </div>
      </div>
    `,
  });
}

/**
 * Email de vérification avec code OTP
 */
export async function sendVerificationEmail(to: string, code: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Confirmez votre adresse email — Rentium Partners",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAFAF9;">
        <div style="background: #080808; padding: 40px 32px; text-align: center;">
          <h1 style="color: #C8A96E; font-size: 24px; margin: 0;">Rentium Partners</h1>
        </div>
        <div style="padding: 40px 32px; text-align: center;">
          <h2 style="color: #080808; font-size: 22px;">Vérification de votre email</h2>
          <p style="color: #57534E; line-height: 1.7; font-size: 16px;">
            Utilisez le code ci-dessous pour confirmer votre adresse email :
          </p>
          <div style="background: #080808; border-radius: 12px; padding: 24px; margin: 24px 0;
                      letter-spacing: 8px; font-size: 36px; font-weight: 700; color: #C8A96E;
                      font-family: 'JetBrains Mono', monospace;">
            ${code}
          </div>
          <p style="color: #A8A29E; font-size: 14px;">
            Ce code expire dans 15 minutes.<br/>
            Si vous n'avez pas demandé cette vérification, ignorez cet email.
          </p>
        </div>
        <div style="background: #F0EDE8; padding: 24px 32px; text-align: center;">
          <p style="color: #A8A29E; font-size: 13px; margin: 0;">
            © ${new Date().getFullYear()} Rentium Partners
          </p>
        </div>
      </div>
    `,
  });
}

/**
 * Email de réinitialisation du mot de passe
 */
export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Réinitialisation de votre mot de passe — Rentium Partners",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAFAF9;">
        <div style="background: #080808; padding: 40px 32px; text-align: center;">
          <h1 style="color: #C8A96E; font-size: 24px; margin: 0;">Rentium Partners</h1>
        </div>
        <div style="padding: 40px 32px;">
          <h2 style="color: #080808; font-size: 22px;">Réinitialisation du mot de passe</h2>
          <p style="color: #57534E; line-height: 1.7; font-size: 16px;">
            Vous avez demandé la réinitialisation de votre mot de passe.
            Cliquez sur le bouton ci-dessous pour en choisir un nouveau :
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}"
               style="background: linear-gradient(135deg, #C8A96E, #E2C080); color: #080808;
                      padding: 14px 32px; text-decoration: none; border-radius: 8px;
                      font-weight: 600; font-size: 15px; display: inline-block;">
              Réinitialiser mon mot de passe →
            </a>
          </div>
          <p style="color: #A8A29E; font-size: 14px;">
            Ce lien expire dans 1 heure.<br/>
            Si vous n'avez pas fait cette demande, ignorez cet email.
          </p>
        </div>
        <div style="background: #F0EDE8; padding: 24px 32px; text-align: center;">
          <p style="color: #A8A29E; font-size: 13px; margin: 0;">
            © ${new Date().getFullYear()} Rentium Partners
          </p>
        </div>
      </div>
    `,
  });
}

/**
 * Email de confirmation de paiement
 */
export async function sendPaymentConfirmationEmail(
  to: string,
  prenom: string,
  planName: string,
  montant: string
) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Votre abonnement est actif ✓ — Rentium Partners",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAFAF9;">
        <div style="background: #080808; padding: 40px 32px; text-align: center;">
          <h1 style="color: #C8A96E; font-size: 24px; margin: 0;">Rentium Partners</h1>
        </div>
        <div style="padding: 40px 32px;">
          <h2 style="color: #080808; font-size: 22px;">Paiement confirmé</h2>
          <p style="color: #57534E; line-height: 1.7; font-size: 16px;">
            ${prenom}, votre abonnement <strong>${planName}</strong> est désormais actif.
          </p>
          <div style="background: #F0EDE8; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0; color: #57534E; font-size: 15px;">
              <strong>Formule :</strong> ${planName}<br/>
              <strong>Montant :</strong> ${montant}<br/>
              <strong>Statut :</strong> <span style="color: #10B981;">Actif ✓</span>
            </p>
          </div>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/tableau-de-bord"
               style="background: linear-gradient(135deg, #C8A96E, #E2C080); color: #080808;
                      padding: 14px 32px; text-decoration: none; border-radius: 8px;
                      font-weight: 600; font-size: 15px; display: inline-block;">
              Accéder à mon tableau de bord →
            </a>
          </div>
        </div>
        <div style="background: #F0EDE8; padding: 24px 32px; text-align: center;">
          <p style="color: #A8A29E; font-size: 13px; margin: 0;">
            © ${new Date().getFullYear()} Rentium Partners
          </p>
        </div>
      </div>
    `,
  });
}

/**
 * Email d'échec de paiement
 */
export async function sendPaymentFailedEmail(to: string, prenom: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Action requise : problème de paiement — Rentium Partners",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAFAF9;">
        <div style="background: #080808; padding: 40px 32px; text-align: center;">
          <h1 style="color: #C8A96E; font-size: 24px; margin: 0;">Rentium Partners</h1>
        </div>
        <div style="padding: 40px 32px;">
          <h2 style="color: #080808; font-size: 22px;">Problème de paiement</h2>
          <p style="color: #57534E; line-height: 1.7; font-size: 16px;">
            ${prenom}, nous n'avons pas pu traiter votre dernier paiement.
            Pas d'inquiétude — il vous suffit de mettre à jour votre moyen de paiement.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/facturation"
               style="background: linear-gradient(135deg, #C8A96E, #E2C080); color: #080808;
                      padding: 14px 32px; text-decoration: none; border-radius: 8px;
                      font-weight: 600; font-size: 15px; display: inline-block;">
              Mettre à jour mon paiement →
            </a>
          </div>
          <p style="color: #A8A29E; font-size: 14px;">
            Votre accès reste actif pendant 7 jours. Passé ce délai,
            votre abonnement sera suspendu.
          </p>
        </div>
        <div style="background: #F0EDE8; padding: 24px 32px; text-align: center;">
          <p style="color: #A8A29E; font-size: 13px; margin: 0;">
            © ${new Date().getFullYear()} Rentium Partners
          </p>
        </div>
      </div>
    `,
  });
}
