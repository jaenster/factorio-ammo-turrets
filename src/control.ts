import {MyTurret} from "./prototypes/turret";

commands.add_command('test', "test me", (tableIn: CustomCommandData) => {
  for (const instance of MyTurret.toInit) {
    game.print(instance.name)
  }
});

MyTurret.initControl();