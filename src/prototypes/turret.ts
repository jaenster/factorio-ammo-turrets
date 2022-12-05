import {Data} from "typed-factorio/data/types"
import {table} from "util";
import {CustomUnit} from "./custom-unit";

declare const data: Data

export class MyTurret extends CustomUnit {
  constructor(private readonly ammo_type: string) {
    super()
  }

  get name() {
    return `ammo-turret-placed-with-${this.ammo_type}`
  }

  get parent() {
    return data.raw['ammo-turret']['gun-turret'];
  }

  protected createEntity() {
    const copy = table.deepcopy(this.parent);
    copy.name = this.name;

    data.extend([copy]);
  }

  protected createItem() {
    data.extend([{
      type: 'item',
      name: this.name,
      icon: this.parent.icon,
      icon_size: this.parent.icon_size,
      icon_mipmaps: this.parent.icon_mipmaps,
      subgroup: 'defensive-structure',
      order: "a[gun-turret]b",
      place_result: this.name,
      stack_size: 50,
    }])
  }

  protected createRecipe() {
    data.extend([{
      type: 'recipe',
      name: this.name,
      ingredients: [
        [this.ammo_type, 20],
        ['gun-turret', 1],
      ],
      result: this.name,
      enabled: true
    }])
  }

  protected createControl() {
    this.onEvent(defines.events.on_built_entity, (event) => {
      const turret = event.created_entity
      if (turret.name === this.name) {
        turret.insert({
          name: this.ammo_type,
          count: 20,
        })
      }
    })
  }
}


new MyTurret('piercing-rounds-magazine');
new MyTurret('firearm-magazine');
new MyTurret('uranium-rounds-magazine');
