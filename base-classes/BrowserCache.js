globalThis.BrowserCache ??= class BrowserCache {
  static cacheName = "dp-browser-image-cache";

  static async fetchWithBackoff(url, retries = 3) {
    const delay = ms => new Promise(r => setTimeout(r, ms));
  
    for (let i = 0; i < retries; i++) {
      const response = await fetch(url, { mode: "cors" });
      if (response.ok) return response;
  
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const wait = retryAfter
          ? parseFloat(retryAfter) * 1000
          : (i + 1) * 1000;
        await delay(wait);
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    }
  
    throw new Error("Failed after retries (HTTP 429)");
  }
  
  static async getImage(name, url) {
    try {
      const cache = await caches.open(this.cacheName);
      const match = await cache.match(name);
      if (match) {
        return {
          fromCache: true,
          file: URL.createObjectURL(await match.blob())
        };
      }
  
      const response = await this.fetchWithBackoff(url);
      await cache.put(name, response.clone());
      return {
        fromCache: false,
        file: URL.createObjectURL(await response.blob())
      };
    } catch (e) {
      console.error('Failed to fetch image', e);
      return {
        fromCache: false,
        file: url,
        error: e
      };
    }
  }

  static async deleteCache(name) {
    const cache = await caches.open(this.cacheName);

    if (name === "*") {
      await caches.delete(this.cacheName);
    } else {
      await cache.delete(name);
    }
  }
  static async listCache() {
    const cache = await caches.open(this.cacheName);
    const keys = await cache.keys();
    return Promise.all(keys.map(async req => ({
      name: req.url,
      blob: 'someblob'
    })));
  }
}
export default BrowserCache;