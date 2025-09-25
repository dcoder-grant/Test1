import React, { useState } from 'react';
import Button from './components/Button.jsx';

const App = () => {
  const [input, setInput] = useState('');
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  // Call backend API for calculation
  const calculateResult = async (a, b, op) => {
    try {
      // In production, you might want to use environment variables for the API base URL
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${baseURL}/api/${op}?a=${a}&b=${b}`);
      
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error('Calculation failed');
      }
    } catch (error) {
      console.error('API call failed:', error);
      return 'Error';
    }
  };

  const handleNumberClick = (num) => {
    setInput(input + num);
  };

  const handleOperationClick = async (op) => {
    if (input && previousValue === null) {
      setPreviousValue(parseFloat(input));
      setInput('');
      setOperation(op);
    } else if (input && previousValue !== null) {
      // Calculate the result using backend API
      const result = await calculateResult(previousValue, parseFloat(input), operation);
      setInput(result.toString());
      setPreviousValue(result);
      setOperation(op);
    }
  };

  const handleEqualsClick = async () => {
    if (input && previousValue !== null && operation) {
      const result = await calculateResult(previousValue, parseFloat(input), operation);
      setInput(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClearClick = () => {
    setInput('');
    setPreviousValue(null);
    setOperation(null);
  };

  return (
    <div className="app">
      <calculator>
        <display 
          type="text" 
          value={input || '0'} 
          readOnly
        />
        <button-grid>
          {/* Row 1 */}
          <Button onClick={() => handleNumberClick('7')}>7</Button>
          <Button onClick={() => handleNumberClick('8')}>8</Button>
          <Button onClick={() => handleNumberClick('9')}>9</Button>
          <Button variant="clear" onClick={handleClearClick}>C</Button>

          {/* Row 2 */}
          <Button onClick={() => handleNumberClick('4')}>4</Button>
          <Button onClick={() => handleNumberClick('5')}>5</Button>
          <Button onClick={() => handleNumberClick('6')}>6</Button>
          <Button variant="operator" onClick={() => handleOperationClick('add')}>+</Button>

          {/* Row 3 */}
          <Button onClick={() => handleNumberClick('1')}>1</Button>
          <Button onClick={() => handleNumberClick('2')}>2</Button>
          <Button onClick={() => handleNumberClick('3')}>3</Button>
          <Button variant="operator" onClick={() => handleOperationClick('subtract')}>−</Button>

          {/* Row 4 */}
          <Button onClick={() => handleNumberClick('0')}>0</Button>
          <Button variant="operator" onClick={() => handleOperationClick('multiply')}>×</Button>
          <Button variant="operator" onClick={() => handleOperationClick('divide')}>÷</Button>
          <Button variant="equals" onClick={handleEqualsClick}>=</Button>
        </button-grid>
      </calculator>
    </div>
  );
};

export default App;