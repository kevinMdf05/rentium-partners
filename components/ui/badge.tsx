import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--or-pur)]/20 bg-[var(--or-glow)] text-[var(--or-pur)]",
        success:
          "border border-[var(--succes)]/20 bg-[var(--succes)]/10 text-[var(--succes)]",
        warning:
          "border border-[var(--warning)]/20 bg-[var(--warning)]/10 text-[var(--warning)]",
        error:
          "border border-[var(--erreur)]/20 bg-[var(--erreur)]/10 text-[var(--erreur)]",
        info:
          "border border-[var(--info)]/20 bg-[var(--info)]/10 text-[var(--info)]",
        outline:
          "border border-[var(--bordure-subtile)] text-[var(--gris-plume)]",
        premium:
          "border border-[var(--or-pur)]/30 bg-gradient-to-r from-[var(--or-pur)]/10 to-[var(--or-brillant)]/10 text-[var(--or-brillant)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  pulse?: boolean;
}

function Badge({ className, variant, pulse, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {pulse && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
