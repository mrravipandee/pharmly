import { Check } from "lucide-react";

interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer hidden"
        />
        <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-teal-600 peer-checked:border-teal-600 flex items-center justify-center transition-all cursor-pointer">
          <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
        </div>
      </div>
      <label htmlFor={id} className="text-sm text-gray-600 cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
}