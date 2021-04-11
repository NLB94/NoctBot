const Discord = require('discord.js')

const Render =
    /**
     * Render a template
     * @param {Discord.Client} bot - server bot client
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @param {String} template - template name
     * @param {Object} data - data object
     * @param {Object} title - title data
     * @param {Boolean} [title.extend] - to extend base title
     * @param {String} [title.title] - overwrite base title
     */
    function (bot, req, res, template, data = {}, title = {}) {
        let renderTitle;
        if (title.title && title.extend)
            renderTitle = `${bot.user.username} - ${title.title}`;
        else if (title.title && !title.extend) renderTitle = title.title;
        else renderTitle = bot.user.username;
        const BaseData = {
            status: req.isAuthenticated() ?
                `${req.user.username}#${req.user.discriminator}` : "Login",
            login: req.isAuthenticated() ? "oui" : "non",
            title: renderTitle,
            bot: bot.user,
            user: req.user,
        };
        res.render(__dirname.slice(0, (__dirname.length - 4)) + 'website/views/' + template, Object.assign(BaseData, data));
    };

module.exports = {
    Render
}