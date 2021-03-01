const { Channel } = require("discord.js");
const { MESSAGES } = require("../../util/constants");
const fetch = require('node-fetch'); 
 
const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
  message.delete();
  function clean(text) {
    if (typeof text === "string") 
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
  const nlb = client.users.cache.get(process.env.OWNER_ID);
  const code = args.join(" ");

  if (code.includes('fetch')) {
    const a = await fetch(`https://discord.com/api/v7/users/${args[1]}`, { method: 'GET', headers: { Authorization: `Bot ${client.token.replace(/^Bot\s*/i, '')}` }, }).then(f => f.json())
    console.log(a)
    return;
  }
  const evaled = await eval(code);
  const cleanCode = await clean(evaled);
  if (code.includes("token")) {
  nlb.send(cleanCode, { code: "js" });
  }
  else if (cleanCode) message.channel.send(cleanCode, { code: "js" });
};
 
module.exports.help = MESSAGES.COMMANDS.ADMIN.EVAL;