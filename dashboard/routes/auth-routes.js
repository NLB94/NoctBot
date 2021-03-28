const config = process.env;
const express = require('express');
const authClient = require('../modules/auth-client');
const sessions = require('../modules/sessions');

const router = express.Router();

router.get('/invite', (req, res) =>
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=${config.DASHBOARD_URL}/auth-guild&response_type=code&scope=bot`));

router.get('/login', (req, res) =>
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&redirect_uri=${config.DASHBOARD_URL}/auth&response_type=code&scope=identify guilds&prompt=none`));

router.get('/auth-guild', async (req, res) => {
  try {
    const key = await res.cookie('key').req.query.code;
    console.log(req.query.code)
    await console.log(key);
    if (key) await sessions.update(key);
  } catch (err) {
    console.log(err);
  } finally {
    res.redirect('/dashboard');
  }
});

router.get('/auth', async (req, res) => {
  try {
    const code = req.query.code;
    const key = await authClient.getAccess(code);

    res.cookie('key').set(key);
    res.redirect('/dashboard');
  } catch {
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
  res.cookies.set('key', '');

  res.redirect('/');
});

module.exports = router;