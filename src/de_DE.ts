export default {
    META: {
        name: ":flag_de: Deutsch (Deutschland)",
        locale: "de_DE",
        tranlators: [
            "318044130796109825" // Lio
        ]
    },
    CHANNEL_NOT_NSFW: "Dieser Channel ist nicht als NSFW markiert, schalte diese Einstellung ein und probier es nochmal.",
    INSUFFICIENT_PERMISSIONS: `You need \`PERMISSIONS\` Permissions to run this Command `,
    ON_COOLDOWN: `\`COMMAND\` ist grade auf Cooldown.`,
    ON_COOLDOWN_DESCRIPTION: `\`COMMAND\` hat einen Cooldown von \`COOLDOWN\` \n Warte \`TIME\` bevor du es noch einmal versuchst.`,
    ON_ERROR: `\`COMMAND\` ist ein Fehler unterlaufen.`,
    MISSING: {
        NOT_ENOUGH_TAGS: `Nicht genug Tags`,
        NOT_ENOUGH_TAGS_DESC: "Du musst mir Tags zum suchen geben.",
        RP_REQUIRE_MENTION: `Du musst einen anderen Benutzer erwähnen.`,
        MISSING_TITLE: `Fehlender Titel. Separiere den Titel und die Beschreibung mit einer "Pipe" (\`|\`)`,
        VALUE: {
            PREFIX: "Es wurde kein Prefix gegeben.",
            COUNTRY: "Kein Länder Code wurde gegeben"
        }
    },

    NOT_ENOUGH_TAGS: `Nicht genug Tags`,
    NOT_ENOUGH_TAGS_DESC: "Du musst mir Tags zum suchen geben.",
    RP_REQUIRE_MENTION: `Du musst einen anderen Benutzer erwähnen.`,
    // TODO: change the way the stuff below works or just remove it entirely
    RP_SELF: `Don't you want to ACTION someone other than yourself?`,
    RP_ME: `Don't ACTION me! ACTION someone else.`,
    MISSING_TITLE: `Fehlender Titel. Separiere den Titel und die Beschreibung mit einer "Pipe" (\`|\`).`,
    SUGGESTION_SENT: "Vorschlag abgeschickt.",
    INVITE_STRING: "Du kannst BOT mit diesem Link einladen",
    ROLL: ":game_die: Werfe AMOUNT DICE Würfel...",
    CATEGORIES: {
        INFO: { name: "Info", desc: "" },
        NSFW: { name: ":underage: NSFW", desc: "Horny Stuff, natürlich." },
        ANIMALS: { name: "Tiere", desc: "Süße Tierbilder um dir den Tag zu verschönern!" },
        MISC: { name: "Misc", desc: "Miscellaneous Commands" },
        FUN: { name: "Spaß", desc: "" },
        DEVELOPER: { name: "Entwickler", desc: "Developer only Commands, duh" },
    },
    DEVELOPER_ONLY: "Dieser Befehl ist nur für Entwickler.",
    MISC: {
        ENABLED: "An",
        DISABLED: "Aus",
    },
    LOCALE: {
        LANGUAGE: "Sprache",
        CONTRIBUTORS: "AMOUNT Übersetzer",
        TITLE: "LANGUAGE von TRANSLATOR",
        COMMAND_DESC: "BOT ist in AMOUNT Sprachen verfügbar, du kannst ganz einfach BOT's Sprache ändern indem du `PREFIX locale set <country_code>` in den Chat schickst\n\n[Übersetzungen](https://t8.pm/lingua) wird durch Hilfe der Community bereitgestellt.",
        UPDATED_SETTING: 'Updated SETTING to VALUE',
        UNSUPPORTED: "BOT unterstützt VALUE grade nicht.",
        DEFAULT: {
            LANGUAGES: "Sprachen",
            LOCALIZATION: "Lokalisierung",
            CURRENT: `Jetzige Sprache`,
            SUB: `• Benutz \`PREFIX locale set <country_code>\` um die Sprache des Server's zu ändern`
        }
    }
}