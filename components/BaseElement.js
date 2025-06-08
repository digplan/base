class BaseElement extends HTMLElement {
    constructor() {
        super();
        try {
            if(this?.html) this.innerHTML = this.html();
            this.doEvents?.();
        } catch(err) {
            console.error('Error in BaseElement constructor:', err);
        }
    }
}

export default BaseElement;