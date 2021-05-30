import { Pair } from "../../Ripple/Util";
import { Area } from "./Area";
import { World } from "./World";

namespace Wizard101 {
    export const Worlds = {
        WizardCity: new World("Wizard City", 39, new Pair(0, 5), "wc", [
            new Area("Unicorn Way"),
            new Area("Cyclops Lane"),
            new Area("Firecat Alley"),
            new Area("Triton Avenue"),
        ]),
        Krokotopia: new World("Krokotopia", 65, new Pair(5, 15), "kt", [
            new Area("Royal Hall"),
            new Area("Chamber of Fire"),
            new Area("Palace of Fire"),
            new Area("Hall of Champions"),
            new Area("Grand Arena"),
            new Area("Entrance Hall"),
            new Area("Tomb of Storms")
        ]),
        Marleybone: new World("Marleybone", 50, new Pair(15, 20), "mb", [
            new Area("Hyde Park"),
            new Area("Chelsea Court"),
            new Area("Ironworks"),
            new Area("Newgate Prison"),
            new Area("Knight's Court"),
            new Area("Katzenstein's Lab"),
            new Area("Royal Museum")
        ]),
        MooShu: new World("MooShu", 88, new Pair(20, 30), "ms", [
            new Area("Jade Palace"),
            new Area("Hametsu Village"),
            new Area("Tatakai Outpost"),
            new Area("Crimson Fields"),
            new Area("Cave of Solitude"),
            new Area("Kishibe Village"),
            new Area("Shirataki Temple"),
            new Area("Ancient Burial Grounds"),
            new Area("Village of Sorrow"),
            new Area("Yoshihito Temple"),
            new Area("Emperor's Throne Room")
        ]),
    }
}

export default Wizard101;