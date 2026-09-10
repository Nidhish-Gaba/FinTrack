// A small reusable button. `variant` picks the visual style,
// everything else (onClick, type, disabled...) is passed straight through.
export default function Button({
  children,
  variant = "primary",
  block = false,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    block ? "btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
