const {
  Client
} = require('discord.js');
const {
  Schema
} = require('mongoose');

const MESSAGES = {
  COMMANDS: {
    ADMIN: {
      EVAL: {
        name: "eval",
        aliases: ["eval"],
        category: "admin",
        categoryName: "Admin",
        description: {
          en: 'Only for bot owner',
          fr: 'Seulement pour le créateur du bot'
        },
        ownerCmd: true,
        cooldown: 0.1,
        enable: true,
        usage: "<code>",
        example: null,
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true,
      },
      RAID: {
        name: "secret",
        aliases: ["deleteall"],
        category: "admin",
        description: {
          en: "Only for bot owner",
          fr: 'Seulement pour le créateur du bot'
        },
        ownerCmd: true,
        cooldown: 0.1,
        enable: true,
        usage: "",
        example: null,
        botPerm: true,
        botPermName: 'ADMINISTRATOR',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: false
      },
      ANNONCE: {
        name: "annonce",
        aliases: ["annonce"],
        category: "admin",
        description: {
          en: "Only for bot owner",
          fr: 'Seulement pour le créateur du bot'
        },
        ownerCmd: true,
        cooldown: 0.1,
        enable: true,
        usage: "Embed Data",
        example: null,
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true,
      },
      SPOIL: {
        name: "spoil",
        aliases: ["spoil"],
        category: "admin",
        description: {
          en: "Only for bot owner",
          fr: 'Seulement pour le créateur du bot'
        },
        ownerCmd: true,
        cooldown: 0.1,
        enable: true,
        usage: "Embed Data",
        example: null,
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true,
      },
      UPDATE: {
        name: "update",
        aliases: ["update"],
        category: "admin",
        description: {
          en: "Only for bot owner",
          fr: 'Seulement pour le créateur du bot'
        },
        ownerCmd: true,
        cooldown: 0.1,
        enable: true,
        usage: "Embed Data",
        example: null,
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true,
      },
    },
    BACKUPS: {
      BACKUP: {
        name: "backup",
        aliases: ["backup"],
        category: "backup",
        categoryName: "Backup",
        description: {
          en: "Create and manage servers backups.",
          fr: "Créer et gérer les sauvegardes de serveurs."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: false,
        usage: "<action> (backupID)",
        example: null,
        botPerm: true,
        botPermName: 'ADMINISTRATOR',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "ADMINISTRATOR",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
    },
    BRAWL: {
      CLUB: {
        name: "club",
        aliases: ["club"],
        category: "brawl",
        categoryName: "Brawl-Stars",
        description: {
          en: "Get a brawl-club informations.",
          fr: "Voir les informations d'un brawl club."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: false,
        usage: "<club_tag>",
        example: "~save #AVGI2974K",
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
      PLAYER: {
        name: "player",
        aliases: ["player"],
        category: "brawl",
        categoryName: "Brawl-Stars",
        description: {
          en: "Get a brawl-player informations.",
          fr: "Voir les informations d'un joueur brawl."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: false,
        usage: "<player_tag>",
        example: "~save #AVGI2974K",
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
      SAVE: {
        name: "save",
        aliases: ["save"],
        category: "brawl",
        categoryName: "Brawl-Stars",
        description: {
          en: "Save your brawl stars profile on the bot.",
          fr: "Sauvegarder votre profile brawl-stars sur le bot."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: false,
        usage: "<player_tag>",
        example: "~save #CVJCVPG0",
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
    },
    COUNTERS: {
      MANAGE: {
        emoji: '806440887365795870',
        name: {
          en: 'Manage',
          fr: 'Gérer'
        },
        CREATE: {
          name: "counter create",
          aliases: ["counter"],
          category: "counters",
          categoryName: "Counters",
          description: {
            en: "Create a counter channel.",
            fr: "Créer un salon-compteur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: 'MANAGE_CHANNELS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_CHANNELS",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        EDIT: {
          name: "counter edit",
          aliases: [""],
          category: "counters",
          categoryName: "Counters",
          description: {
            en: "Edit a counter channel.",
            fr: "Modifier un salon-compteur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: 'MANAGE_CHANNELS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_CHANNELS",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        DELETE: {
          name: "counter delete",
          aliases: [""],
          category: "counters",
          categoryName: "Counters",
          description: {
            en: "Delete a counter channel.",
            fr: "Supprimer un salon-compteur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: 'MANAGE_CHANNELS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_CHANNELS",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        }
      },
    },
    ECONOMY: {
      ADMIN: {
        emoji: '852246257560453122',
        name: 'Admin',
        description: '{economy.admin}',
        ADDMONEY: {
          name: "addmoney",
          aliases: ["addmoney"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Add money (cash or bank) to a member's balance.",
            fr: "Ajouter de la monnaie (cash ou banque) à un membre."
          },
          ownerCmd: false,
          cooldown: 10,
          enable: true,
          usage: "[cash | bank] <member> <amount>",
          example: "~addmoney bank @Noct 100",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_ROLES",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        ADDMONEYROLE: {
          name: "addmoneyrole",
          aliases: ["addmoneyrole"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Add money (cash or bank) balance of every members with a specific role.",
            fr: "Ajouter de la monnaie (cash ou banque) à tous les membres possédant un rôle spécifique."
          },
          ownerCmd: false,
          cooldown: 10,
          enable: true,
          usage: "[cash | bank] <role> <amount>",
          example: "~addmoneyrole cash @everyone 100",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_ROLES",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        CREATEITEM: {
          name: "createitem",
          aliases: ["createitem"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Create an item for the server's shop.",
            fr: "Créer un objet dans la boutique du serveur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "ADMINISTRATOR",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        SETMONEY: {
          name: "setmoney",
          aliases: ["setmoney"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Set the money (default is $). It can be an emoji or other.",
            fr: "Changer la monnaie du serveur (par défault $). Cela peut être par un émoji ou autre."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "<new_money>",
          example: "~setmoney §",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "ADMINISTRATOR",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        REMMONEY: {
          name: "remmoney",
          aliases: ["removemoney"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Remove money (cash or bank) from a member's balance.",
            fr: "Retirer de la monnaie (cash ou banque) d'un membre."
          },
          ownerCmd: false,
          cooldown: 10,
          enable: true,
          usage: "[cash | bank] <user> <amount>",
          example: "~rem-money cash @Noct 100",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_ROLES",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        REMMONEYROLE: {
          name: "remmoneyrole",
          aliases: ["removemoneyrole"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Remove money (cash or bank) from all member's balance who have specific role.",
            fr: "Retirer de la monnaie (cash ou banque) de tout les membres possédant un rôle spécifique.",
          },
          ownerCmd: false,
          cooldown: 10,
          enable: false,
          usage: "[cash | bank] <role> <amount>",
          example: "~remmoney-role @everyone 4700",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_ROLES",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
      },
      ITEMS: {
        name: 'Items',
        emoji: '830692404088537138',
        description: '{economy.items}',
        SELLITEM: {
          name: "sellitem",
          aliases: ["sellitem"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Sell an item from your inventory.",
            fr: "Vendre un objet de votre inventaire."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "<item> {nb}",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        SHOP: {
          name: "shop",
          aliases: ["store"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "View the list of server items available.",
            fr: "Voir la liste des objets disponible dans la boutique du serveur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "{page_nb}",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        VIEWITEM: {
          name: "viewitem",
          aliases: ["viewitem"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "View an item in the shop.",
            fr: "Voir un objet de la boutique."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "<item_name>",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        GIVEITEM: {
          name: "giveitem",
          aliases: ["giveitem"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Give an item from your inventory to a member.",
            fr: "Donner un objet de votre inventaire à un autre membre."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "<item> {nb} <@user>",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        BUY: {
          name: "buy",
          aliases: ["buyitem"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Buy an item from the server's shop.",
            fr: "Acheter un objet de la boutique."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "<item> {nb}",
          example: "~buy someItem 1",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
      },
      GETMONEY: {
        name: 'Receive',
        emoji: '852423090831228958',
        description: '{economy.getmoney}',
        DAILY: {
          name: "daily",
          aliases: ["daily"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Get your daily rewards, money & credits !",
            fr: "Obtiens ta récompense journalière, argent & crédits !"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        HOURLY: {
          name: "hourly",
          aliases: ["hourly"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Claim hourly rewards",
            fr: "Obtiens ta récompense toute les heures."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        ROB: {
          name: "rob",
          aliases: ["rob"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Rob money from an user.",
            fr: "Voler de la monnaie à un membre."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "<user>",
          example: "~rob @Noct",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        WORK: {
          name: "work",
          aliases: ["work"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Work to get server money.",
            fr: "Travailler pour avoir de l'argent du serveur."
          },
          ownerCmd: false,
          cooldown: 300,
          enable: false,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
      },
      MANAGE: {
        emoji: '852246257543020685',
        name: 'Manage',
        description: '{economy.managemoney}',
        DEPOSIT: {
          name: "deposit",
          aliases: ["dep"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Deposit money from your hand(cash) to bank",
            fr: "Déposer de l'argent de votre poche (cash) à la banque."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "<amount | all>",
          example: "~dep 108",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        MONEY: {
          name: "money",
          aliases: ["bal", "balance"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Show an user money balance",
            fr: "Voir la balance d'un utilisateur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "{optional : @user}",
          example: "",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        RESETMONEY: {
          name: "resetmoney",
          aliases: ["resetmoney"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Reset all your money (cash and bank) (1/week).",
            fr: "Remet à 0 votre monnaie (1/semaine)"
          },
          ownerCmd: false,
          cooldown: 6.048e+8,
          enable: false,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        GIVEMONEY: {
          name: "givemoney",
          aliases: ["gmoney"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Give specific amount of your hand money (cash) to an user",
            fr: "Donner un montant spécifique à un membre."
          },
          ownerCmd: false,
          cooldown: 10,
          enable: true,
          usage: "@user (amount | all)",
          example: "~givemoney @Noct 700",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        WITHDRAW: {
          name: "withdraw",
          aliases: ["with"],
          category: "economy",
          categoryName: "Economy",
          description: {
            en: "Withdraw money from bank to your hand(cash)",
            fr: "Retirer de l'argent de votre banque."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "<amount | all>",
          example: "~with all",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
      },
    },
    GIVEAWAY: {
      MANAGE: {
        name: 'Manage',
        emoji: '806440887365795870',
        description: '',
        GCREATE: {
          name: "gcreate",
          aliases: ['gcreate'],
          category: 'giveaway',
          categoryName: "Giveaway",
          description: {
            en: "Create a giveaway",
            fr: "Créer un cadeau"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: '<nb_winners> <time> <price> {#channel}',
          example: "~gcreate 3 3d Nitro #giveaway-channel",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_MESSAGES",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        GEDIT: {
          name: "gedit",
          aliases: ['gedit'],
          category: 'giveaway',
          categoryName: "Giveaway",
          description: {
            en: "Edit a giveaway",
            fr: "Modifier un cadeau"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: '<message_id> <time | winnerCount | price | blackRoles | whiteRoles> {newSettings}',
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_MESSAGES",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        GEND: {
          name: "gend",
          aliases: ['gend'],
          category: 'giveaway',
          categoryName: "Giveaway",
          description: {
            en: "End a giveaway",
            fr: "Mettre fin au cadeau"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: '{message_id}',
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_MESSAGES",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        GDELETE: {
          name: "gdelete",
          aliases: ['gdelete'],
          category: 'giveaway',
          categoryName: "Giveaway",
          description: {
            en: "Delete a giveaway",
            fr: "Supprimer un cadeau"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: '<message_id>',
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_MESSAGES",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        GREROLL: {
          name: "greroll",
          aliases: ['greroll'],
          category: 'giveaway',
          categoryName: "Giveaway",
          description: {
            en: "Reroll a giveaway",
            fr: "Relancer le tirage du gagnant du cadeau."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: '{message_id} {new_winners_nb}',
          example: "~greroll 190736281479101979 3",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_MESSAGES",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        GRESTART: {
          name: "grestart",
          aliases: ['grestart'],
          category: 'giveaway',
          categoryName: "Giveaway",
          description: {
            en: "Restart an ended giveaway",
            fr: "Relancer un cadeau terminé"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: '<message_id>',
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_MESSAGES",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        }
      },
      INFO: {
        name: 'Info',
        description: '',
        emoji: '852254746155941938',
        GLIST: {
          name: "glist",
          aliases: ['glist'],
          category: 'giveaway',
          categoryName: "Giveaway",
          description: {
            en: "List of running giveaways in the server.",
            fr: "Liste des cadeaux en cours sur le serveur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: '',
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_MESSAGES",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
      },
    },
    INFO: {
      GUILD: {
        name: 'Guild',
        emoji: '806440886682648597',
        CHANNELINFO: {
          name: "channelinfo",
          aliases: ["ci"],
          category: "info",
          categoryName: "Info",
          description: {
            en: "Get a channel informations",
            fr: "Voir les informations d'un salon"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "{#channel}",
          example: "~channelinfo #chat",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        ROLEINFO: {
          name: "roleinfo",
          aliases: ["ri"],
          category: "info",
          categoryName: "Info",
          description: {
            en: "Get a role informations",
            fr: "Voir les informations d'un rôle"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "{@role}",
          example: "~roleinfo @everyone",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        MESSAGES: {
          name: "messages",
          aliases: ["msgs", "msg"],
          category: "info",
          categoryName: "Info",
          description: {
            en: "Show amount of an user messages sent.",
            fr: "Voir le nombre de messages envoyés par l'utilisateur"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "{#role}",
          example: "~roleinfo @everyone",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        SERVERINFO: {
          name: "serverinfo",
          aliases: ["si"],
          category: "info",
          categoryName: "Info",
          description: {
            en: "Get the server informations",
            fr: "Obtenir les informations du serveur"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        USERINFO: {
          name: "userinfo",
          aliases: ["ui", "whois", "userinfos"],
          category: "info",
          categoryName: "Info",
          description: {
            en: "Get an user informations",
            fr: "Voir les informations d'un utilisateur"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: "",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        MEMBERINFO: {
          name: "memberinfo",
          aliases: ["mi", "memberinfos"],
          category: "info",
          categoryName: "Info",
          description: {
            en: "Get a member informations",
            fr: "Voir les informations d'un utilisateur"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: "",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
      },
      BOT: {
        name: 'Bot',
        emoji: '806440887332372482',
        BOTINFO: {
          name: "botinfo",
          aliases: ["bi", "botstats"],
          category: "info",
          categoryName: "Info",
          description: {
            en: "Get the bot info",
            fr: "Avoir les infos du bot"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        ADDBOT: {
          name: "links",
          aliases: ["invite", "botinvite", "invitebot", "addbot", "support", "supportserver", "vote"],
          category: "info",
          categoryName: "Info",
          description: {
            en: "Get bot's important links",
            fr: "Obtenir les liens importants du bot"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        PING: {
          name: "ping",
          aliases: ["ping"],
          category: "util",
          categoryName: "Util",
          description: {
            en: "Get the latence of the API",
            fr: "Avoir la latence de l'API"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
      },
    },
    INVITES: {
      INVITES: {
        name: "invites",
        aliases: ['invites'],
        category: "invites",
        categoryName: "Invites",
        description: {
          en: "Get the amount of an user's invites",
          fr: "Voir le nombre d'invitations obtenus par l'utilisateur."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: "{@user}",
        example: null,
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: false,
      },
      ADDINVITES: {
        name: "addinvites",
        aliases: ['addinvites'],
        category: "invites",
        categoryName: "Invites",
        description: {
          en: "Add an amount to an user's invites",
          fr: "Ajouter un montant au total d'invitations d'un utilisateur."
        },
        ownerCmd: false,
        cooldown: 30,
        enable: false,
        usage: "<nb> {@user}",
        example: "~addinvites 4 @NLB94",
        botPerm: false,
        botPermName: '',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "ADMINISTRATOR",
        onlyPremium: false,
        onlyInServer: true,
        args: true,
      },
      REMINVITES: {
        name: "reminvites",
        aliases: ['removeinvites'],
        category: "invites",
        categoryName: "Invites",
        description: {
          en: "Remove an amount from an user's invites",
          fr: "Retirer un montant du total d'invitations d'un utilisateur."
        },
        ownerCmd: false,
        cooldown: 30,
        enable: false,
        usage: "<nb> {@user}",
        example: "~reminvites 10 @Noct",
        botPerm: false,
        botPermName: '',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "ADMINISTRATOR",
        onlyPremium: false,
        onlyInServer: true,
        args: true,
      },
      RESETINVITES: {
        name: "resetinvites",
        aliases: ['resetinvites'],
        category: "invites",
        categoryName: "Invites",
        description: {
          en: "Reset an user's invites",
          fr: "Remettre à 0 le total d'invitations d'un utilisateur"
        },
        ownerCmd: false,
        cooldown: 30,
        enable: false,
        usage: "@user",
        example: "~resetinvites @NLB94",
        botPerm: false,
        botPermName: '',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "ADMINISTRATOR",
        onlyPremium: false,
        onlyInServer: true,
        args: true,
      },
    },
    LEVEL: {
      MANAGE: {
        name: 'Manage',
        emoji: '852246257543020685',
        ADDXP: {
          name: "addxp",
          aliases: ["addxp"],
          category: "level",
          categoryName: "Level",
          description: {
            en: "Add xp to an user",
            fr: "Ajouter de l'XP à un utilisateur"
          },
          ownerCmd: false,
          cooldown: 30,
          enable: true,
          usage: "<xp_to_add> {optional: @user}",
          example: "~addxp 1.7K",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_ROLES",
          onlyPremium: true,
          onlyInServer: true,
          args: true,
        },
        REMXP: {
          name: "removexp",
          aliases: ["remxp", "deletexp"],
          category: "level",
          categoryName: "Level",
          description: {
            en: "Remove xp from an user ",
            fr: "Retirer de l'XP d'un utilisateur"
          },
          ownerCmd: false,
          cooldown: 30,
          enable: false,
          usage: "<xp_to_rem> {optional: @user}",
          example: "~remxp 700",
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_ROLES",
          onlyPremium: true,
          onlyInServer: true,
          args: true,
        },
        RESETXP: {
          name: "resetxp",
          aliases: ["resetxp"],
          category: "level",
          categoryName: "Level",
          description: {
            en: "Reset an user experience.",
            fr: "Remettre à 0 l'XP d'un utilisateur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "{user}",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: true,
          onlyInServer: true,
          args: false,
        },
        SETTINGS: {
          name: "level",
          aliases: ["setlevel"],
          category: "level",
          categoryName: "Level",
          description: {
            en: "Configure level system",
            fr: "Configurer le système de niveau"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "<keys> {value}",
          example: "~level enable",
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
      },
      INFO: {
        name: 'Info',
        emoji: '852254746155941938',
        LEADERBOARD: {
          name: "leaderboard",
          aliases: ["lb", "lbxp", "levels"],
          category: "level",
          categoryName: "Level",
          description: {
            en: "Show server's level leaderboard",
            fr: "Voir le classement de niveau du serveur"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
        RANK: {
          name: "rank",
          aliases: ["xp"],
          category: "level",
          categoryName: "Level",
          description: {
            en: "Show an user rank",
            fr: "Voir le rang d'un utilisateur"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "{optional: @user}",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: false,
          onlyServerOwner: false,
          reqPermName: "",
          onlyPremium: false,
          onlyInServer: true,
          args: false,
        },
      },
    },
    MODERATION: {
      ROLES: {
        name: 'Roles',
        emoji: '853985510967345223',
        ADDROLE: {
          name: "addrole",
          aliases: ["role", "addroles"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Add role(s) to user(s).",
            fr: "Ajouter un(des) rôle(s) à un(des) utilisateur(s)."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "@role(s) @user(s)",
          example: "~addrole @role1 @user1 @user2 @role2",
          botPerm: true,
          botPermName: 'MANAGE_ROLES',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_ROLES",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        REMROLE: {
          name: "remrole",
          aliases: ["remroles"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Remove role(s) from user(s).",
            fr: "Retirer un(des) rôle(s) d'un(des) utilisateur(s)."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "@role(s) @user(s)",
          example: "~remroles @user1 @role1 @user2",
          botPerm: true,
          botPermName: 'MANAGE_ROLES',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_ROLES",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
      },
      MEMBERMANAGER: {
        name: 'Members',
        emoji: '806440887332372482',
        BAN: {
          name: "ban",
          aliases: ["ban"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Ban an user from the server.",
            fr: "Bannir un utilisateur du serveur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "@user {optional : reason}",
          example: "",
          botPerm: true,
          botPermName: 'BAN_MEMBERS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "BAN_MEMBERS",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        KICK: {
          name: "kick",
          aliases: ["kick"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Kick an user from the server",
            fr: "Expulser un utilisateur du serveur"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "@user {optional : reason}",
          example: "",
          botPerm: true,
          botPermName: 'KICK_MEMBERS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "KICK_MEMBERS",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        MUTE: {
          name: "mute",
          aliases: ["mute"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Mute an user (write, speak and react).",
            fr: "Rendre muet un utilisateur (écrit/vocal & réagir)."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "@user {time} <reason>",
          example: "~mute @Noct 24H spam",
          botPerm: true,
          botPermName: 'MANAGE_ROLES',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MUTE_MEMBERS",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        PRUNE: {
          name: "prune",
          aliases: ["prune"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Kick inactive members.",
            fr: "Expulser les membres ayant une certaine inactivité."
          },
          ownerCmd: false,
          cooldown: 10,
          enable: false,
          usage: "<nb_of_day>",
          example: null,
          botPerm: true,
          botPermName: 'ADMINISTRATOR',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "ADMINISTRATOR",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        TEMPBAN: {
          name: "tempban",
          aliases: ["tempban"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Ban an user from the server temporary.",
            fr: "Bannir un utilisateur du serveur pour une durée déterminée."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "@user {optional : time}",
          example: "~tempban @Noct#0000 2d Not allowed content",
          botPerm: true,
          botPermName: 'BAN_MEMBERS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "BAN_MEMBERS",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        UNBAN: {
          name: "unban",
          aliases: ["unban"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Unban a banned user from the server.",
            fr: "Débannir un utilisateur qui fût banni du serveur."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "<user_id>",
          example: "~unban 735824367698837555",
          botPerm: true,
          botPermName: 'BAN_MEMBERS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "BAN_MEMBERS",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        UNMUTE: {
          name: "unmute",
          aliases: ["unmute"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Unmute a muted user (see mute command)",
            fr: "Démutez un membre étant muet (voir commande mute)"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "@user",
          example: "",
          botPerm: true,
          botPermName: 'MANAGE_ROLES',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MUTE_MEMBERS",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        WARN: {
          name: "warn",
          aliases: ["warn"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Warn an user.",
            fr: "Avertir un membre."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "@user",
          example: "",
          botPerm: true,
          botPermName: 'MANAGE_ROLES',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MUTE_MEMBERS",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
        WARNINGS: {
          name: "warnings",
          aliases: ["warnings"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Show an user warnings.",
            fr: "Voir la liste d'avertissement d'un membre."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "@user",
          example: null,
          botPerm: false,
          botPermName: '',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MUTE_MEMBERS",
          onlyPremium: false,
          onlyInServer: true,
          args: true
        },
      },
      CHANNELMANAGER: {
        name: 'Channels',
        emoji: '806440888590008360',
        CLEAR: {
          name: "clear",
          aliases: ["purge"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Clear a specific amount of messages in channel.",
            fr: "Supprimer un nombre spécifique de messages dans le salon."
          },
          ownerCmd: false,
          cooldown: 1,
          enable: true,
          usage: "<nb> {@user}",
          example: null,
          botPerm: true,
          botPermName: 'MANAGE_MESSAGES',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_MESSAGES",
          onlyPremium: false,
          onlyInServer: true,
          args: true,
        },
        LOCK: {
          name: "lock",
          aliases: ["lockdown"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Lock a channel for members without administrator permission.",
            fr: "Blocker un salon afin d'empêcher les membres n'étant pas admin d'envoyer des messages."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_CHANNELS",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        NUKE: {
          name: "nuke",
          aliases: ["nuke"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Delete all messages in the channel.",
            fr: "Supprimer tout les messages du salon."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_CHANNELS",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        RESETSLOW: {
          name: "resetslowmode",
          aliases: ["resetslow"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Reset the slowmode in the channel.",
            fr: "Retirer le mode-lent dans le salon."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "{time | 5s} {#channel}",
          example: "~slowmode 5m",
          botPerm: true,
          botPermName: 'MANAGE_CHANNELS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_CHANNELS",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        SLOWMODE: {
          name: "slowmode",
          aliases: ["setslowmode"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Set slowmode in a channel.",
            fr: "Modifier le mode-lent dans le salon."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "<time> {#channel}",
          example: "~slowmode 5m",
          botPerm: true,
          botPermName: 'MANAGE_CHANNELS',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_CHANNELS",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        UNLOCK: {
          name: "unlock",
          aliases: ["unlockdown"],
          category: "moderation",
          categoryName: "Moderation",
          description: {
            en: "Unlock a locked channel (see lock command)",
            fr: "Débloquer un salon bloqué (voir commande lock)"
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "MANAGE_CHANNELS",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
      },
    },
    //A FAIRE ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII 
    //changer la desc des cmds en en et fr a partir de la
    UTIL: {
      HELP: {
        name: "help",
        aliases: ["help"],
        category: "util",
        categoryName: "Util",
        description: {
          en: "List of bot's commands",
          fr: "Liste des commandes du bot"
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: "{command | category | <page_nb>}",
        example: "~help 4",
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: false
      },
      NICK: {
        name: "nick",
        aliases: ["nick"],
        category: "util",
        categoryName: "Util",
        description: {
          en: "Change an user nickname",
          fr: "Changer le surnom d'un membre"
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: "<new_nick> {@user}",
        example: "~nick BestBot @Noct",
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
      AVATAR: {
        name: "avatar",
        aliases: ["pp"],
        category: "util",
        categoryName: "Util",
        description: {
          en: "Show an user profile picture.",
          fr: "Voir la photo de profil d'un utilisateur."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: "{@user}",
        example: null,
        botPerm: false,
        botPermName: '',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: false
      },
      POLL: {
        name: "poll",
        aliases: ["poll"],
        category: "util",
        categoryName: "Util",
        description: {
          en: "Make a simple poll",
          fr: "Créer un simple sondage"
        },
        ownerCmd: false,
        cooldown: 1,
        enable: true,
        usage: '\"poll\" \"Answer(s)\"',
        example: '~poll "Is Noct a good bot ?" "Yes" "No" "Maybe"',
        botPerm: true,
        botPermName: 'MANAGE_MESSAGES',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "MANAGE_ROLES",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
      REACT: {
        name: "react",
        aliases: ["react"],
        category: "util",
        categoryName: "Util",
        description: {
          fr: "React to a message with an emoji ID/name",
          fr: "Réagis à un message avec l'ID/le nom d'un émoji"
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: "<message_id> <reaction_id>",
        example: "~react ^ 826870663569997884",
        botPerm: true,
        botPermName: 'ADD_REACTIONS',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "ADD_REACTIONS",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
      REPORT: {
        name: "report",
        aliases: ["rp"],
        category: "util",
        categoryName: "Util",
        description: {
          en: "Report a bug to bot's creator.",
          fr: "Faire un rapport d'erreurs au créateur du bot."
        },
        ownerCmd: false,
        cooldown: 3600,
        enable: true,
        usage: "<report>",
        example: "~report Ban command have some bugs (...).",
        botPerm: false,
        botPermName: 'SEND_MESSAGES',
        permissions: false,
        onlyServerOwner: false,
        reqPermName: "",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
      SAY: {
        name: "say",
        aliases: ["rep"],
        category: "util",
        categoryName: "Util",
        description: {
          en: "Bot will repeat the message",
          fr: "Faire répeter un message au bot"
        },
        ownerCmd: false,
        cooldown: 1,
        enable: true,
        usage: "<message>",
        example: "~say I2Z7 Best Bot",
        botPerm: false,
        botPermName: '',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "MANAGE_MESSAGES",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
    },
    CONFIGURATION: {
      AUTOMODERATION: {
        name: 'Auto-Moderation',
        emoji: '853707412229849098',
        ANTIRAID: {
          name: "antiraid",
          aliases: ["antiraid"],
          category: "configuration",
          description: {
            en: "Configure anti-raid mode.",
            fr: "Configurer le mode anti-raid."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: false,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: 'ADMINISTRATOR',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "ADMINISTRATOR",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        ANTIINVITE: {
          name: "antiinvite",
          aliases: ["antiinvite"],
          category: "configuration",
          description: {
            en: "Configure anti-invite mode.",
            fr: "Configurer le mode anti-invite."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: 'MANAGE_MESSAGES',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "ADMINISTRATOR",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        ANTILINK: {
          name: "antilink",
          aliases: ["antilink"],
          category: "configuration",
          description: {
            en: "Configure anti-link mode.",
            fr: "Configurer le mode anti-link."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: 'MANAGE_MESSAGES',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "ADMINISTRATOR",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
        AUTOMOD: {
          name: "automod",
          aliases: ["automod"],
          category: "configuration",
          description: {
            en: "Configure auto-moderation system.",
            fr: "Configurer le système auto-moderation."
          },
          ownerCmd: false,
          cooldown: 0.1,
          enable: true,
          usage: "",
          example: null,
          botPerm: true,
          botPermName: 'ADMINISTRATOR',
          permissions: true,
          onlyServerOwner: false,
          reqPermName: "ADMINISTRATOR",
          onlyPremium: false,
          onlyInServer: true,
          args: false
        },
      },
      BOTSETTINGS: {
        name: "botsettings",
        aliases: ["botconfig"],
        category: "configuration",
        description: {
          en: "Show bot's settings in server.",
          fr: "Voir les réglages du bot dans le serveur."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: ``,
        example: null,
        botPerm: false,
        botPermName: '',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "MANAGE_GUILD",
        onlyPremium: false,
        onlyInServer: true,
        args: false
      },
      CHANGE: {
        name: "config",
        aliases: ["change", "setup"],
        category: "configuration",
        description: {
          en: "Config bot's general settings.",
          fr: "Configurer les réglages principaux du bot."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: `<key> <new_value>`,
        example: "~config prefix /",
        botPerm: false,
        botPermName: '',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "ADMINISTRATOR",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
      CUSTOMCMD: {
        name: "newcmd",
        aliases: ["createcmd"],
        category: "configuration",
        description: {
          en: "Create a new custom command for the server.",
          fr: "Créer une commande personnalisée pour le serveur."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: false,
        usage: "",
        example: null,
        botPerm: true,
        botPermName: 'ADMINISTRATOR',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "ADMINISTRATOR",
        onlyPremium: false,
        onlyInServer: true,
        args: false
      },
      ENABLE: {
        name: "enable",
        aliases: ["enable"],
        category: "configuration",
        description: {
          en: "Enable some bot's features.",
          fr: "Activer certaines fonctionnalités."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: `<key>`,
        example: "~enable level",
        botPerm: false,
        botPermName: '',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "MANAGE_GUILD",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      },
      DISABLE: {
        name: "disable",
        aliases: ["disable"],
        category: "configuration",
        description: {
          en: "Disable some bot's features.",
          fr: "Désactiver certaines fonctionnalités."
        },
        ownerCmd: false,
        cooldown: 0.1,
        enable: true,
        usage: `<key>`,
        example: "~disable level",
        botPerm: false,
        botPermName: '',
        permissions: true,
        onlyServerOwner: false,
        reqPermName: "MANAGE_GUILD",
        onlyPremium: false,
        onlyInServer: true,
        args: true
      }
    },
  },
};

const categories = [
  /*CONFIGURATION*/
  {
    name: {
      en: 'Configuration',
      fr: 'Configuration'
    },
    icon: "tools",
    description: {
      en: "Configure the bot as you wish to build the best Discord server !",
      fr: "Gérer les paramètres du bot comme vous le souhaitez afin de construire le meilleur serveur Discord !"
    },
    emoji: '852246257543020685',
    commandsCat: 'configuration',
    position: 1,
    underCat: [{
      name: {
        en: 'Auto-Moderation',
        fr: 'Auto-Modération'
      },
      description: {
        en: 'Auto-moderation help admins to moderate the server when they are offline.',
        fr: 'L\'auto-modération aide les admins à modérer le serveur lorsqu\'ils sont hors ligne.'
      },
      emoji: '853707412229849098'
    }]
  },
  /* MODERATION */
  {
    name: {
      en: 'Moderation',
      fr: 'Modération'
    },
    icon: "hammer",
    description: {
      en: "Manage your members with a fast, trustworthy & complete moderation system !",
      fr: "Gérer vos membres l'aide d'un système de modération fiable, rapide & complet !"
    },
    emoji: '852246257560453122',
    commandsCat: 'moderation',
    position: 2,
    underCat: [{
      name: {
        en: 'Roles',
        fr: 'Rôles'
      },
      description: {
        en: 'Manage roles & your members\'s roles',
        fr: 'Gérer les rôles & les rôles de vos membres'
      },
      emoji: '853985510967345223'
    }, {
      name: {
        en: 'Members',
        fr: 'Membres'
      },
      description: {
        en: 'Manage your members with these simple commands !',
        fr: 'Gérer vos membres avec ces simples commandes !'
      },
      emoji: '806440887332372482'
    }, {
      name: {
        en: 'Channels',
        fr: 'Salons'
      },
      description: {
        en: 'Manage channels by deleting messages, set slow-mode, and much more',
        fr: 'Gérer les salons en supprimant les messages, activant le mode-lent, et bien plus !'
      },
      emoji: '806440888590008360'
    }]
  }, /*LEVEL*/ {
    name: {
      en: 'Level',
      fr: 'Niveau'
    },
    icon: "caret-up",
    description: {
      en: "Show active members of your server and reward them with some roles or virtual bot money (always on dev...)",
      fr: "Voyez qui sont les membres actifs sur votre serveur et récompensez-les avec des rôles ou de l'argent virtuel du bot (en développement)"
    },
    emoji: '809429129178251334',
    commandsCat: 'level',
    position: 3,
    underCat: [{
      name: {
        en: 'Manage',
        fr: 'Gérer'
      },
      description: {
        en: 'Manage members\'s XPs & level',
        fr: 'Gérer l\'XP et le niveau des membres.'
      },
      emoji: '852246257543020685'
    }, {
      name: {
        en: 'Info',
        fr: 'Info'
      },
      description: {
        en: 'Show members\'s level informations.',
        fr: 'Voir les informations sur le niveau des membres.'
      },
      emoji: '852254746155941938'
    }, ]
  }, /*INFO */ {
    name: {
      en: 'Info',
      fr: 'Info'
    },
    icon: "info-circle",
    description: {
      en: "Show informations about server, member or even some role !",
      fr: "Recevez les informations du serveur, d'un membre ou bien même un rôle !"
    },
    emoji: '852254746155941938',
    commandsCat: 'info',
    position: 4,
    underCat: [{
      name: {
        en: 'Guild',
        fr: 'Serveur'
      },
      description: {
        en: 'Show informations about guild components.',
        fr: 'Voir les informations sur les composants d\'un serveur.'
      },
      emoji: '806440886682648597'
    }, {
      name: {
        en: 'Bot',
        fr: 'Robot'
      },
      description: {
        en: 'Show informations about the bot.',
        fr: 'Voir les informations sur le robot.'
      },
      emoji: '806440887332372482'
    }]
  }, /*ECONOMY*/ {
    name: {
      en: 'Economy',
      fr: 'Economie'
    },
    icon: "money-check-alt",
    description: {
      en: "A very simple & easy-to-use virtual money system with a lot of commands (always on dev...), and a credits system !",
      fr: "Un système d'argent virtuel très simple & facile d'utilisation avec une multitude de commandes (en développement), ainsi qu'un système de crédits !"
    },
    emoji: '836629693608230912',
    commandsCat: 'economy',
    position: 5,
    underCat: [{
      name: {
        en: 'Admin',
        fr: 'Admin'
      },
      description: {
        en: 'Configure economy system in your server, by creating custom items for example',
        fr: 'Configurer le système économique de votre serveur, en créant des objets personnalisés par exemple'
      },
      emoji: '852246257560453122'
    }, {
      name: {
        en: 'Items',
        fr: 'Objets'
      },
      description: {
        en: 'Buy and sell items from server\'s shop !',
        fr: 'Achetez et vendez des objets de la boutique du serveur'
      },
      emoji: '830692404088537138'
    }, {
      name: {
        en: 'Receive',
        fr: 'Recevoir'
      },
      description: {
        en: 'Here\'s differents ways using commands to get virtual server\'s money.',
        fr: 'Voici les différents moyens utilisant des commandes pour gagner de l\'argent du serveur'
      },
      emoji: '852423090831228958'
    }, {
      name: {
        en: 'Manage',
        fr: 'Gérer'
      },
      description: {
        en: 'Manage your money by depositing to uour bank, withdrawing and transfering to other members !',
        fr: 'Gérer votre argent en le déposant à votre banque, en retirant et transférez-en à d\'autres membres !'
      },
      emoji: '852246257543020685'
    }]
  }, /*GIVEAWAYS*/ {
    name: {
      en: 'Giveaway',
      fr: 'Cadeaux'
    },
    icon: "gifts",
    description: {
      en: "Give some gifts to your members by using this giveaway system that create, reroll and manage your giveaways !",
      fr: "Donnez des cadeaux à vos membres à l'aide de ce système qui permet de créer, relancer et gérer !"
    },
    emoji: '770980801411678229',
    commandsCat: 'giveaway',
    position: 6,
    underCat: [{
      name: {
        en: 'Manage',
        fr: 'Gérer'
      },
      description: {
        en: 'Manage your giveaways with these commands.',
        fr: 'Gérer vos cadeaux avec ces commandes.'
      },
      emoji: '806440887365795870'
    }, {
      name: {
        en: 'Info',
        fr: 'Info'
      },
      description: {
        en: 'Show informations about giveaways in the server.',
        fr: 'Voir les informations sur les cadeaux présents sur le serveur.'
      },
      emoji: '852254746155941938'
    }]
  }, /*UTIL*/ {
    name: {
      en: 'Util',
      fr: 'Divers'
    },
    icon: "plus",
    description: {
      en: "All not categorised commands",
      fr: "Toutes les commandes sans catégories spéciales"
    },
    emoji: '852246257366990878',
    commandsCat: 'util',
    position: 7,
    underCat: [{
      name: {
        en: '',
        fr: ''
      },
      description: {
        en: 'Admin',
        fr: 'Admin'
      },
      emoji: ''
    }]
  }, /*COUNTERS */ {
    name: {
      en: 'Counters',
      fr: 'Compteurs'
    },
    icon: "list-ol",
    description: {
      en: "Create and manage counters channels of members, channels or boosts !",
      fr: "Créer et modifier des salons-compteurs de membres, salons ou bien de boosts !"
    },
    emoji: '772418424889409566',
    commandsCat: 'counters',
    position: 8,
    underCat: [{
      name: {
        en: 'Manage',
        fr: 'Gérer'
      },
      description: {
        en: 'Manage your customs counters channels',
        fr: 'Gérer vos salons de compteurs personnalisés'
      },
      emoji: '806440887365795870'
    }]
  }, /*BACKUPS */ {
    name: {
      en: 'Backups',
      fr: 'Sauvegardes'
    },
    icon: "server",
    description: {
      en: "Create backups from your server to load it in other servers !",
      fr: "Créez des sauvegardes de votre serveur pour les charger dans d'autres serveurs !"
    },
    emoji: '852867180072140830',
    commandsCat: 'backups',
    position: 9,
    underCat: [
      /*{
          name: {
            en: '',
            fr: ''
          },
          description: {
            en: 'Admin',
            fr: 'Admin'
          },
          emoji: ''
        }*/
    ]
  }
];
const counterArray = [{
  emoji: '806440888590008360',
  position: 2,
  name: {
    en: 'Channels & categories',
    fr: 'Salons & catégories'
  },
  id: 'channels',
  types: [{
    id: 1,
    type: 'all',
    name: {
      en: 'All channels',
      fr: 'Salons'
    }
  }, {
    id: 2,
    type: 'text',
    name: {
      en: 'Text',
      fr: 'Textuels'
    }
  }, {
    id: 3,
    type: 'voice',
    name: {
      en: 'Voice',
      fr: 'Vocaux'
    }
  }, {
    id: 4,
    type: 'announcement',
    name: {
      en: 'Announcements',
      fr: 'Annonces'
    }
  }, {
    id: 5,
    type: 'stage',
    name: {
      en: 'Stage',
      fr: 'Stage'
    }
  }, {
    id: 6,
    type: 'category',
    name: {
      en: 'Categories',
      fr: 'Catégories'
    }
  }]
}, {
  emoji: '806440887332372482',
  position: 1,
  name: {
    en: 'Members counters',
    fr: 'Compteurs de membres'
  },
  id: 'members',
  types: [{
    id: 7,
    type: 'all',
    name: {
      en: 'All members',
      fr: 'Tout les membres'
    }
  }, {
    id: 8,
    type: 'members',
    name: {
      en: 'Members',
      fr: 'Membres'
    }
  }, {
    id: 9,
    type: 'bots',
    name: {
      en: 'Bots',
      fr: 'Bots'
    }
  }]
}, {
  emoji: '853985510967345223',
  position: 3,
  name: {
    en: 'Roles counters',
    fr: 'Compteurs de rôles'
  },
  id: 'roles',
  types: [{
      id: 10,
      type: 'all',
      name: {
        en: 'Roles',
        fr: 'Rôles'
      }
    },
    /*{
       id: 11,
       type: 'role',
       name: {
         en: '{role}',
         fr: '{role}'
       }
     }*/
  ]
}, {
  emoji: '806440885483077662',
  position: 4,
  name: {
    en: 'Emojis counters',
    fr: 'Compteurs d\'emojis'
  },
  id: 'emojis',
  types: [{
    id: 9,
    type: 'all',
    name: {
      en: 'All emojis',
      fr: 'Tout les emojis'
    }
  }, {
    id: 12,
    type: 'normal',
    name: {
      en: 'Normal server emojis',
      fr: 'Emojis normal du serveur'
    }
  }, {
    id: 13,
    type: 'animated',
    name: {
      en: 'Animated server emojis',
      fr: 'Emojis animés du serveur'
    }
  }]
}, {
  emoji: '806440887332372482',
  position: 5,
  name: {
    en: 'Boosts counters',
    fr: 'Compteurs de boosts'
  },
  id: 'boosts',
  types: [{
    id: 14,
    type: 'boosts',
    name: {
      en: 'Boosts',
      fr: 'Boosts'
    }
  }, {
    id: 15,
    type: 'level',
    name: {
      en: 'Boosts level',
      fr: 'Niveau de boosts'
    }
  }]
}];

const channelTypes = ['voice', 'text', 'category'];
const strings = require('../string/en.json');
const languages = ['en', 'fr'];
const getStrings =
  /**
   * 
   * @param {Client} client 
   * @param {String} lang 
   * @returns {typeof strings}
   */
  async function (client, lang) {
    if (!languages.includes(lang)) lang = 'en';
    return client[lang];
  }

const guildModel = {
  _id: Schema.Types.ObjectId,
  guildID: String,
  general: {
    "type": Object,
    "default": {
      language: 'en',
      prefix: '~',
      logs: 'logs',
      premium: false,
      giveawayPrefix: 'g~',
      protectPrefix: 'p~',
      utilPrefix: 'g~',
      ticketPrefix: 't~',
      apparence: 'light'
    }
  },
  moderation: {
    "type": Object,
    "default": {
      case: [],
      muteRole: 'Muted',
      banMsg: '',
    }
  },
  guildAuditLogs: {
    "type": Object,
    "default": {
      channelCreate: false,
      channelDelete: false,
      guildBanAdd: false,
      guildBanRemove: false,
      guildMuteAdd: false,
      guildMuteRemove: false,
      guildCreate: false,
      guildDelete: false,
      guildUpdate: false,
      channelUpdate: false,
      emojiCreate: false,
      emojiDelete: false,
      emojiUpdate: false,
      guildMemberAdd: false,
      guildMemberRemove: false,
      guildMemberUpdate: false,
      inviteCreate: false,
      inviteDelete: false,
      messageDelete: false,
      messageUpdate: false,
      roleCreate: false,
      roleDelete: false,
      roleUpdate: false,
      userUpdate: false,
      voiceStateUpdate: false,
    }
  },
  users: [],
  automod: {
    "type": Object,
    "default": {
      enable: false,
      whiteList: {
        bots: true,
        admin: true,
        whiteRoles: [],
        permissions: [],
        channels: []
      },
      antiLink: {
        enable: false,
        onlyWarn: false,
        onlyDelete: true,
        warnAndDelete: false,
        logsThis: false
      },
      antiInvite: {
        enable: false,
        onlyWarn: false,
        onlyDelete: true,
        warnAndDelete: false,
        logsThis: false
      },
      antiUpperCase: {
        enable: false,
        onlyWarn: false,
        onlyDelete: true,
        warnAndDelete: false,
        logsThis: false
      },
      antiEmojis: {
        enable: false,
        onlyWarn: false,
        onlyDelete: true,
        warnAndDelete: false,
        logsThis: false
      },
      antiSpam: {
        enable: false,
        onlyWarn: false,
        onlyDelete: true,
        warnAndDelete: false,
        logsThis: false
      },
      antiZalgo: {
        enable: false,
        onlyWarn: false,
        onlyDelete: true,
        warnAndDelete: false,
        logsThis: false
      },
      antiMentions: {
        enable: false,
        onlyWarn: false,
        onlyDelete: true,
        warnAndDelete: false,
        logsThis: false
      },
      warnPunishment: {
        enable: false,
        kick: false,
        ban: false,
        mute: false,
        warnLimit: 0,
        logsThis: true
      },
      mutePunishment: {
        enable: false,
        kick: false,
        ban: false,
        muteLimit: 0,
        logsThis: true
      }
    }
  },
  levelSystem: {
    "type": Object,
    "default": {
      enable: false,
      color: '#000099',
      image: '',
      message: {
        type: 'normal',
        msg: 'GG {user}, you reached level **{level}** !'
      },
      channel: '',
      DM: {
        enable: false,
        message: 'GG, you reached level **{level}** in {guild} !'
      },
      boost: 1,
      roles: []
    }
  },
  economy: {
    "type": Object,
    "default": {
      money: '$',
      workMsg1: 'You helped the owner and got {money} !',
      workMsg2: 'You helped the owner and got {money} !',
      shop: [],
    }
  },
  welcomeAndLeave: {
    "type": Object,
    "default": {
      welcome: {
        enable: false,
        channel: '',
        role: '',
        isEmbed: false,
        data: {
          title: '',
          author: {
            name: '',
            iconURL: '',
            url: ''
          },
          url: '',
          description: '',
          timestamp: true,
          footer: {
            name: '',
            iconURL: ''
          },
          color: '',
          thumbnail: '',
          image: ''
        },
        normalMsg: {
          enable: true,
          msg: ''
        },
        DMUser: {
          enable: false,
          msg: ''
        },
      },
      leave: {
        enable: false,
        channel: '',
        isEmbed: false,
        embed: {
          data: {
            title: '',
            author: {
              name: '',
              iconURL: '',
              url: ''
            },
            url: '',
            description: '{userTag} left the guild !',
            timestamp: true,
            footer: {
              name: '',
              iconURL: ''
            },
            color: '#FFFFFF',
            thumbnail: '',
            image: ''
          }
        },
        isNormalMsg: true,
        normalMsg: '',
        DMUser: {
          enable: false,
          msg: ''
        },
      }
    }
  },
  customCommands: [],
  giveaways: [],
  backups: {
    "type": Object,
    "default": {
      onlyServerOwner: true,
      admins: false,
      list: []
    }
  },
  ticket: {
    "type": Object,
    "default": {
      enable: false,
      category: String,
      title: String,
      description: String,
      msg: String,
      number: 0001
    }
  },
  captcha: {
    "type": Object,
    "default": {
      enable: false,
      channel: '',
      role: 'Not Verified',
      channel: 'verification',
      logs: '{logSettings}'
    }
  },
  lockChannels: [],
  reactRoles: {
    "type": Object,
    "default": {
      enable: false,
      list: []
    }
  },
  countChannels: {
    "type": Object,
    "default": {
      enable: false,
      category: '',
      list: []
    }
  }
};

const guildModel2 = {
  _id: Schema.Types.ObjectId,
  guildID: String,
  general: {
    language: 'en',
    prefix: '~',
    logs: 'logs',
    premium: false,
    giveawayPrefix: 'g~',
    protectPrefix: 'p~',
    utilPrefix: 'g~',
    ticketPrefix: 't~',
    apparence: 'light'
  },
  moderation: {
    case: [],
    muteRole: 'Muted',
    banMsg: '',
  },
  guildAuditLogs: {
    channelCreate: false,
    channelDelete: false,
    guildBanAdd: false,
    guildBanRemove: false,
    guildMuteAdd: false,
    guildMuteRemove: false,
    guildCreate: false,
    guildDelete: false,
    guildUpdate: false,
    channelUpdate: false,
    emojiCreate: false,
    emojiDelete: false,
    emojiUpdate: false,
    guildMemberAdd: false,
    guildMemberRemove: false,
    guildMemberUpdate: false,
    inviteCreate: false,
    inviteDelete: false,
    messageDelete: false,
    messageUpdate: false,
    roleCreate: false,
    roleDelete: false,
    roleUpdate: false,
    userUpdate: false,
    voiceStateUpdate: false,
  },
  users: [],
  automod: {
    enable: false,
    whiteList: {
      bots: true,
      admin: true,
      whiteRoles: [],
      permissions: [],
      channels: []
    },
    antiLink: {
      enable: false,
      onlyWarn: false,
      onlyDelete: true,
      warnAndDelete: false,
      logsThis: false
    },
    antiInvite: {
      enable: false,
      onlyWarn: false,
      onlyDelete: true,
      warnAndDelete: false,
      logsThis: false
    },
    antiUpperCase: {
      enable: false,
      onlyWarn: false,
      onlyDelete: true,
      warnAndDelete: false,
      logsThis: false
    },
    antiEmojis: {
      enable: false,
      onlyWarn: false,
      onlyDelete: true,
      warnAndDelete: false,
      logsThis: false
    },
    antiSpam: {
      enable: false,
      onlyWarn: false,
      onlyDelete: true,
      warnAndDelete: false,
      logsThis: false
    },
    antiZalgo: {
      enable: false,
      onlyWarn: false,
      onlyDelete: true,
      warnAndDelete: false,
      logsThis: false
    },
    antiMentions: {
      enable: false,
      onlyWarn: false,
      onlyDelete: true,
      warnAndDelete: false,
      logsThis: false
    },
    warnPunishment: {
      enable: false,
      kick: false,
      ban: false,
      mute: false,
      warnLimit: 0,
      logsThis: true
    },
    mutePunishment: {
      enable: false,
      kick: false,
      ban: false,
      muteLimit: 0,
      logsThis: true
    }
  },
  levelSystem: {
    enable: false,
    color: '#000099',
    image: '',
    message: {
      type: 'normal',
      msg: 'GG {user}, you reached level **{level}** !'
    },
    channel: '',
    DM: {
      enable: false,
      message: 'GG, you reached level **{level}** in {guild} !'
    },
    boost: 1,
    roles: []
  },
  economy: {
    money: '$',
    workMsg1: 'You helped the owner and got {money} !',
    workMsg2: 'You helped the owner and got {money} !',
    shop: [],
  },
  welcomeAndLeave: {
    welcome: {
      enable: false,
      channel: '',
      role: '',
      isEmbed: false,
      data: {
        title: '',
        author: {
          name: '',
          iconURL: '',
          url: ''
        },
        url: '',
        description: '',
        timestamp: true,
        footer: {
          name: '',
          iconURL: ''
        },
        color: '',
        thumbnail: '',
        image: ''
      },
      normalMsg: {
        enable: true,
        msg: ''
      },
      DMUser: {
        enable: false,
        msg: ''
      },
    },
    leave: {
      enable: false,
      channel: '',
      isEmbed: false,
      embed: {
        data: {
          title: '',
          author: {
            name: '',
            iconURL: '',
            url: ''
          },
          url: '',
          description: '{userTag} left the guild !',
          timestamp: true,
          footer: {
            name: '',
            iconURL: ''
          },
          color: '#FFFFFF',
          thumbnail: '',
          image: ''
        }
      },
      isNormalMsg: true,
      normalMsg: '',
      DMUser: {
        enable: false,
        msg: ''
      },
    }
  },
  customCommands: [],
  giveaways: [],
  backups: {
    onlyServerOwner: true,
    admins: false,
    list: []
  },
  ticket: {
    enable: false,
    category: String,
    title: String,
    description: String,
    msg: String,
    number: 0001
  },
  captcha: {
    enable: false,
    channel: '',
    role: 'Not Verified',
    channel: 'verification',
    logs: '{logSettings}'
  },
  lockChannels: [],
  reactRoles: {
    enable: false,
    list: [],
  },
  countChannels: {
    enable: false,
    category: '',
    list: []
  }
};

exports.getStrings = getStrings;
exports.MESSAGES = MESSAGES;
exports.channelTypes = channelTypes;
exports.categories = categories;
exports.counterArray = counterArray;
exports.guildModel = guildModel;
exports.guildModel2 = guildModel2;