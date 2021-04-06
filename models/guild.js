const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    general: {
        "type": Object,
        "default": {
            language: 'en',
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
            enable: false,
            whiteList: {
                bots: true,
                admin: true,
                whiteRoles: [],
                permissions: []
            },
            antiLink: {
                enable: false,
                onlyWarn: false,
                onlyDelete: false,
                warnAndDelete: false,
                logsThis: false
            },
            antiInvite: {
                enable: false,
                onlyWarn: false,
                onlyDelete: false,
                warnAndDelete: false,
                logsThis: false
            },
            antiUpperCase: {
                enable: false,
                onlyWarn: false,
                onlyDelete: false,
                warnAndDelete: false,
                logsThis: false
            },
            antiEmojis: {
                enable: false,
                onlyWarn: false,
                onlyDelete: false,
                warnAndDelete: false,
                logsThis: false
            },
            antiSpam: {
                enable: false,
                onlyWarn: false,
                onlyDelete: false,
                warnAndDelete: false,
                logsThis: false
            },
            antiZalgo: {
                enable: false,
                onlyWarn: false,
                onlyDelete: false,
                warnAndDelete: false,
                logsThis: false
            },
            antiMentions: {
                enable: false,
                onlyWarn: false,
                onlyDelete: false,
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
            workMsg3: 'You helped the owner and got {money} !',
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
});

module.exports = mongoose.model("Guild", guildSchema);