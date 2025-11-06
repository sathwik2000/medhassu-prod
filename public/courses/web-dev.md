# Web Development Complete Guide

![Web Development](../images/web-dev-hero.jpg)

## HTML Fundamentals

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically.

### Key Points
- Always declare `<!DOCTYPE html>`
- Use semantic HTML elements like `<header>`, `<nav>`, `<main>`, `<footer>`
- Include meta viewport tag for responsiveness
- Use proper heading hierarchy (h1 → h2 → h3)

### Example Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Web Page</title>
</head>
<body>
  <header>
    <h1>Welcome to My Site</h1>
  </header>
  <main>
    <article>
      <h2>Article Title</h2>
      <p>Content goes here...</p>
    </article>
  </main>
</body>
</html>
```

---

## CSS Fundamentals

CSS (Cascading Style Sheets) is used to style and layout web pages. Learn how to make your websites beautiful and responsive.

### Watch: CSS Complete Tutorial

https://www.youtube.com/watch?v=OXGznpKZ_sA

This comprehensive video covers everything you need to know about CSS from basics to advanced concepts.

### Basic Styling Example
```css
/* CSS Variables for theming */
:root {
  --primary-color: #3b82f6;
  --text-color: #1f2937;
  --background: #ffffff;
}

body {
  background-color: var(--background);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
```

### Flexbox Layout
```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.flex-item {
  flex: 1;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 8px;
}
```

---

## JavaScript Basics

JavaScript is the programming language of the web. Learn the fundamentals of variables, functions, and DOM manipulation.

### Variables and Data Types
```javascript
// Modern variable declarations
const greeting = "Hello, World!"; // Cannot be reassigned
let counter = 0; // Can be reassigned
var oldStyle = "Avoid using var"; // Legacy, has issues

// Data types
const number = 42;
const string = "JavaScript";
const boolean = true;
const array = [1, 2, 3, 4, 5];
const object = { name: "John", age: 30 };
const nullValue = null;
const undefinedValue = undefined;
```

### Functions
```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function (modern)
const multiply = (a, b) => a * b;

// Arrow function with block
const greet = (name) => {
  const message = `Hello, ${name}!`;
  return message;
};

// Async function
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### DOM Manipulation
```javascript
// Selecting elements
const button = document.querySelector('.my-button');
const items = document.querySelectorAll('.list-item');

// Adding event listeners
button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// Creating and modifying elements
const newDiv = document.createElement('div');
newDiv.className = 'card';
newDiv.textContent = 'This is a new card';
document.body.appendChild(newDiv);

// Modifying styles
button.style.backgroundColor = '#3b82f6';
button.classList.add('active');
button.classList.toggle('hidden');
```

### Modern JavaScript Features
```javascript
// Destructuring
const user = { name: 'Alice', age: 28, city: 'NYC' };
const { name, age } = user;

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];

// Template literals
const message = `User ${name} is ${age} years old`;

// Optional chaining
const street = user?.address?.street ?? 'Unknown';

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

---

## Learn More

### Recommended Resources
- [MDN Web Docs](https://developer.mozilla.org) - Comprehensive web development documentation
- [JavaScript.info](https://javascript.info) - Modern JavaScript tutorial
- [CSS-Tricks](https://css-tricks.com) - CSS tips and tricks

### Practice Projects
1. **Portfolio Website** - Build your personal portfolio with HTML, CSS, and JavaScript
2. **Todo App** - Create a task management application
3. **Weather App** - Fetch and display weather data from an API
4. **Interactive Quiz** - Build a quiz with score tracking
