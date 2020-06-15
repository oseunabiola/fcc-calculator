import React, { useState } from "react";
import Key from "./components/Key";

const App = () => {
  const [expression, setExpression] = useState("0");
  const [answer, setAnswer] = useState(null);
  const [canAcceptDecimal, setCanAcceptDecimal] = useState(true);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const doCalculation = (expression) => {
    const convertedExpression = expression
      .replace(/x/g, "*")
      .replace(/‑/g, "-");
    const ans = eval(convertedExpression);
    setAnswer(ans);
    setIsEvaluated(true);
  };

  const handleOperator = (e) => {
    let value = e.target.value;
    // 5 * - +
    setCanAcceptDecimal(true);
    if (
      expression.endsWith("-") ||
      expression.endsWith("+") ||
      expression.endsWith("x") ||
      expression.endsWith("/")
    ) {
      if (value !== "-") {
        let newExp = expression.replace(expression[expression.length - 1], "");
        if (
          newExp.endsWith("-") ||
          newExp.endsWith("+") ||
          newExp.endsWith("x") ||
          newExp.endsWith("/")
        ) {
          newExp = expression.replace(expression[expression.length - 1], "");
        }
        setExpression(`${newExp}${value}`);

        return;
      } else {
        if (!expression.endsWith("-")) {
          setExpression(`${expression}${value}`);
          return;
        } else {
          return;
        }
      }
    }
    if (answer && value !== "=") {
      setExpression(`${answer}${value}`);
      setAnswer(null);
      setIsEvaluated(false);
      return;
    }

    if (expression === "0") {
      return;
    }
    if (value === "=") {
      doCalculation(expression);
      return;
    }
    setExpression(`${expression}${value}`);
    return;
  };

  const handleDot = (e) => {
    let value = e.target.value;
    if (canAcceptDecimal) {
      setExpression(`${expression}${value}`);
      setCanAcceptDecimal(false);
      return;
    }
    return;
  };

  const doClear = () => {
    setExpression("0");
    setAnswer(0);
    setCanAcceptDecimal(true);
  };

  const handleClick = (e) => {
    let value = Number(e.target.value);
    setIsEvaluated(false);

    if (expression === "0") {
      if (value === 0) {
        return;
      } else {
        setExpression(`${value}`);
        return;
      }
    }
    if (answer) {
      setExpression(0);
      setAnswer(null);
      setExpression(`${value}`);
      return;
    }
    setExpression(`${expression}${value}`);
  };
  return (
    <div className="app">
      <div className="display">
        <div className="display__content">
          <div className="display__result">
            <pre>{expression}</pre>
          </div>
          <div className="display__expression">
            <pre>
              <span id="display">{isEvaluated ? answer : expression}</span>
            </pre>
          </div>
        </div>
      </div>
      <div className="keys">
        <Key
          id="clear"
          handleClick={doClear}
          className="key span-2-column"
          text="AC"
          bgColor="#822"
        />
        <Key
          id="divide"
          handleClick={handleOperator}
          className="key"
          text="/"
        />
        <Key
          id="multiply"
          handleClick={handleOperator}
          className="key"
          text="x"
        />
        <Key id="seven" handleClick={handleClick} className="key" text={7} />
        <Key id="eight" handleClick={handleClick} className="key" text={8} />
        <Key id="nine" handleClick={handleClick} className="key" text={9} />
        <Key
          id="subtract"
          handleClick={handleOperator}
          className="key"
          text="-"
        />
        <Key id="four" handleClick={handleClick} className="key" text={4} />
        <Key id="five" handleClick={handleClick} className="key" text={5} />
        <Key id="six" handleClick={handleClick} className="key" text={6} />
        <Key id="add" handleClick={handleOperator} className="key" text="+" />
        <Key id="one" handleClick={handleClick} className="key" text={1} />
        <Key id="two" handleClick={handleClick} className="key" text={2} />
        <Key id="three" handleClick={handleClick} className="key" text={3} />
        <Key
          id="equals"
          handleClick={handleOperator}
          className="key span-2-row"
          text="="
          bgColor="#059"
        />
        <Key
          id="zero"
          handleClick={handleClick}
          className="key span-2-column"
          text={0}
        />
        <Key id="decimal" handleClick={handleDot} className="key" text="." />
      </div>
    </div>
  );
};

export default App;
