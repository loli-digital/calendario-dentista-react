import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Button = ({
  to,
  type = "button",
  onClick,
  children,
  className = "",
  disabled = false,
  ariaLabel,
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 p-3 rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer";
  const enabledStyles =
    "bg-cyan-700 text-white shadow-[0_0_5px_black] hover:bg-cyan-800 hover:shadow-[0_0_5px_#fff]";
  const disabledStyles = "bg-slate-400 text-slate-700 cursor-not-allowed";

  const classNames = `${baseStyles} ${disabled ? disabledStyles : enabledStyles} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon icon={icon} aria-hidden="true" />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon icon={icon} aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={classNames}
        onClick={onClick}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};
