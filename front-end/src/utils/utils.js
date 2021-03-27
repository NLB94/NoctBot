const functions = require('./utils')

const getMutualGuilds = functions.getMutualGuilds = async (userGuilds, botGuilds) => {
    const mutualGuilds = []
    for(let i = 0; i < botGuilds.length; i++){
        const guild = userGuilds.map(g => g.id).indexOf(botGuilds[i].id)
        if(guild !== -1){
          mutualGuilds.push(userGuilds[guild])
        }
      }
    return await mutualGuilds;
}

module.exports = { getMutualGuilds }