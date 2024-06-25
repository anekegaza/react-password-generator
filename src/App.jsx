import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./hooks/use-password-generator";

//
function App() {
  const convert = () => {
    const num = Math.floor(Math.random() * 128);
    let nos = num.toString();
    const asc = nos.charCodeAt(0);
    console.log(asc);
  };

  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  //
  // const passwordStrengthIndicator = ({ password = "" }) => {
  //   const getPasswordStrength = () => {
  //     const passwordLength = password.length;
  //     if (passwordLength < 1) {
  //       return "";
  //     } else if (passwordLength < 4) {
  //       return "Very Weak";
  //     } else if (passwordLength < 8) {
  //       return "Poor";
  //     } else if (passwordLength < 12) {
  //       return "Medium";
  //     } else if (passwordLength < 16) {
  //       return "Strong";
  //     } else {
  //       return "Very Strong";
  //     }
  //   };

  //   const passwordStrength = getPasswordStrength();
  //   if (!passwordStrength) return <React.Fragment />;

  //   return (
  //     <div className="passwordStrength">
  //       Strength: <span style={{ fontWeight: "bold" }}>{passwordStrength}</span>
  //     </div>
  //   );
  // };

  //
  return (
    <div className="container">
      {/* Password Text And Copy */}
      <div className="header">
        <div className="title">{password}</div>
        <button className="copyBtn" onClick={handleCopy}>
          {copied ? "copied" : "copy"}
        </button>
      </div>

      {/* character Length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* CheckBoxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
                checked={checkbox.state}
              />
              <label> {checkbox.title}</label>
            </div>
          );
        })}
      </div>
      {/* Strength */}
      {/* <div>{passwordStrengthIndicator}</div> */}

      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Generate Button */}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
      <button className="g" onClick={convert}>
        convert password
      </button>
    </div>
  );
}

export default App;
