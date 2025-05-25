# Web Component Framework

A lightweight framework for building web applications using Web Components.

## Core Features

- Event-driven architecture
- Web Component base class
- Global event dispatching
- Utility helpers

## Structure

```
js/
├── base/
│   ├── Base.js       # Core event system and utilities
│   └── BaseElement.js # Base Web Component class
├── components/       # Custom elements
├── helpers/         # Utility classes
└── init.js          # Application initialization
```

## Usage

### Base Class
```javascript
// Dispatch events
Base.dispatch('eventName', data);

// DOM utilities
$('selector');      // querySelector
$$('selector');     // querySelectorAll
$id('id');          // getElementById
$body;              // document.body
```

### Creating Components
```javascript
class MyElement extends BaseElement {
    html() {
        return `<div>Content</div>`;
    }
    
    doEvents() {
        // Add event listeners
    }
}

customElements.define('my-element', MyElement);
```

### Event Handling
```javascript
// Listen for events
class MyComponent {
    onEventName(data) {
        // Handle event
    }
}

// Dispatch events
Base.dispatch('eventName', { data: 'value' });
```

## Global Helpers

- `String.prototype.json()` - Parse JSON strings
- `Base.validate()` - Form validation
- `Base.Helpers` - Global helper classes

## Best Practices

1. Use `BaseElement` for custom elements
2. Implement `html()` for component markup
3. Use `doEvents()` for event setup
4. Follow event naming convention: `onEventName`
5. Use `Base.dispatch()` for global events 