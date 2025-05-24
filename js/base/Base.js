globalThis.Base ??= class Base {
    static dispatch(name, data) {
        console.log('Events.send', name, data);
        document.body.querySelectorAll('*').forEach(element => {
            element?.[name]?.(data);
        });
        Object.keys(globalThis).forEach(key => {
            globalThis[key]?.[name]?.(data);
        });
    }
}

HTMLElement.prototype.validate = function(name, callback) {
    const pattern = this.getAttribute('validity');
    if (!pattern) return;
    const pass = new RegExp(pattern).test(this.value);
    this.classList.toggle('bad-value', isPassed);
}

String.prototype.json = function() {
    return JSON.parse(this);
};

window.$ = (selector) => {
    return document.querySelector(selector);
}
window.$$ = (selector) => {
    return document.querySelectorAll(selector);
}
window.$id = (id) => {  
    return document.getElementById(id);
}
window.$body = document.body;
