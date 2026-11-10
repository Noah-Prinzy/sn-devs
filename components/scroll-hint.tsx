import type { ComponentProps } from "react";
import s from "./scroll-hint.module.css";

// The "scroll" prompt at the foot of an opening scene, the same on every page.
// It sits at the bottom centre of its nearest positioned parent.
export function ScrollHint({ children = "Scroll", className, ...rest }: ComponentProps<"div">) {
    return (
        <div aria-hidden className={className ? `${s.hint} ${className}` : s.hint} {...rest}>
            {children}
        </div>
    );
}
