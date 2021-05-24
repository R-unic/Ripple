local class = require 'class'
local limit, some = math.limit, table.some

local INC = ':incoming:'
local OUT = ':outgoing:'
local DRAIN = ':drain:'
local DMG = ':damage:'
local ACC = ':accuracy:'
local RESIST = ':resist:'
local WARD = ':ward:'
local CHARM = ':charm:'

local ICE = ':ice:'
local FIRE = ':fire:'
local STORM = ':storm:'

local Area = class {
    constructor = function(self, name, quest_count)
        self.name = name
        self.quest_count = quest_count
    end;
}

local AreaList = class {
    constructor = function(self, ...)
        self.list = { ... }
    end;
    strlist = function(self)
        local res = {}
        for i, v in pairs(self.list) do
            if type(v) ~= 'table' then
                table.insert(res, i, v)
            end
        end
        return table.concat(res, ',\n')
    end;
}

local World = class {
    constructor = function(self, name, quest_count, level_range, abbrev, areas, ordered_areas)
        self.name = name
        self.level_range = level_range
        self.abbrev = abbrev
        self.areas = areas
        self.ordered_areas = ordered_areas
        self.quest_count = {
            total = quest_count;
        }
    end;
    progress = function(self, quest_number)
        quest_number = limit(quest_number, self.quest_count.total)
        return tonumber(tostring((quest_number / self.quest_count.total) * 100):slice(3))
    end;
}

local SchoolGroup = class {
    constructor = function(self, ...)
        for _, school in pairs { ... } do
            self[school.name:lower()] = school
        end
    end;
}

local School = class {
    constructor = function(self, name, group)
        self.name = name
        self.group = group
    end;
}

local Spell = class {
    constructor = function(self, name, description, type, accuracy, pips)
        self.name = name
        self.description = description
        self.type = type
        self.accuracy = accuracy
        self.pips = pips
        self.shadowpips = pips.shadow
        self.normalpips = pips.normal
    end;
}

local Pips = class {
    constructor = function(self, normal, shadow)
        self.normal = normal
        self.shadow = shadow
    end;
}

