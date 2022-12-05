import {EventHook} from "./event-hook";

export abstract class CustomUnit {
  protected constructor() {
    CustomUnit.toInit.push(this)
  }


  private static toRegister = [];

  // Copy of on_event from script.on_event
  onEvent<E extends EventId<any, table>>(event: E, f: ((data: E["_eventData"]) => void) | nil): void {
    CustomUnit.toRegister.push([event, f]);
  }

  static registerEvents() {
    for (const [event, f] of this.toRegister) {
      const eh = EventHook.get(event);
      eh.addCallback(f);
    }
  }


  protected abstract createEntity(): void
  protected abstract createItem(): void
  protected abstract createRecipe(): void
  protected abstract createControl(): void

  static toInit = [];

  static initData() {
    for (const instance of this.toInit) {
      instance.createEntity();
      instance.createItem();
      instance.createRecipe();
    }
  }

  static initControl() {
    for (const instance of this.toInit) {
      instance.createControl()
    }

    CustomUnit.registerEvents();
  }

}