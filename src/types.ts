// To parse this data:
//
//   import { Convert, Language } from "./file";
//
//   const language = Convert.toLanguage(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Language {
    meta: Meta;
    missing: Missing;
    error: Error;
    categories: Categories;
    locale: Locale;
    misc: Misc;
    user: User;
    rp: Rp;
}

export interface Categories {
    info: Command;
    nsfw: Command;
    animals: Command;
    misc: Command;
    fun: Command;
    developer: Command;
}

export interface Command {
    name: string;
    desc: string;
}

export interface Error {
    nsfw: string;
    permissions: string;
    error: string;
    cooldown: Command;
    developer: string;
}

export interface Locale {
    language: string;
    translators: string;
    title: string;
    amount: string;
    updated: string;
    unsupported: string;
}

export interface Meta {
    name: string;
    locale: string;
    translators: number[];
}

export interface Misc {
    invite: string;
    roll: string;
    sent: string;
    enabled: string;
    disabled: string;
}

export interface Missing {
    tags: Command;
    values: Values;
    title: string;
    mention: string;
}

export interface Values {
    prefix: string;
    country: string;
    setting: string;
}

export interface Rp {
    client: string;
    self: string;
}

export interface User {
    info: string;
    status: string;
    roles: string;
    username: string;
    id: string;
    created: string;
    joined: string;
    states: States;
}

export interface States {
    online: string;
    dnd: string;
    idle: string;
    offline: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toLanguage(json: string): Language {
        return cast(JSON.parse(json), r("Language"));
    }

    public static languageToJson(value: Language): string {
        return JSON.stringify(uncast(value, r("Language")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Language": o([
        { json: "meta", js: "meta", typ: r("Meta") },
        { json: "missing", js: "missing", typ: r("Missing") },
        { json: "error", js: "error", typ: r("Error") },
        { json: "categories", js: "categories", typ: r("Categories") },
        { json: "locale", js: "locale", typ: r("Locale") },
        { json: "misc", js: "misc", typ: r("Misc") },
        { json: "user", js: "user", typ: r("User") },
        { json: "rp", js: "rp", typ: r("Rp") },
    ], false),
    "Categories": o([
        { json: "info", js: "info", typ: r("Command") },
        { json: "nsfw", js: "nsfw", typ: r("Command") },
        { json: "animals", js: "animals", typ: r("Command") },
        { json: "misc", js: "misc", typ: r("Command") },
        { json: "fun", js: "fun", typ: r("Command") },
        { json: "developer", js: "developer", typ: r("Command") },
    ], false),
    "Command": o([
        { json: "name", js: "name", typ: "" },
        { json: "desc", js: "desc", typ: "" },
    ], false),
    "Error": o([
        { json: "nsfw", js: "nsfw", typ: "" },
        { json: "permissions", js: "permissions", typ: "" },
        { json: "error", js: "error", typ: "" },
        { json: "Cooldown", js: "Cooldown", typ: r("Command") },
        { json: "developer", js: "developer", typ: "" },
    ], false),
    "Cooldown": o([
        { json: "title", js: "title", typ: "" },
        { json: "desc", js: "desc", typ: "" },
    ], false),
    "Locale": o([
        { json: "language", js: "language", typ: "" },
        { json: "translators", js: "translators", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "amount", js: "amount", typ: "" },
        { json: "updated", js: "updated", typ: "" },
        { json: "unsupported", js: "unsupported", typ: "" },
    ], false),
    "Meta": o([
        { json: "name", js: "name", typ: "" },
        { json: "locale", js: "locale", typ: "" },
        { json: "translators", js: "translators", typ: a(3.14) },
    ], false),
    "Misc": o([
        { json: "invite", js: "invite", typ: "" },
        { json: "roll", js: "roll", typ: "" },
        { json: "sent", js: "sent", typ: "" },
        { json: "enabled", js: "enabled", typ: "" },
        { json: "disabled", js: "disabled", typ: "" },
    ], false),
    "Missing": o([
        { json: "tags", js: "tags", typ: r("Command") },
        { json: "values", js: "values", typ: r("Values") },
        { json: "title", js: "title", typ: "" },
        { json: "mention", js: "mention", typ: "" },
    ], false),
    "Values": o([
        { json: "prefix", js: "prefix", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "setting", js: "setting", typ: "" },
    ], false),
    "Rp": o([
        { json: "client", js: "client", typ: "" },
        { json: "self", js: "self", typ: "" },
    ], false),
    "User": o([
        { json: "info", js: "info", typ: "" },
        { json: "status", js: "status", typ: "" },
        { json: "roles", js: "roles", typ: "" },
        { json: "username", js: "username", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "created", js: "created", typ: "" },
        { json: "joined", js: "joined", typ: "" },
        { json: "states", js: "states", typ: r("States") },
    ], false),
    "States": o([
        { json: "online", js: "online", typ: "" },
        { json: "dnd", js: "dnd", typ: "" },
        { json: "idle", js: "idle", typ: "" },
        { json: "offline", js: "offline", typ: "" },
    ], false),
};
