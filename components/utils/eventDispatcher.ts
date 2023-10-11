const eventDispatcher = {
  listeners: {} as any,

  addListener(eventType: string, callback: any) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  },

  dispatchEvent(eventType: string, data: any) {
    const callbacks = this.listeners[eventType];
    if (callbacks) {
      callbacks.forEach((callback: any) => callback(data));
    }
  },
  removeListener(eventType: string, callback: any) {
    const callbacks = this.listeners[eventType];
    if (callbacks) {
      this.listeners[eventType] = callbacks.filter(
        (cb: any) => cb !== callback
      );
    }
  },
};

export default eventDispatcher;
