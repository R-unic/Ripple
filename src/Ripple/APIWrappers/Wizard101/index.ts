import { ToTitleCase } from "../../Util";
import { World } from "./World";
import { Worlds as WorldList } from "./WorldList";

namespace Wizard101 {
    export const Worlds = new Map<string, World>(Object.entries(WorldList));
    export function GetWorld(worldName: string): World {
        let world = Wizard101.Worlds.get(
            ToTitleCase(worldName
                .toLowerCase())
                .split(" ")
                .join("")
        );

        if (!world)
            Wizard101.Worlds.forEach(w => {
                if (w.Abbreviation === 
                    worldName
                        .toLowerCase()
                        .split(" ")
                        .join("")
                ) world = w;
            });

        return world;
    }
}

export default Wizard101;