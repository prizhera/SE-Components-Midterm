import { useState } from "react";

const Button = () => {
  const [isRed, setIsRed] = useState(true);

  return (
    <button
      onClick={() => setIsRed(!isRed)}
      style={{
        backgroundColor: isRed ? "red" : "blue",
        color: "white",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        borderRadius: "5px",
      }}
    >
      Click Me
    </button>
  );
};

export default Button;