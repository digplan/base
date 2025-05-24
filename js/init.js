// Helpers

[
  './js/base/Base.js',
  './js/helpers/Api.js',
  './js/helpers/ExampleListener.js',

].forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
});

// Components

import './components/ex-element.js';