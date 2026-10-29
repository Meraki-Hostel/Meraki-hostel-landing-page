import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary-dark" | "primary-light" | "ghost-on-dark" | "ghost-on-light";

type Common = {
  variant: ButtonVariant;
  size?: "md" | "lg";
  /** Full width below 480px for in-content CTAs (never the nav CTA). */
  fullWidthMobile?: boolean;
  className?: string;
  children: ReactNode;
};

function classes({ variant, size = "md", fullWidthMobile, className }: Omit<Common, "children">) {
  return ["btn", `btn-${variant}`, size === "lg" && "btn-lg", fullWidthMobile && "btn-full-mobile", className]
    .filter(Boolean)
    .join(" ");
}

/** In-page anchors and routes. Use <Button> only for actions. */
export function ButtonLink({ href, variant, size, fullWidthMobile, className, children, ...rest }: Common & Omit<ComponentProps<"a">, "className" | "children">) {
  return (
    <a href={href} className={classes({ variant, size, fullWidthMobile, className })} {...rest}>
      {children}
    </a>
  );
}

export function Button({ variant, size, fullWidthMobile, className, children, type = "button", ...rest }: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={classes({ variant, size, fullWidthMobile, className })} {...rest}>
      {children}
    </button>
  );
}
