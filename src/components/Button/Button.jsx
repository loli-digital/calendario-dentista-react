import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Button = ({
  to,
  type = "button",
  onClick,
  children,
  className = "",
  deleteButton = false,
  disabled = false,
  ariaLabel,
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 p-3 rounded-sm transition-all duration-200 text-white focus:outline-none focus-visible:ring-2 cursor-pointer shadow-[0_0_5px_black] hover:shadow-[0_0_5px_#fff]";
  const defaultStyles =
    "bg-cyan-700  hover:bg-cyan-800  focus-visible:ring-cyan-400";
  const disabledStyles = "bg-slate-400 text-slate-700 cursor-not-allowed";
  const deletedStyles =
    "bg-red-800 hover:bg-red-900 focus-visible:ring-red-950";

  const getStateStyles = () => {
    if (disabled) return disabledStyles;
    if (deleteButton) return deletedStyles;
    return defaultStyles;
  };

  const classNames = `${baseStyles} ${getStateStyles()} ${className}`;

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
      {...props}
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {content}
    </button>
  );
};
