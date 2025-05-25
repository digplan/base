import BaseElement from '../base/BaseElement.js';

class ExElement extends BaseElement {
    html() {
        return `
            <div>
                <h1>Example Element</h1>
            </div>
        `;
    }
    connectedCallback() {
        // do stuff
    }
    doEvents() {
       this.addEventListener('mouseenter', () => Base.dispatch('onMouseEnter', { data: 'test' }));
    }
    onClicker(data) {
        $('status').innerHTML = 'clicked';
        setTimeout(() => {
            $('status').innerHTML = '';
        }, 1000);
    }
    onMouseEnter(data) {
        $('status').innerHTML += 'mouse entered (listened from element) ';
        setTimeout(() => {
            $('status').innerHTML = '';
        }, 1000);
    }
}

customElements.define('ex-element', ExElement);
export default ExElement;