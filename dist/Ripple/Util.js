"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pair = exports.ModLogEmbed = exports.QuoteEmbed = exports.RippleEmbed = exports.Author = exports.RandomUser = exports.Last = exports.CommaNumber = exports.RomanNumeral = exports.ToTitleCase = exports.Arg = exports.RandomElement = exports.RandomIntFloor = exports.RandomInt = exports.Clamp = exports.SecondsToMS = exports.StripISO = exports.Channel = exports.Role = exports.User = exports.Hyperlink = void 0;
const discord_js_1 = require("discord.js");
const Hyperlink = (url, text) => text ?
    `[${text}](${url})`
    : url;
exports.Hyperlink = Hyperlink;
const User = (id) => `<@!${id}>`;
exports.User = User;
const Role = (id) => `<@&${id}>`;
exports.Role = Role;
const Channel = (id) => `<#${id}>`;
exports.Channel = Channel;
const StripISO = (iso) => typeof iso !== "string" ?
    iso.toDateString()
    : iso.slice(0, 10);
exports.StripISO = StripISO;
const SecondsToMS = (sec) => sec * 1000;
exports.SecondsToMS = SecondsToMS;
function Clamp(n, min = 0, max = Infinity) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}
exports.Clamp = Clamp;
const RandomInt = (x) => Math.round(Math.random() * x);
exports.RandomInt = RandomInt;
const RandomIntFloor = (x) => Math.floor(Math.random() * x);
exports.RandomIntFloor = RandomIntFloor;
const RandomElement = (a) => a[(0, exports.RandomIntFloor)(a.length)];
exports.RandomElement = RandomElement;
const Arg = (id, type, defaultValue, prompt) => {
    return {
        id: id,
        type: type,
        default: defaultValue,
        prompt: prompt
    };
};
exports.Arg = Arg;
const ToTitleCase = (item) => item.toLowerCase()
    .replace(/guild/g, 'Server')
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, t => t.toUpperCase());
exports.ToTitleCase = ToTitleCase;
/**
 * @description Converts an integer number to a Roman numeral
 * @throws If number is `<1` or `>3999`
 * @param {number} original
 * @returns {string} A Roman numeral string
 * @todo Could expand to support fractions, simply rounding for now
*/
const RomanNumeral = (original) => {
    if (original < 1 || original > 3999)
        throw new Error('Input integer limited to 1 through 3,999');
    const numerals = [
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
        ['M', 'MM', 'MMM'], // 1000-3000
    ];
    const digits = Math.round(original).toString().split('');
    let position = (digits.length - 1);
    return digits.reduce((roman, digit) => {
        if (digit !== '0')
            roman += numerals[position][parseInt(digit) - 1];
        position--;
        return roman;
    }, '');
};
exports.RomanNumeral = RomanNumeral;
const CommaNumber = (x) => Math.round(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
exports.CommaNumber = CommaNumber;
const Last = (arr) => arr[arr.length - 1];
exports.Last = Last;
const RandomUser = (msg) => msg.guild.members.cache.random();
exports.RandomUser = RandomUser;
const Author = (msg) => msg.member;
exports.Author = Author;
class RippleEmbed extends discord_js_1.MessageEmbed {
    constructor(title, emoji) {
        super();
        this
            .setTitle(title ? (emoji ? `${emoji}  ${title}  ${emoji}` : title) : "")
            .setColor("RANDOM")
            .setTimestamp();
    }
}
exports.RippleEmbed = RippleEmbed;
class QuoteEmbed extends RippleEmbed {
    SetQuote(content, author) {
        return this.setDescription(`*"${content}"* -${author}`);
    }
}
exports.QuoteEmbed = QuoteEmbed;
class ModLogEmbed extends RippleEmbed {
    constructor(logID) {
        super(`Mod Log #${(0, exports.CommaNumber)(logID)}`, "🛡️");
        this.setColor("RED");
    }
    SetEvent(content) {
        return this.addField("Event 📝", content);
    }
    SetDate(content) {
        return this.addField("Date 📆", content);
    }
    SetContent(content) {
        return this.addField("Content 🗒️", content);
    }
}
exports.ModLogEmbed = ModLogEmbed;
class Pair {
    constructor(First, Second) {
        this.First = First;
        this.Second = Second;
    }
}
exports.Pair = Pair;
