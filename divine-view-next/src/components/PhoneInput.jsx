"use client";

import countryCodes from "@/data/countryCodes.json";

export default function PhoneInput({
  countryCode = "+91",
  onCountryCodeChange,
  value = "",
  onChange,
  required = false,
  id,
  name = "phone",
  placeholder = "98765 43210",
  className = "",
  inputClassName = "",
  selectClassName = "",
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <select
        aria-label="Country Code"
        value={countryCode}
        onChange={(e) => onCountryCodeChange && onCountryCodeChange(e.target.value)}
        className={`w-28 sm:w-32 bg-[#F7F3E9] px-2.5 py-3 rounded-lg border border-[#DEDCCD] text-xs sm:text-sm text-[#172C26] font-medium shrink-0 focus:outline-none focus:ring-1 focus:ring-[#103F36] ${selectClassName}`}
      >
        {countryCodes.map((item) => (
          <option key={`${item.code}-${item.country}`} value={item.code}>
            {item.flag} {item.code} ({item.country})
          </option>
        ))}
      </select>
      <input
        id={id}
        name={name}
        type="tel"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex-1 min-w-0 bg-[#F7F3E9] p-3 rounded-lg border border-[#DEDCCD] text-sm text-[#172C26] focus:outline-none focus:ring-1 focus:ring-[#103F36] ${inputClassName}`}
      />
    </div>
  );
}
