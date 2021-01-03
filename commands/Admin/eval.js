const { Channel } = require("discord.js");
const { ownerID } = require("../../config");
const { MESSAGES } = require("../../util/constants");
 
 
module.exports.run = async (client, message, args) => {
  message.delete();
  function clean(text) {
    if (typeof text === "string") 
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
  const nlb = client.users.cache.get(ownerID);
  const code = args.join(" ");
  const evaled = eval(code);
  const cleanCode = await clean(evaled);
  if (code.startsWith("client.token")) {
  nlb.send(cleanCode, { code: "js" });
  }
  else message.channel.send(cleanCode, { code: "js" });
};
 
module.exports.help = MESSAGES.COMMANDS.ADMIN.EVAL;