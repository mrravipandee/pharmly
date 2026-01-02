interface SimpleButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export default function SimpleButton({
  children,
  type = "submit",
  onClick,
  disabled = false
}: SimpleButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
  bg-teal-700
  hover:bg-teal-800
  text-white
  font-semibold
  py-3
  px-6
  rounded-lg
  shadow-md
  hover:shadow-lg
  transition-all
  disabled:opacity-50
"

    >
      {children}
    </button>
  );
}