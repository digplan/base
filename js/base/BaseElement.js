class BaseElement extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = this.html();
        this.doEvents();
    }
}

export default BaseElement;