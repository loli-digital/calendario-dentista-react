import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

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
  const baseStyles = "button--base";
  
  const getStateStyles = () => {
    if (disabled) return "button--disabled";
    if (deleteButton) return "button--delete";
    return "button--default";
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
