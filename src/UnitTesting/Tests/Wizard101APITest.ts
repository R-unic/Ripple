import { Assert } from "../API/Assert";
import { Test } from "../API/Test";
import { Wizard101 } from "../../Ripple/APIWrappers/Wizard101";

export default class Wizard101APITest implements Test {
    public Run() {
        const GW_ALIAS_NW = "GetWorld() aliases not working: ";

        const testWizCity = Wizard101.GetWorld("Wizard City");
        Assert.Defined(Wizard101.Worlds, undefined, "Worlds map doesn't exist.")
        Assert.Defined(testWizCity, undefined, GW_ALIAS_NW);
        Assert.Equals(testWizCity, Wizard101.GetWorld("wc"), Wizard101.GetWorld, GW_ALIAS_NW + "wc");
        Assert.Equals(testWizCity, Wizard101.GetWorld("WC"), Wizard101.GetWorld, GW_ALIAS_NW + "WC");
        Assert.Equals(testWizCity, Wizard101.GetWorld("wizard City"), Wizard101.GetWorld, GW_ALIAS_NW + "wizard City");

        Assert.Equals(Wizard101.Worlds.size, 16, undefined, "Worlds map size is not 16, is this intentional?");

        const testKaramelle = Wizard101.GetWorld("ka");
        Assert.Defined(testKaramelle, undefined, GW_ALIAS_NW + "ka");
        Assert.Equals(testKaramelle.Abbreviation, "ka", undefined, "Karamelle abbrev. != 'ka'");
        Assert.Equals(testKaramelle.Name, "Karamelle", undefined, "Karamelle name != 'Karamelle'");
        Assert.Equals(testKaramelle.LevelRange.First, 130, undefined, "Karamelle first level range != 130");
        Assert.Equals(testKaramelle.Quests, 80, undefined, "Karamelle quests != 80");

        Assert.NotEquals(testWizCity, testKaramelle, undefined, "Somehow test wiz city = test karamelle");
    }
}