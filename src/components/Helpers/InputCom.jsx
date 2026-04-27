export default function InputCom({
  label,
  type,
  name,
  placeholder,
  children,
  inputHandler,
  value,
  inputClasses,
  error = false,
  labelClasses = "text-[11px] font-semibold tracking-[0.12em] text-gauri-aged-brass uppercase",
}) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label block mb-2 ${labelClasses || ""}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div
        className={`input-wrapper border w-full h-full overflow-hidden rounded-sm relative transition-colors ${
          error ? "border-qred" : "border-gauri-pale-ivory focus-within:border-gauri-gold-leaf"
        }`}
      >
        <input
          placeholder={placeholder}
          value={value}
          onChange={inputHandler}
          className={`input-field placeholder:text-gauri-aged-brass/50 text-sm px-4 text-gauri-rich-umber w-full font-normal bg-gauri-warm-cream focus:ring-0 focus:outline-none ${
            inputClasses || "h-[50px]"
          }`}
          type={type}
          id={name}
        />
        {children && children}
      </div>
    </div>
  );
}
