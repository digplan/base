import BaseElement from 'https://digplan.github.io/base/components/BaseElement.js';
globalThis.ToolTip ??= class ToolTip extends BaseElement {
  static show(message, duration = 3000, left = 200, top = 150) {
    $$('tool-tip')?.forEach(tip => { tip.remove() });
    const tip = document.createElement('tool-tip');
    document.body.appendChild(tip);
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    tip.style.display = 'block';
    tip.style.zIndex = '10000';

    if (typeof message === 'object') {
      tip.textContent = JSON.stringify(message, null, 2);
    } 
    else if (typeof message === 'string' && message.startsWith('<')) {
      tip.innerHTML = message;
    }
    else {
      tip.textContent = message;
    }

    // Auto-hide after duration
    setTimeout(() => {
      tip.remove();
    }, duration);
  }
};

customElements.define('tool-tip', globalThis.ToolTip);
