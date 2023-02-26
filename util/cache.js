const cacheMap = new Map();

let timeoutDefault = 1200;

// 判断缓存是否时已经超时
function isTimeout(name) {
  const data = cacheMap.get(name);
  if (!data) return true;

  if (data.timeout === 0) return false;

  const currentTime = Date.now();

  const overTime = currentTime - data.createTime;
  if (overTime > data.timeout) {
    cacheMap.delete(name);

    if (name.startsWith("_")) {
      try {
        uni.removeStorageSync(name);
      } catch (error) {
        console.log(error);
      }
    }
    return true;
  }
  return false;
}

// 缓存单元
class CacheCell {
  constructor(data, timeout) {
    this.data = data;
    this.timeout = timeout;
    this.createTime = Date.now();
  }
}

class Cache {
  constructor(timeout) {
    try {
      // 初始化数据
      const res = uni.getStorageInfoSync();
      res.keys.forEach((name) => {
        try {
          const value = uni.getStorageSync(name);
          cacheMap.set(name, value);
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
    timeoutDefault = timeout;
  }
  set(name, data, timeout = timeoutDefault) {
    const cachecell = new CacheCell(data, timeout);
    let cache = null;
    // 带下划线开头的才本地缓存，否则通过cacheMap缓存在内存
    if (name.startsWith("_")) {
      try {
        uni.setStorageSync(name, cachecell);
        cache = cacheMap.set(name, cachecell);
      } catch (e) {
        console.log(e);
      }
    } else {
      cache = cacheMap.set(name, cachecell);
    }
    return cache;
  }
  get(name) {
    return isTimeout(name) ? null : cacheMap.get(name).data;
  }
  delete(name) {
    let value = false;
    if (name.startsWith("_")) {
      try {
        uni.removeStorageSync(name);
        value = cacheMap.delete(name);
      } catch (e) {
        console.log(e);
      }
    } else {
      value = cacheMap.delete(name);
    }
    return value;
  }
  has(name) {
    return !isTimeout(name);
  }
  clear() {
    let value = false;
    try {
      uni.clearStorageSync();
      cacheMap.clear();
      value = true;
    } catch (e) {
      console.log(e);
    }
    return value;
  }
}

Cache.install = function (Vue, { timeout = 1200 } = {}) {
  Vue.prototype.$cache = new Cache(timeout);
};

export default Cache;
