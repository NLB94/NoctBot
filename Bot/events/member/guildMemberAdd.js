const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    const user = await client.getGuildUser(member.guild, member);
    if (user == undefined) await client.createGuildUser(member.guild, member);
    const settings = await client.getGuild(member.guild);

    if (settings == undefined) await client.createGuild(message.guild);

    const wL = settings.welcomeAndLeave.welcome;
    const captcha = settings.captcha;

    if (!wL.enable && !captcha.enable) return console.log('Welcome not enable');
    else if (!wL.enable && captcha.enable) {
        
    }
    else if (wL.enable && !captcha.enable) {
        return console.log('Welcome enable');
        let msg = '';
        if (wL.isNormalMsg) msg = wL.normalMsg;
        else if (wL.isEmbed) msg = new MessageEmbed()
            .setColor(wL.embed.color)

        wL.embed.timeStamp ? msg.setTimestamp() : '';

        if (wL.isEmbed) {
            let footer = wL.embed.footer;
            if (footer.includes("{user}" || "{member}")) footer = footer.replace("{user}" || "{member}", member)
            if (footer.includes("{server}" || "{guild}")) footer = footer.replace("{server}" || "{guild}", member.guild)
            if (footer.includes("{userID}" || '{memberID}')) footer = footer.replace("{userID}" || '{memberID}', member.id)
            if (footer.includes("{serverID}" || "{guildID}")) footer = footer.replace("{serverID}" || "{guildID}", member.guild.id)
            if (footer.includes("{memberCount}")) footer = footer.replace("{memberCount}", member.guild.memberCount)

            let footerIcon = wL.embed.footerIcon;
            if (footerIcon.includes("{guildIcon}" || "{guildAvatar}" || "{serverIcon}" || "{serverAvatar}")) footerIcon = footerIcon.replace("{guildIcon}" || "{guildAvatar}" || "{serverIcon}" || "{serverAvatar}", member.guild.iconURL);
            if (footerIcon.includes("{memberAvatar}" || "{memberIcon}" || "{userAvatar}" || "{userIcon}")) footerIcon = footerIcon.replace("{memberAvatar}" || "{memberIcon}" || "{userAvatar}" || "{userIcon}", member.user.avatarURL())
            footer == undefined ? '' : msg.setFooter(footer, footerIcon == undefined ? null : footerIcon)

            let description = wL.embed.description;

            if (description.includes("{user}" || "{member}")) description = description.replace("{user}" || "{member}", member)
            if (description.includes("{server}" || "{guild}")) description = description.replace("{server}" || "{guild}", member.guild)
            if (description.includes("{userID}" || '{memberID}')) description = description.replace("{userID}" || '{memberID}', member.id)
            if (description.includes("{serverID}" || "{guildID}")) description = description.replace("{serverID}" || "{guildID}", member.guild.id)
            if (description.includes("{memberCount}")) description = description.replace("{memberCount}", member.guild.memberCount)

            description == undefined ? '' : msg.setDescription(description)

            let title = wL.embed.title;

            if (title.includes("{user}" || "{member}")) title = title.replace("{user}" || "{member}", member)
            if (title.includes("{server}" || "{guild}")) title = title.replace("{server}" || "{guild}", member.guild)
            if (title.includes("{userID}" || '{memberID}')) title = title.replace("{userID}" || '{memberID}', member.id)
            if (title.includes("{serverID}" || "{guildID}")) title = title.replace("{serverID}" || "{guildID}", member.guild.id)
            if (title.includes("{memberCount}")) title = title.replace("{memberCount}", member.guild.memberCount)

            title == undefined ? '' : msg.setTitle(title)

            let author = wL.embed.author;

            if (author.includes("{user}" || "{member}")) author = author.replace("{user}" || "{member}", member.toString())
            if (author.includes("{server}" || "{guild}")) author = author.replace("{server}" || "{guild}", member.guild)
            if (author.includes("{userID}" || '{memberID}')) author = author.replace("{userID}" || '{memberID}', member.id)
            if (author.includes("{serverID}" || "{guildID}")) author = author.replace("{serverID}" || "{guildID}", member.guild.id)
            if (author.includes("{memberCount}")) author = author.replace("{memberCount}", member.guild.memberCount)

            let authorIcon = wL.embed.authorIcon;

            if (authorIcon.includes("{guildIcon}" || "{guildAvatar}" || "{serverIcon}" || "{serverAvatar}")) authorIcon = authorIcon.replace("{guildIcon}" || "{guildAvatar}" || "{serverIcon}" || "{serverAvatar}", member.guild.iconURL);
            if (authorIcon.includes("{memberAvatar}" || "{memberIcon}" || "{userAvatar}" || "{userIcon}")) authorIcon = authorIcon.replace("{memberAvatar}" || "{memberIcon}" || "{userAvatar}" || "{userIcon}", member.user.avatarURL())


            author == undefined ? '' : msg.setAuthor(author, authorIcon == undefined ? null : authorIcon, wL.embed.authorURL == undefined ? null : wL.embed.authorURL)

            let titleURL = wL.embed.titleURL;

            titleURL == undefined ? '' : msg.setURL(titleURL)

            let thumbnail = wL.embed.thumbnail;

            if (thumbnail.includes("{guildIcon}" || "{guildAvatar}" || "{serverIcon}" || "{serverAvatar}")) thumbnail = thumbnail.replace("{guildIcon}" || "{guildAvatar}" || "{serverIcon}" || "{serverAvatar}", member.guild.iconURL);
            if (thumbnail.includes("{memberAvatar}" || "{memberIcon}" || "{userAvatar}" || "{userIcon}")) thumbnail = thumbnail.replace("{memberAvatar}" || "{memberIcon}" || "{userAvatar}" || "{userIcon}", member.user.avatarURL())

            thumbnail == undefined ? '' : msg.setThumbnail(thumbnail);

            let image = wL.embed.image;

            if (image.includes("{guildIcon}" || "{guildAvatar}" || "{serverIcon}" || "{serverAvatar}")) image = image.replace("{guildIcon}" || "{guildAvatar}" || "{serverIcon}" || "{serverAvatar}", member.guild.iconURL);
            if (image.includes("{memberAvatar}" || "{memberIcon}" || "{userAvatar}" || "{userIcon}")) image = image.replace("{memberAvatar}" || "{memberIcon}" || "{userAvatar}" || "{userIcon}", member.user.avatarURL())

            image == undefined ? '' : msg.setImage(image);

            member.guild.channels.cache.get(wL.channel).send(msg);
        }
        else if (wL.embed.isNormalMsg) {
            if (msg.includes("{user}" || "{member}")) msg = msg.replace("{user}" || "{member}", member)
            if (msg.includes("{server}" || "{guild}")) msg = msg.replace("{server}" || "{guild}", member.guild)
            if (msg.includes("{userID}" || '{memberID}')) msg = msg.replace("{userID}" || '{memberID}', member.id)
            if (msg.includes("{serverID}" || "{guildID}")) msg = msg.replace("{serverID}" || "{guildID}", member.guild.id)
            if (msg.includes("{memberCount}")) msg = msg.replace("{memberCount}", member.guild.memberCount)

            member.guild.channels.cache.get(wL.channel).send(msg);
        }
        const role = member.guild.roles.cache.get(wL.role)
        role == undefined ? '' : member.roles.add(role)
    }




    // if (captcha.enable) {
    //     if (captcha.cChannel == undefined) continue;
    //     if (captcha.cRole == 'Not Verified') {
    //         const role = member.guild.roles.cache.find(r => r.name.toLowerCase() == 'not verified');
    //         if (!role) {
    //             role = await message.guild.roles.create({
    //                 data: {
    //                     name: 'Not Verified',
    //                     color: 'grey',
    //                     permissions: []
    //                 }
    //             });

    //             message.guild.channels.cache.forEach(async (channel, id) => {
    //                 if (channel.id == captcha.cChannel) return;
    //                 await channel.updateOverwrite(role, {
    //                     VIEW_CHANNEL: false,
    //                     SEND_MESSAGES: false,
    //                     CONNECT: false
    //                 });
    //             })
    //             const roleID = message.guild.roles.cache.find(r => r.name.toLowerCase() == 'not verified').id;
    //             client.updateGuild(message.guild, {
    //                 "captcha.cRole": roleID
    //             })
    //         };
    //     }
    //     else {
    //         let role = member.guild.roles.cache.get(captcha.cRole);
    //         if (role == undefined) role = member.guild.roles.cache.find(r => r.name.toLowerCase());
    //         if (!role) {
    //             role = await message.guild.roles.create({
    //                 data: {
    //                     name: 'Not Verified',
    //                     color: 'grey',
    //                     permissions: []
    //                 }
    //             });

    //             message.guild.channels.cache.forEach(async (channel, id) => {
    //                 if (channel.id == captcha.cChannel) return;
    //                 await channel.updateOverwrite(role, {
    //                     VIEW_CHANNEL: false,
    //                     SEND_MESSAGES: false,
    //                     CONNECT: false
    //                 });
    //             })
    //             const roleID = message.guild.roles.cache.find(r => r.name.toLowerCase() == 'not verified').id;
    //             client.updateGuild(message.guild, {
    //                 "captcha.cRole": roleID
    //             })
    //         };
    //     }
    // }

}