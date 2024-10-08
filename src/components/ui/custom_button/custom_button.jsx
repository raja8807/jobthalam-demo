import React from "react";
import styles from "./custom_button.module.scss";
import Link from "next/link";

const CustomButton = ({
  variant = 1,
  children,
  onClick = () => {},
  wFull,
  type = "button",
  btnText,
  disabled,
  isLoading,
  href,
  target,
  role,
}) => {
  if (type === "submit") {
    return (
      <input
        type="submit"
        className={`${styles.customButton} ${styles[`v${variant}`]} ${
          wFull ? styles.wFull : ""
        }`}
        role={role}
        value={isLoading ? "Loading..." : btnText}
        disabled={disabled || isLoading}
        onClick={onClick}
      />
    );
  }

  if (href) {
    return (
      <Link href={href} target={target}>
        <button
          className={`${styles.customButton} ${styles[`v${variant}`]} ${
            wFull ? styles.wFull : ""
          }`}
          onClick={onClick}
          disabled={disabled || isLoading}
        >
          {isLoading ? "Loading..." : children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={`${styles.customButton} ${styles[`v${variant}`]} ${
        wFull ? styles.wFull : ""
      }`}
      onClick={onClick}
      disabled={disabled || isLoading}
      role={role}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default CustomButton;
