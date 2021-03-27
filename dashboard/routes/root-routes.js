const express = require('express');
const bot = require('../../index').client;
const { User } = require('../../models/main');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get('/commands', (req, res) => res.render('commands', {
  subtitle: 'Commands',
  categories: [
    { name: 'Auto Mod', icon: 'fas fa-gavel' },
    { name: 'Economy', icon: 'fas fa-coins' }, 
    { name: 'General', icon: 'fas fa-star' },
  ],
  commands: Array.from(bot.commands.values()),
  commandsString: JSON.stringify(Array.from(bot.commands.values()))
}));

router.get('/leaderboard/:id', async (req, res) => {
  const guild = bot.guilds.resolve(req.params.id);
  if (!guild)
    return res.render('errors/404');

  const savedUsers = (await User.findOne({ userID: req.params.id }))
    .sort((a, b) => (a.coins < b.coins) ? 1 : -1)
    .slice(0, 100);

  res.render('dashboard/leaderboard', { guild, savedUsers });
});

module.exports = router;
