export class EventHook {
  private constructor(public readonly eventId: number) {
    this.register();
  }

  callbacks: Function[] = []

  // This event handler can only be registered once in factorio, so this wapper allows you do it per instance
  register() {
    script.on_event(this.eventId as any, (event) => {
      for (const cb of this.callbacks) {
        cb(event);
      }
    })
  }

  addCallback(cb: Function) {
    this.callbacks.push(cb);
  }

  private static instances = new Map<number, EventHook>()

  static get(id: number) {
    let instance = this.instances.get(id)
    if (!instance) this.instances.set(id, instance = new this(id))
    return instance;
  }
}