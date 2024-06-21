import React, { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function App() {
  // State variables to manage input, result, dark mode, history, and drawer
  const [input, setInput] = useState('0');
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [history, setHistory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Function to handle button clicks
  const handleClick = (value) => {
    // Replace 0 with the clicked button value or append the value to the input
    const newInput = input === '0' ? value : input + value;
    setInput(newInput);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to toggle the history drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to clear the input and result
  const handleClear = () => {
    setInput('0');
    setResult('');
  };

  // Function to handle calculation
  const handleCalculate = () => {
    try {
      // Evaluate the input expression
      const calculatedResult = eval(input);
      setResult(calculatedResult);

      // Check if the input involves 5+6 or 6+5 for special confetti effect
      if (/^5\+6$|^6\+5$/.test(input)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      // Update the history with the new calculation
      setHistory([...history, { input, result: calculatedResult.toString() }]);
      setInput(calculatedResult.toString());

      // Reset the result after calculation
      setTimeout(() => {
        setResult('');
      });
    } catch (e) {
      setResult('Error');
    }
  };

  // Function to calculate the factorial of a number
  const factorial = (n) => {
    if (n < 0) return 'Error';
    return n === 0 ? 1 : n * factorial(n - 1);
  };

  // Function to handle special operations
  const handleSpecialOperation = (operation) => {
    let currentValue = input;
    if (currentValue === '') return;

    try {
      switch (operation) {
        case 'e^x':
          setResult(Math.exp(eval(currentValue)));
          break;
        case '1/x':
          setResult(1 / eval(currentValue));
          break;
        case 'sqrt':
          setResult(Math.sqrt(eval(currentValue)));
          break;
        case 'cbrt':
          setResult(Math.cbrt(eval(currentValue)));
          break;
        case 'rootxy':
          const [x, y] = currentValue.split(',');
          setResult(Math.pow(eval(x), 1 / eval(y)));
          break;    
        case 'ln':
          setResult(Math.log(eval(currentValue)));
          break;
        case 'log10':
          setResult(Math.log10(eval(currentValue)));
          break;
        case '10^x':
          setResult(Math.pow(10, eval(currentValue)));
          break;
        case 'x!':
          setResult(factorial(eval(currentValue)));
          break;
        case 'sin':
          setResult(Math.sin(eval(currentValue)));
          break;
        case 'cos':
          setResult(Math.cos(eval(currentValue)));
          break;
        case 'tan':
          setResult(Math.tan(eval(currentValue)));
          break;
        case 'sinh':
          setResult(Math.sinh(eval(currentValue)));
          break;
        case 'cosh':
          setResult(Math.cosh(eval(currentValue)));
          break;
        case 'tanh':
          setResult(Math.tanh(eval(currentValue)));
          break;
        case 'e':
          setResult(Math.E);
          break;
        case 'π':
          setResult(Math.PI);
          break;
        case 'Rand':
          setResult(Math.random());
          break;
        default:
          setResult('Error');
          break;
      }
      setInput(result.toString());
    } catch (e) {
      setResult('Error');
    }
  };

  return (
    <div className={`calculator ${darkMode ? 'dark-mode' : ''}`}>
      {/* Display area */}
      <div className="display">
        <div className='circle'></div>
        <div className='circle1'></div>
        <div className='circle2'></div>
        <div className='circle3' onClick={toggleDrawer}></div>
        <div>{input}</div>
        <div>{result}</div>
        {/* Drawer for displaying history */}
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <div
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <h1>History</h1>
            <List>
              {history.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.input} secondary={item.result} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
      {/* Button area */}
      <div className="buttons">
        {/* Add buttons for numbers, operators, and special functions */}
        <button onClick={() => handleClick('(')}>(</button>
        <button onClick={() => handleClick(')')}>)</button>
        <button onClick={() => handleClick('mc')}>mc</button>
        <button onClick={() => handleClick('m+')}>m+</button>
        <button onClick={() => handleClick('m-')}>m-</button>
        <button onClick={() => handleClick('mr')}>mr</button>
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick('+/-')}>+/-</button>
        <button onClick={() => handleClick('%')}>%</button>
        <button className="operator" onClick={() => handleClick('/')}>÷</button>
        <button onClick={() => handleClick('')}>2nd</button>
        <button onClick={() => handleClick('x²')}>x²</button>
        <button onClick={() => handleClick('**3')}>x³</button>
        <button onClick={() => handleClick('')}>xʸ</button>
        <button onClick={() => handleSpecialOperation('e^x')}>eˣ</button>
        <button onClick={() => handleSpecialOperation('10^x')}>10ˣ</button>
        <button className="operation" onClick={() => handleClick('7')}>7</button>
        <button className="operation" onClick={() => handleClick('8')}>8</button>
        <button className="operation" onClick={() => handleClick('9')}>9</button>
        <button className="operator" onClick={() => handleClick('*')}>x</button>
        <button onClick={() => handleSpecialOperation('1/x')}>1/x</button>
        <button onClick={() => handleSpecialOperation('sqrt')}>√x</button>
        <button onClick={() => handleSpecialOperation('cbrt')}>∛x</button>
        <button onClick={() => handleSpecialOperation('rootxy')}>y√(x)</button>
        <button onClick={() => handleSpecialOperation('ln')}>ln</button>
        <button onClick={() => handleSpecialOperation('log10')}>log₁₀</button>
        <button className="operation" onClick={() => handleClick('4')}>4</button>
        <button className="operation" onClick={() => handleClick('5')}>5</button>
        <button className="operation" onClick={() => handleClick('6')}>6</button>
        <button className="operator" onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleSpecialOperation('x!')}>x!</button>
        <button onClick={() => handleSpecialOperation('sin')}>sin</button>
        <button onClick={() => handleSpecialOperation('cos')}>cos</button>
        <button onClick={() => handleSpecialOperation('tan')}>tan</button>
        <button onClick={() => handleSpecialOperation('e')}>e</button>
        <button onClick={() => handleSpecialOperation('EE')}>EE</button>
        <button className="operation" onClick={() => handleClick('1')}>1</button>
        <button className="operation" onClick={() => handleClick('2')}>2</button>
        <button className="operation" onClick={() => handleClick('3')}>3</button>
        <button className="operator" onClick={() => handleClick('+')}>+</button>
        <button className="round" onClick={() => handleSpecialOperation('Rand')} style={{ borderBottomLeftRadius: '20px' }}>Rad</button>
        <button onClick={() => handleSpecialOperation('sinh')}>sinh</button>
        <button onClick={() => handleSpecialOperation('cosh')}>cosh</button>
        <button onClick={() => handleSpecialOperation('tanh')}>tanh</button>
        <button onClick={() => handleSpecialOperation('π')}>π</button>
        <button onClick={() => handleSpecialOperation('Rand')}>Rand</button>
        <button className="double" onClick={() => handleClick('0')}>0</button>
        <button className="operation" onClick={() => handleClick('.')}>.</button>
        <button className="operator" onClick={handleCalculate} style={{ borderBottomRightRadius: '20px' }}>=</button>
      </div>
    </div>
  );
}

export default App;