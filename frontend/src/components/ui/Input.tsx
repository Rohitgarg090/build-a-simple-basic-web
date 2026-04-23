import React from "react";

interface InputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled = false,
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  id,
  required = false,
}) => {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            color: "#f9fafb",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "4px",
            display: "block",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#f59e0b", marginLeft: "4px" }}>*</span>
          )}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        style={{
          backgroundColor: "#1f2937",
          border: `1px solid ${error ? "#ef4444" : "#374151"}`,
          borderRadius: "6px",
          color: "#f9fafb",
          fontSize: "14px",
          padding: "10px 12px",
          width: "100%",
          outline: "none",
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.target.style.borderColor = error ? "#ef4444" : "#6366f1";
          }
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "#ef4444" : "#374151";
        }}
      />
      {error && (
        <span
          style={{
            color: "#ef4444",
            fontSize: "12px",
            marginTop: "4px",
            display: "block",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
}