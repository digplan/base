globalThis.Base ??= class Base {
    static dontlog = null;
    static dispatch(name, data) {
        if (!this.dontlog || !name.match(this.dontlog)) console.log('Events.send', name, data);
        document.body.querySelectorAll('*').forEach(element => {
            element?.[name]?.(data);
        });
        Object.keys(Base).forEach(key => {
            Base[key]?.[name]?.(data);
        });
    }
}

HTMLElement.prototype.validate = function(name, callback) {
    const pattern = this.getAttribute('validity');
    if (!pattern) return;
    const pass = new RegExp(pattern).test(this.value);
    this.classList.toggle('bad-value', !pass);
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

export default Base;
