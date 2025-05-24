class BaseElement extends HTMLElement {
    constructor() {
        super();
        if(this?.html) this.innerHTML = this.html();
        this.doEvents?.();
    }
}

export default BaseElement;