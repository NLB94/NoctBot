const functions = require('./level');
const func = require('./functions')

module.exports = func.client = client => {
    client.levelUp = async (guild, member, userInfo) => {
        const oldLvl = userInfo.level;
        const xp = userInfo.XP;
        const xpreq = userInfo.XPRequire;
        const xpToAddReq = userInfo.XPtoAddReq;

        const XPreqUp = xpreq + 250 + xpToAddReq;
        const newLvl = oldLvl + 1;
        const newAddReq = xpToAddReq + 50;
        const newXP = xp - xpreq;

        await client.updateGuildUI(guild, member, {
            "users.$.XP": newXP
        });
        await client.updateGuildUI(guild, member, {
            "users.$.XPRequire": XPreqUp
        });
        await client.updateGuildUI(guild, member, {
            "users.$.level": newLvl
        });
        await client.updateGuildUI(guild, member, {
            "users.$.XPtoAddReq": newAddReq
        });
    }
    client.replaceLevelText = async (text, message, options) => {
        if (!text) return 'test';
        text = text.includes("{user}") ? await text.replace("{user}", message.member) : text;
        text = text.includes("{level}") ? await text.replace("{level}", options.newLvl) : text;
        text = text.includes("{guild}") ? await text.replace("{guild}", message.guild) : text;
        text = text.includes("{userID}") ? await text.replace("{userID}", message.author.id) : text;
        text = text.includes("{username}") ? await text.replace("{username}", message.author.username) : text;
        text = text.includes("{guildID}") ? text.replace("{guildID}", message.guild.id) : text;

        return await text;
    };
    client.replaceLevelImage = functions.replaceLevelImage = async (text, message) => {
        let image = text ? text
            .replace("guildIcon", message.guild.iconURL().toString())
            .replace("userIcon", message.author.avatarURL()) : '';

        return image;
    }
    client.replaceLevelEmbed = functions.replaceLevelEmbed = async (embed, message, options) => {
        const newLvl = {
            newLvl: options !== undefined ? options.newLvl : ''
        };
        embed.setDescription(client.replaceLevelText(embed.description, message, newLvl).toString())
        embed.setTitle(client.replaceLevelText(embed.title, message, newLvl).toString())
        embed.setFooter(client.replaceLevelText(!embed.footer ? '' : embed.footer.text, message, newLvl).toString(), client.replaceLevelImage(embed.footer ? embed.footer.iconURL : '', message).toString())
        embed.setAuthor(client.replaceLevelText(embed.author ? embed.author.name : '', message, newLvl).toString(), client.replaceLevelImage(embed.author ? embed.author.iconURL : '').toString())
        embed.setThumbnail(client.replaceLevelImage(embed.thumbnail, message).toString())
        embed.setImage(client.replaceLevelImage(embed.image, message).toString())

        return embed;
    }
}