export function Button({ children, className = "", variant = "default", ...props }) {
    const base = "px-4 py-2 rounded-xl shadow font-medium transition hover:opacity-90";
    const variants = {
      default: "bg-blue-600 text-white",
      secondary: "bg-gray-200 text-black",
    };
  
    return (
      <button className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  