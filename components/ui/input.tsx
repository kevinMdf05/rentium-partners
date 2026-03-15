"use client";

import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Check, X } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, success, icon, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";
    const actualType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium transition-colors duration-200",
              isFocused
                ? "text-[var(--or-pur)]"
                : error
                  ? "text-[var(--erreur)]"
                  : "text-[var(--gris-plume)]"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--gris-acier)]">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            type={actualType}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              "flex h-11 w-full rounded-xl border bg-[var(--noir-surface)] px-4 text-sm text-[var(--blanc-absolu)] placeholder:text-[var(--gris-acier)]",
              "transition-all duration-300 ease-out",
              "focus:outline-none",
              icon && "pl-10",
              isPassword && "pr-20",
              error
                ? "border-[var(--erreur)] focus:border-[var(--erreur)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                : success
                  ? "border-[var(--succes)] focus:border-[var(--succes)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
                  : "border-[var(--bordure-subtile)] focus:border-[var(--or-pur)] focus:shadow-[0_0_0_3px_var(--or-glow)]",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {/* Bouton afficher/masquer mot de passe */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gris-acier)] hover:text-[var(--gris-plume)] transition-colors p-1"
              tabIndex={-1}
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {/* Indicateur de validation */}
          {!isPassword && (error || success) && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {success ? (
                <Check size={16} className="text-[var(--succes)]" />
              ) : (
                <X size={16} className="text-[var(--erreur)]" />
              )}
            </span>
          )}
        </div>
        {/* Message d'erreur */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-[var(--erreur)] mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
