"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  /* Base — tous les boutons */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--or-pur)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--noir-absolu)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        /** Bouton principal — fond or dégradé, texte noir, shimmer au hover */
        primary: [
          "relative overflow-hidden",
          "bg-gradient-to-r from-[var(--or-pur)] to-[var(--or-brillant)]",
          "text-[var(--noir-absolu)] font-semibold",
          "shadow-lg shadow-[var(--or-glow)]",
          "hover:shadow-xl hover:shadow-[rgba(200,169,110,0.3)]",
          "hover:brightness-110",
        ].join(" "),

        /** Bouton secondaire — bordure or, fond transparent, glow au hover */
        secondary: [
          "border border-[var(--or-pur)]/30 bg-transparent",
          "text-[var(--or-pur)]",
          "hover:border-[var(--or-pur)] hover:bg-[var(--or-glow)]",
          "hover:shadow-[0_0_20px_rgba(200,169,110,0.15)]",
        ].join(" "),

        /** Bouton fantôme — texte seul, underline animé au hover */
        ghost: [
          "bg-transparent text-[var(--gris-plume)]",
          "hover:text-[var(--blanc-absolu)]",
          "hover:bg-white/5",
        ].join(" "),

        /** Bouton destructif */
        danger: [
          "bg-[var(--erreur)] text-white",
          "hover:bg-[var(--erreur)]/90",
          "shadow-lg shadow-[var(--erreur)]/20",
        ].join(" "),

        /** Bouton lien — ressemble à un lien texte */
        link: [
          "bg-transparent text-[var(--or-pur)] underline-offset-4",
          "hover:underline hover:text-[var(--or-brillant)]",
          "p-0 h-auto",
        ].join(" "),
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-sm rounded-xl",
        lg: "h-13 px-8 text-base rounded-xl",
        xl: "h-14 px-10 text-base rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Chargement…</span>
          </>
        ) : (
          children
        )}
        {/* Shimmer overlay pour le bouton primary */}
        {variant === "primary" && !isLoading && (
          <span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full pointer-events-none"
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
