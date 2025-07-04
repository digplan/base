globalThis.Base ??= {
  dontlog: null,
  dispatch(name, data) {
    if (!this.dontlog || !name.match(this.dontlog)) console.log('Events.send', name, data);
    document.body.querySelectorAll('*').forEach(element => {
      element?.[name]?.(data);
    });
    Object.keys(this).forEach(key => {
      if (typeof this[key] === 'object' && this[key]?.[name]) {
        this[key][name](data);
      }
    });
  }
};

Array.prototype.remove = function(value) {
  const index = this.indexOf(value);
  if (index !== -1) this.splice(index, 1);
};

window.getVals = function(e, clear = false) {
  const values = {};
  e.querySelectorAll('.propvalue').forEach(el => {
     clear ? el.value = '' : values[el.getAttribute('propname')] = el.value;
  });
  console.log('getvals', values);
  return values;
}

window.wait = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.shortSHA256 = async (input, length = 6) => {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const truncated = new Uint8Array(hash).slice(0, length);
  return btoa(String.fromCharCode(...truncated))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

window.state = new Proxy({}, {
  set: async (obj, prop, value) => {
    await ready()
    console.log('state change:', prop, value)
    for (const e of $$(`[data=${prop}]`)) {
      e.value = value;
    }
    obj[prop] = value
    return value
  },
  get: (obj, prop) => {
    if (prop == '_all') return obj;
    return obj[prop]
  }
});

window.ready = async () => {
  await wait(1000);
  return new Promise((r) => {
    if (document.readyState === 'complete') r(true)
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') r()
    }
  })
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
