namespace mamejs.event {

  export class EventEmiter {

    private handlers: {[eventName: string]: IHandler[]} = {}

    public on(eventName: string, callback: Function): void {
      this.handlers[eventName] = this.handlers[eventName] || []
      this.handlers[eventName].push(callback)
    }

    public off(eventName: string, callback: Function): void {
      if (this.handlers[eventName] && this.handlers[eventName].indexOf(callback) !== -1) {
        this.handlers[eventName][this.handlers[eventName].indexOf(callback)] = function() {}
      }
    }

    public emit(eventName: string, data: any): void {
      if (handlers[eventName]) {
        handlers[eventName].forEach((callback) => callback(data))
      }
    }
  }
}
