interface InputFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

export function InputField({ label, error, children, required }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">
        {label} {required && <span className="text-orange-400">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, type = "text", className = "" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors ${className}`}
    />
  );
}

export function TextAreaInput({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
    />
  );
}

export function SelectInput({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

export function DateInput({ value, onChange }: {
  value: string; onChange: (v: string) => void;
}) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
    />
  );
}

export function NumberInput({ value, onChange, min, max, step = 1 }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      min={min}
      max={max}
      step={step}
      className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
    />
  );
}
