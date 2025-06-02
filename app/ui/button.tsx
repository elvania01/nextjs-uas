import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({ children, onClick, disabled, variant = "primary" }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-300";
  const variantStyles =
    variant === "primary"
      ? "bg-pink-600 text-white hover:bg-pink-700"
      : "bg-white text-pink-600 border border-pink-300 hover:bg-pink-50";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
