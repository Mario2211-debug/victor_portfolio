import type { ButtonHTMLAttributes, Ref } from "react";
import { buttonVariants, type ButtonSize, type ButtonVariant } from "./buttonVariants";

/**
 * FASE 2 — Primitivo
 *
 * Convenção do `04`: variantes declaradas (nunca props booleanas soltas),
 * `className` fundida, `ref` reencaminhada, e os estados hover / focus-visible /
 * active / disabled definidos aqui — não no local de uso.
 *
 * `:active` dispara em `pointerdown`, não em `click`: a resposta visual chega
 * ~100ms antes sem mudar nada na lógica (07 — ponteiro e toque).
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />;
}
