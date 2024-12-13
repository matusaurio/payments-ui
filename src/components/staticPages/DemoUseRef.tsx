import { useRef } from "react";

const DemoUseRef = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const changeBorder = () => {
    if (inputRef.current) {
      inputRef.current.style.borderColor = "red";
    }
  };
  return (
    <div>
      <h1>DemoUseRef</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        style={{
          border: "2px solid blue",
          padding: "5px",
          borderRadius: "5px",
        }}
      />
      <button onClick={changeBorder}>Focus Input</button>
    </div>
  );
};

export default DemoUseRef;
