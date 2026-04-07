"use client";

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type Props = ButtonProps | AnchorProps;

const base =
  "inline-flex items-center gap-2 font-semibold rounded-[10px] transition-all duration-250 cursor-pointer border-0 outline-none";

const variants = {
  primary:
    "bg-[--orange] text-white hover:bg-[--orange-bright] hover:shadow-[0_8px_32px_rgba(255,107,0,0.4)] hover:-translate-y-0.5 active:scale-[0.98]",
  secondary:
    "bg-transparent text-[--gun-100] border border-[--gun-600] hover:border-[--orange-border] hover:bg-[--orange-faint] hover:-translate-y-0.5 active:scale-[0.98]",
  ghost:
    "bg-transparent text-[--orange] hover:bg-[--orange-faint] active:scale-[0.98]",
};

const sizes = {
  sm: "text-[13px] px-4 py-2",
  md: "text-[15px] px-6 py-3",
  lg: "text-[16px] px-8 py-4",
};

export function Button({ variant = "primary", size = "md", children, className = "", href, ...props }: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href !== undefined) {
    return (
      <a href={href} className={cls} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
