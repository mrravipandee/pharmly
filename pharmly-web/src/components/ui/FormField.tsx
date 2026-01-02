import { LucideIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  max?: number;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  showPassword?: boolean;
}

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  required = false,
  min,
  max,
  showPasswordToggle = false,
  onPasswordToggle,
  showPassword
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          className="w-full px-4 pl-11 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder:text-gray-400"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
        />
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        
        {showPasswordToggle && onPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
          >
            {showPassword ? (
              <Icon className="w-5 h-5" />
            ) : (
              <Icon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}