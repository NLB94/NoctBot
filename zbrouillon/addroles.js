module.exports = {
    name: 'addroles',
    description: 'Ajoute des roles à des users!',
    execute(client, message, args) {
        args.forEach(rName => {
            let role = message.guild.roles.cache.find(r => r.name === rName.toString());
          if (role) {
              if (message.member.roles.cache.has(role.id)) return message.channel.send("You have already this role!");
              if (role.permissions.has('KICK_MEMBERS')) return message.channel.send("You can't add administrator role!");


              message.member.roles.add(role)
              .then(m => message.channel.send(`Successfully added ${role}!`))
              .catch(e => console.log(e));
          } else {
              message.channel.send("Role doesn't exists! Retry");
          }
        })
          
    }
}