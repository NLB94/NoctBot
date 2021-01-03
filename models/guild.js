const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    general: {
        "type": Object,
        "default": {
            prefix: '~',
            logs: 'logs',
            premium: false
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
            whiteList: {
                bots: true,
                admin: true,
                whiteRoles: {
                    role1: '',
                    role2: '',
                    role3: '',
                    role4: '',
                    role5: '',
                    role6: '',
                    role7: '',
                    role8: '',
                    role9: '',
                    role10: ''
                }
            },
            antiLink: {
                "type": Object,
                "default": {
                    enable: false,
                    onlyWarn: false,
                    onlyDelete: false,
                    warnAndDelete: false,
                    logsThis: false
                }
            },
            antiInvite: {
                "type": Object,
                "default": {
                    enable: false,
                    onlyWarn: false,
                    onlyDelete: false,
                    warnAndDelete: false,
                    logsThis: false
                }
            },
            antiUpperCase: {
                "type": Object,
                "default": {
                    enable: false,
                    onlyWarn: false,
                    onlyDelete: false,
                    warnAndDelete: false,
                    logsThis: false
                }
            },
            antiEmojis: {
                "type": Object,
                "default": {
                    enable: false,
                    onlyWarn: false,
                    onlyDelete: false,
                    warnAndDelete: false,
                    logsThis: false
                }
            },
            antiSpam: {
                "type": Object,
                "default": {
                    enable: false,
                    onlyWarn: false,
                    onlyDelete: false,
                    warnAndDelete: false,
                    logsThis: false
                }
            },
            antiZalgo: {
                "type": Object,
                "default": {
                    enable: false,
                    onlyWarn: false,
                    onlyDelete: false,
                    warnAndDelete: false,
                    logsThis: false
                }
            },
            antiMentions: {
                "type": Object,
                "default": {
                    enable: false,
                    onlyWarn: false,
                    onlyDelete: false,
                    warnAndDelete: false,
                    logsThis: false
                }
            },
            warnPunishment: {
                "type": Object,
                "default": {
                    enable: false,
                    kick: false,
                    ban: false,
                    mute: false,
                    warnLimit: 0,
                    logsThis: true
                }
            },
            mutePunishment: {
                "type": Object,
                "default": {
                    enable: false,
                    kick: false,
                    ban: false,
                    muteLimit: 0,
                    logsThis: true
                }
            }
        }
    },
    levelSystem: {
        "type": Object,
        "default": {
            levelEnable: false,
            levelJaugeColor: '#66CCFF',
            levelFontImage: '',
            levelMessage: '',
            levelChannel: '',
            DMUser: false,
            dmMessage: '',
            levelBoost: 1
        }
    },
    economy: {
        "type": Object,
        "default": {
            money: '$',
            workMsg1: 'You helped the owner and got {money} !',
            workMsg2: 'You helped the owner and got {money} !',
            workMsg3: 'You helped the owner and got {money} !',
            robTrue: 'You robed {money} from {user}!',
            robFalse: 'You have caught and fined {money} !',
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
                embed: {
                    title: 'New Member',
                    titleURL: '',
                    author: '',
                    authorIcon: '',
                    authorURL: '',
                    description: 'Welcome {user} in {guild} !',
                    timeStamp: true,
                    footer: '{guild}',
                    footerIcon: '{guildIcon}',
                    color: '#FFFFFF',
                    thumbnail: '',
                    image: ''
                },
                isNormalMsg: true,
                normalMsg: '',
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
                    title: 'Member Leave',
                    titleURL: '',
                    author: '',
                    authorIcon: '',
                    authorURL: '',
                    description: '{user} left {guild} !',
                    timeStamp: true,
                    footer: '{guild}',
                    footerIcon: '{guildIcon}',
                    color: '#FFFFFF',
                    thumbnail: '',
                    image: ''
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
    customCommands: {
        "type": Object,
        "default": {
            Nb: 0,
            list: []
        }
    },
    giveaways: {
        "type": Object,
        "default": {
            emoji: '🎉',
            list: []
        }
    },
    backups: {
        "type": Object,
        "default": {
            Nb: 0,
            maxMessages: 0,
            bans: false,
            roles: true,
            channels: true,
            list: []
        }
    },
    ticket: {
        "type": Object,
        "default": {
            tEnable: false,
            tCategory: '',
            tTitle: '',
            tDescription: '',
            tNumber: 0001
        }
    },
    captcha: {
        "type": Object,
        "default": {
            cEnable: false,
            cChannel: '',
            cRole: '{wRole}',
            cMinAge: 0,
            cLogs: '{logSettings}'
        }
    },
    lockChannels: []
});

module.exports = mongoose.model("Guild", guildSchema);