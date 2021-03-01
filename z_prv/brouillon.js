// get all bot servers invite : 
var serverArray = client.guilds.cache.array();
for(i = 0; i < serverArray.length; i++) {

    const guild = serverArray[i];
    guild.fetchInvites().then(invites => {
        if (invites.size < 1) guild.channels.cache.random().createInvite();
        invites.random(invite => {
           message.channel.send("Invite link: " + invite.url);
        });
    });

}

message.guild.fetchInvites().then(guildInvites => {
    const ei = invites[message.guild.id];
    invites[message.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
   const inviter = client.users.get(invite.inviter.id);
    message.channel.send(`${message.author}, invité par ${inviter.tag}. Invite was used ${invite.uses} times`);
  });