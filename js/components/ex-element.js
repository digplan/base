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
        this.addEventListener('mouseenter', () => Base.dispatch('onMoused', { data: 'test' }));
    }
    onMoused(data) {
        console.log('onMoused', data);
    }
}

customElements.define('ex-element', ExElement);
export default ExElement;