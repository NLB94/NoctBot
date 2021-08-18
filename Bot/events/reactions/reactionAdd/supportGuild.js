const {
    MessageReaction,
    User
} = require("discord.js");
const { getStrings } = require("../../../../util/constants");
const {
    Client
} = require("../../../../util/functions");

/**
 * 
 * @param {Client} client 
 * @param {MessageReaction} messageReaction 
 * @param {User} user 
 */
module.exports = async (client, messageReaction, user) => {
    const message = messageReaction.message;
    const settings = await client.getGuild(message.guild);
    const language = settings.general.language;
    const strings = await getStrings(client, language);
    const loadingEmoji = client.emojis.resolve(client.localEmojis.loadingEmoji);
    //emoji number
    const emoji1 = client.emojis.resolve(client.localEmojis.emoji1);
    const emoji2 = client.emojis.resolve(client.localEmojis.emoji2);
    const emoji3 = client.emojis.resolve(client.localEmojis.emoji3);
    const emoji4 = client.emojis.resolve(client.localEmojis.emoji4);
    const emoji5 = client.emojis.resolve(client.localEmojis.emoji5);
    const emoji6 = client.emojis.resolve(client.localEmojis.emoji6);
    const emoji7 = client.emojis.resolve(client.localEmojis.emoji7);
    const emoji8 = client.emojis.resolve(client.localEmojis.emoji8);
    const emoji9 = client.emojis.resolve(client.localEmojis.emoji9);

    const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const arrowRight = client.emojis.resolve(client.localEmojis.arrowRight);

    const tada = client.emojis.resolve(client.localEmojis.tada);
    const announcEmoji = client.emojis.resolve(client.localEmojis.warning);
    const eyesEmoji = client.emojis.resolve(client.localEmojis.alert);
    const alertEmoji = client.emojis.resolve(client.localEmojis.alert);

    const verifyRole = message.guild.roles.resolve('770658615752261682');
    if (message.id == '823174979608248381') {
        member.roles.remove(verifyRole.id).then(() => {
            member.send({
                embeds: [{
                    title: 'Verification',
                    description: `${check_mark}${await (strings.reactAdd.supportS.verif.replace("{guild}", message.guild.name))}`
                }]
            })
        }).catch(err => console.log(err))
    }
    if (message.id == '823203954833227806') {
        const givRole = message.guild.roles.resolve('822213564752330792');
        const announRole = message.guild.roles.resolve('822500136176451684');
        const updateRole = message.guild.roles.resolve('822500107973820466');
        const spoilRole = message.guild.roles.resolve('822500061736337428');


        switch (messageReaction.emoji) {
            case tada: {
                member.roles.add(givRole.id).then(() => {
                    member.send({
                        embeds: [{
                            title: strings.reactAdd.supportS.roles.title,
                            description: `${check_mark}${await (strings.reactAdd.supportS.roles.description.replace("{guild}", message.guild.name).replace("{roleName}", givRole.name))}`
                        }]
                    })
                }).catch(() => {})
                break;
            }
            case announcEmoji: {
                member.roles.add(announRole.id).then(() => {
                    member.send({
                        embeds: [{
                            title: strings.reactAdd.supportS.roles.title,
                            description: `${check_mark}${await (strings.reactAdd.supportS.roles.description.replace("{guild}", message.guild.name).replace("{roleName}", announRole.name))}`
                        }]
                    })
                }).catch(() => {})
                break;
            }
            case alertEmoji: {
                member.roles.add(updateRole.id).then(() => {
                    member.send({
                        embeds: [{
                            title: strings.reactAdd.supportS.roles.title,
                            description: `${check_mark}${await (strings.reactAdd.supportS.roles.description.replace("{guild}", message.guild.name).replace("{roleName}", updateRole.name))}`
                        }]
                    })
                }).catch(() => {})
                break;
            }
            case eyesEmoji: {
                member.roles.add(spoilRole.id).then(() => {
                    member.send({
                        embeds: [{
                            title: strings.reactAdd.supportS.roles.title,
                            description: `${check_mark}${await (strings.reactAdd.supportS.roles.description.replace("{guild}", message.guild.name).replace("{roleName}", spoilRole.name))}`
                        }]
                    })
                }).catch(() => {})
                break;
            }
        }
        return;
    }
}