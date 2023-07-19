import { useEffect, useState } from "react";

export const Button = ({ text, variant, type }) => {
  const [buttonClass, setButtonClass] = useState("");
  useEffect(() => {
    switch (variant) {
      case "primary":
        setButtonClass("bg-emerald-300 text-gray-900 hover:bg-emerald-400");
        break;
      case "secondary":
        setButtonClass("bg-white");
        break;
      default:
        setButtonClass("bg-emerald-300 text-gray-900 hover:bg-emerald-400");
        break;
    }
  }, []);

  return (
    <button
      className={`text-lg font-medium rounded-xl border px-4 py-1.5 ${buttonClass} border-emerald-400`}
      type={type == 'submit' ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
};