local w101 = {
    worlds = {
        ['wizard city'] = World('Wizard City', 39, '0-5', 'wc',
            AreaList(
            Area 'Unicorn Way',
            Area 'Cyclops Lane',
            Area 'Firecat Alley',
            Area 'Triton Avenue'
            ), false
        );
        krokotopia = World('Krokotopia', 65, '5-15', 'kt',
            AreaList(
            Area 'Royal Hall',
            Area 'Chamber of Fire',
            Area 'Palace of Fire',
            Area 'Hall of Champions',
            Area 'Grand Arena',
            Area 'Entrance Hall',
            Area 'Tomb of Storms'
            ), true
        );
        marleybone = World('Marleybone', 50, '15-20', 'mb',
            AreaList(
            Area 'Hyde Park',
            Area 'Chelsea Court',
            Area 'Ironworks',
            Area 'Newgate Prison',
            Area 'Knight\'s Court',
            Area 'Katzenstein\'s Lab',
            Area 'Royal Museum'
            ), true
        );
        mooshu = World('MooShu', 88, '20-30', 'ms',
            AreaList(
            Area 'Jade Palace',
            Area 'Hametsu Village',
            Area 'Tatakai Outpost',
            Area 'Crimson Fields',
            Area 'Cave of Solitude',
            Area 'Kishibe Village',
            Area 'Shirataki Temple',
            Area 'Ancient Burial Grounds',
            Area 'Village of Sorrow',
            Area 'Yoshihito Temple',
            Area 'Emperor\'s Throne Room'
            ), true
        );
        dragonspyre = World('Dragonspyre', 106, '30-40', 'ds',
            AreaList(
            Area 'The Tower Archives',
            Area 'Plaza of Conquests',
            Area 'The Drake Hatchery',
            Area 'The Crucible',
            Area 'The Labyrinth',
            Area 'Dragonspyre Academy',
            Area 'Crystal Grove',
            Area 'The Forum',
            Area 'Dragon\'s Roost'
            ), false
        );
        celestia = World('Celestia', 95, '40-50', 'cl',
            AreaList(
            Area 'Survey Camp',
            Area 'The Grotto',
            Area 'District of the Stars',
            Area 'The Floating Land',
            Area 'Stormriven',
            Area 'Science Center',
            Area 'Crustacean Empire',
            Area 'The Chancel',
            Area 'Sanctum of the Sun'
            ), false
        );
        zafaria = World('Zafaria', 148, '50-60', 'zf',
            AreaList(
            Area 'Baobab Crossroads',
            Area 'Baobab Crown',
            Area 'Savannah',
            Area 'Zamunda Outskirts',
            Area 'Zamunda',
            Area 'Stone Town',
            Area 'Waterfront',
            Area 'Drum Jungle',
            Area 'Elephant Graveyard',
            Area 'Mirror Lake'
            ), true
        );
        avalon = World('Avalon', 161, '60-70', 'av',
            AreaList(
            Area 'High Road',
            Area 'Caer Lyon',
            Area 'The Wild',
            Area 'The Wyrd',
            Area 'Dun Dara',
            Area 'Outer Yard',
            Area 'Lake Shore',
            Area 'Deepwater',
            Area 'The Catacombs',
            Area 'Crystal Caves'
            ), false
        );
        azteca = World('Azteca', 197, '70-80', 'at',
            AreaList(
            Area 'The Zocalo',
            Area 'Three Points',
            Area 'Cenote',
            Area 'Mangrove Marsh',
            Area 'Saltmeadow Swamp',
            Area 'Zultun Dock',
            Area 'Cloudburst Forest',
            Area 'Alto Alto',
            Area 'Tierra de Brea',
            Area 'Pitch Black Lake',
            Area 'Floating Mountains',
            Area 'Twin Giants',
            Area 'Xibalba'
            ), false
        );
        khrysalis = World('Khrysalis', 277, '80-100', 'kr',
            AreaList(
            Area 'Bastion',
            Area 'Silent Market',
            Area 'Moon Cliffs',
            Area 'Last Wood',
            Area 'Tyrian Gorge',
            Area 'Fort Rachias',
            Area 'Crescent Beach',
            Area 'Ruined Alcazar',
            Area 'Radiance Reborn',
            Area 'Sardonyx',
            Area 'Kondha Desert',
            Area 'Solar Arc',
            Area 'The Hive',
            Area 'Shadow Palace'
            ), false
        );
        polaris = World('Polaris', 99, '100-110', 'none',
            AreaList(
            Area 'Walruskberg',
            Area 'Walruskberg Harbor',
            Area 'Forlorn Tayg',
            Area 'River of Frozen Tears',
            Area 'Urville Station',
            Area 'Frigid Maw',
            Area 'The Arcanum',
            Area 'Kataba IceBlock',
            Area 'Borealis Peaks',
            Area 'Horizon Hold'
            ), true
        );
        mirage = World('Mirage', 115, '110-120', 'mr',
            AreaList(
            Area 'Caravan',
            Area 'Alkali Barrows',
            Area 'Aggrobah',
            Area 'Caterwaul Canyons',
            Area 'Rubal Wastes',
            Area 'Istanboa',
            Area 'Yakhal Mountain',
            Area 'Thieve\'s Den',
            Area 'Eerem Palace',
            Area 'Chronoverge'
            ), false
        );
        empyrea = World('Empyrea', 149, '120-130', 'none',
            AreaList(
            Area 'Aerial Shores',
            Area 'Aerial Jungle',
            Area 'Zanadu',
            Area 'Zanadu Sewers',
            Area 'Outer Athanor',
            Area 'Inner Athanor',
            Area 'Sepidious',
            Area 'Samsara Village',
            Area 'Mandalla',
            Area 'Nexus (Reverie)',
            Area 'Nimbus Citadel',
            Area 'Port Aero',
            Area 'Southwest Aeroplains',
            Area 'Velo City',
            Area 'Northeast Aeroplains',
            Area 'Chaos Jungle',
            Area 'Husk',
            Area 'Storm Titan\'s Wake'
            ), false
        );
        karamelle = World('Karamelle', 80, '130-140', 'ka',
            AreaList(
            Area 'Karamelle City',
            Area 'Rock Candy Mountains',
            Area 'Sweetzburg',
            Area 'Nibbleheim',
            Area 'Gutenstadt',
            Area 'Gobblerton',
            Area 'Gumdrop Forest',
            Area 'Licorice Forest'
            ), 'unknown'
        );
        grizzleheim = World('Grizzleheim', 68, 'side world', 'gh', AreaList());
        wintertusk = World('Wintertusk', 51, 'side world', 'wt', AreaList());
    };
    schools = {
        elemental = SchoolGroup(School 'Fire', School 'Ice', School 'Storm');
        spiritual = SchoolGroup(School 'Life', School 'Death', School 'Myth');
        balance = School 'Balance';
    };
    spells = {
        fire = {
            damage = {

            };
            healing = {

            };
            wards = {

            };
            charms = {

            };
            global = {

            };
            manipulation = {

            };
        };
        ice = {
            icon = function(self)
                return self:parent():parent().schools.elemental.ice.icon
            end;
            damage = {

            };
            wards = {
                Spell('Tower Shield', '-50% next '..INC..DMG..' spell', WARD, 100, Pips(0));
            };
            charms = {

            };
            global = {

            };
            manipulation = {

            };
        };
        storm = {
            damage = {

            };
            wards = {

            };
            charms = {

            };
            global = {

            };
            healing = {

            };
            manipulation = {

            };
        };
        life = {
            damage = {

            };
            wards = {

            };
            charms = {

            };
            global = {

            };
            healing = {

            };
            manipulation = {

            };
        };
        death = {
            damage = {

            };
            wards = {

            };
            charms = {

            };
            global = {

            };
            healing = {

            };
            manipulation = {

            };
            health_drain = {

            };
        };
        myth = {
            damage = {

            };
            wards = {

            };
            charms = {

            };
            global = {

            };
            manipulation = {

            };
            enchantment = {

            };
        };
        balance = {
            damage = {

            };
            wards = {

            };
            charms = {

            };
            global = {

            };
            manipulation = {

            };
        };
        moon = {
            polymorph = {

            }
        };
        star = {
            aura = {

            }
        };
        sun = {
            enchantment = {

            };
        };
        shadow = {
            shadow_polymorph = {

            };
            shift_attack = {

            };
            manipulation = {

            };
        };
    };

    searchWorld = function(self, name)
        return self.worlds[name:lower()]
    end;
}

return w101