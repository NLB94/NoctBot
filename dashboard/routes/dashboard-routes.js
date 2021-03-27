const express = require('express');
const { validateGuild } = require('../modules/middleware');
const log = require('../modules/audit-logger');
const bot = require('../../index').client;
const { Guild } = require('../../models/main');

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild,
  async (req, res) => res.render('dashboard/show', {
    savedGuild: await guilds.get(req.params.id),
    savedLog: await logs.get(req.params.id),
    users: bot.users.cache,
    player: res.locals.player,
    key: res.cookies.get('key')
  }));

router.put('/servers/:id/:module', validateGuild, async (req, res) => {
  try {
    const { id, module } = req.params;

    const savedGuild = await Guild.findOne({ guildID: id });

    await log.change(id, {
      at: new Date(),
      by: res.locals.user.id,
      module,
      new: {...savedGuild[module]},
      old: {...req.body}
    });
    
    savedGuild[module] = req.body;
    await savedGuild.save();

    res.redirect(`/servers/${id}`);
  } catch {
    res.render('errors/400');
  }
});

module.exports = router;