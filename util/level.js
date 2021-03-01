const functions = require('./level');
const func = require('./functions')

module.exports = func.client = client => {
    client.levelUp = functions.levelUp = async (guild, member, userInfo) => {
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
    client.replaceLevelText = functions.replaceLevelText = async (text, message, options) => {
        let text2 = text;
        text2 = await text2.replace("{user}", message.member)
            .replace("{level}", options.newLvl)
            .replace("{guild}", message.guild.name)
            .replace("{userID}", message.author.id)
            .replace("{username}", message.author.username)
            .replace("{guildID}", message.guild.id);

        return await text2;
    };
    client.replaceLevelImage = functions.replaceLevelImage = async (text, message) => {
        let image = text
            .replace("guildIcon", message.guild.iconURL().toString())
            .replace("userIcon", message.author.avatarURL());

        return image;
    }
    client.replaceLevelEmbed = functions.replaceLevelEmbed = async (embed, message, options) => {
        const newLvl = {
            newLvl: options.newLvl
        };
        embed.setDescription(client.replaceLevelText(embed.description, message, newLvl))
        embed.setTitle(client.replaceLevelText(embed.title, message, newLvl))
        embed.setFooter(client.replaceLevelText(embed.footer.text, message, newLvl), client.replaceLevelImage(embed.footer.iconURL, message))
        embed.setAuthor(client.replaceLevelText(embed.author.name, message, newLvl), client.replaceLevelImage(embed.author.iconURL))
        embed.setThumbnail(client.replaceLevelImage(embed.thumbnail, message))
        embed.setImage(client.replaceLevelImage(embed.image, message))

        return embed;
    }
}