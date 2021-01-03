module.exports = {
    name: 'remrole',
    description: 'Retire un role à des users!',
    execute(client, message, args) {
          let role = message.guild.roles.cache.find(r => r.name === args.toString());
          if (role) {
              if (!message.member.roles.cache.has(role.id)) return message.channel.send("You don't have this role!");


              message.member.roles.remove(role)
              .then(m => message.channel.send(`Successfully removed ${role}!`))
              .catch(e => console.log(e));
          } else {
              message.channel.send("Role doesn't exists! Retry");
          }
    }
}