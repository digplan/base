const storage = (() => {
  const obj = Object.create(null);

  obj.get = (type, key) => {
    type = `${user?.shortId}:${type}`;
    if (type == '' || key == '') throw new Error('Invalid type or key');
    if (key === '*') {
      const arr = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith(`${type}:`)) {
          const value = localStorage.getItem(k);
          arr.push(JSON.parse(value));
        }
      }
      return arr;
    }
    const value = localStorage.getItem(`${type}:${key}`);
    return value ? JSON.parse(value) : null;
  };

  obj.set = (type, key, value) => {
    type = `${user?.shortId}:${type}`;
    if (typeof value !== 'object') throw new Error('Value must be an object');
    localStorage.setItem(`${type}:${key}`, JSON.stringify(value));
    return value;
  };

  obj.delete = (type, key) => {
    type = `${user?.shortId}:${type}`;
    localStorage.removeItem(`${type}:${key}`);
    return localStorage.getItem(`${type}:${key}`) == null;
  };

  obj.saveSetting = (key, value) => {
    const type = `${user?.shortId}:Settings`;
    const clientSettings = obj.get(type, "Client") || {};
    clientSettings[key] = value;
    obj.set(type, "Client", clientSettings);
    return value;
  };

  obj.getSetting = (key) => {
    const type = `${user?.shortId}:Settings`;
    if (key === '*') {
      return obj.get(type, "Client");
    }
    return obj.get(type, "Client")?.[key];
  };

  return obj;
})();

globalThis.storage = storage;
export default storage;