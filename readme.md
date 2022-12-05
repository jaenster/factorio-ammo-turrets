# Factorio mod in typescript

I got annoyed by placing turrets without ammo when i was in need. Since im a big fan of typescript and found the [typescript to lua](https://typescripttolua.github.io/) transpiler. I was thinking, lets make a nice base for making mods for factorio in typescript.

Example;
```typescript
import {CustomUnit} from "./prototypes/custom-unit";

// my turret
export class MyTurret extends CustomUnit {
 
  
  createControl() {
    this.onEvent(defines.events.on_built_entity, (event) => {
      game.print("On event")
    })
  }
  
}
```