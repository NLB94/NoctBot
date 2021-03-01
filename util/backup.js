const mongoose = require('mongoose');
const {
  Guild,
  Backup
} = require("../models/main");
const functions = require('./backup');
const func = require('./functions')

module.exports = func.client = client => {
  client.createBackup = functions.createBackup = async backup => {
    const merged = Object.assign({
      _id: mongoose.Types.ObjectId()
    }, backup);
    const createBackup = await new Backup(merged);
    createBackup.save().then();
  }
  client.newBackup = functions.newBackup = async backup => {
    Guild.updateOne({
      guildID: `${backup.guildID}`
    }, {
      $push: {
        backups: {
          backupID: backup.id
        }
      }
    }).then();
    Backup.updateOne({
      backupID: backup.id
    }, {
      guildInfo: {
        name: backup.guildInfo.name,
        region: backup.guildInfo.region,
        afk: backup.guildInfo.afk,
        banner: backup.guildInfo.banner,
        explicitContentFilter: backup.guildInfo.explicitContentFilter,
        mfaLevel: backup.guildInfo.mfaLevel,
        verificationLevel: backup.guildInfo.verificationLevel
      }
    })
    backup.roles.forEach(role => {
      Backup.updateOne({
        backupID: backup.id
      }, {
        $push: {
          roles: {
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            mentionable: role.mentionable,
            permissions: role.permissions
          },
        }
      }).then()
    })
    backup.emojis.forEach(emoji => {
      Backup.updateOne({
        backupID: backup.id
      }, {
        $push: {
          emojis: {
            name: emoji.name,
            url: emoji.url
          },
        }
      }).then()
    })
    backup.others.text.forEach(c => {
      Backup.updateOne({
        backupID: backup.id
      }, {
        $push: {
          "others.text": {
            name: c.name,
            nsfw: c.nsfw,
            topic: c.topic,
            rateLimitPerUser: c.rateLimitPerUser,
            permissions: c.permissions
          },
        }
      }).then()
    })
    backup.others.voice.forEach(c => {
      Backup.updateOne({
        backupID: backup.id
      }, {
        $push: {
          "others.voice": {
            name: c.name,
            userLimit: c.userLimit,
            bitrate: c.bitrate,
            permissions: c.permissions
          },
        }
      }).then()
    })
    backup.categorys.forEach(channel => {
      Backup.updateOne({
        backupID: backup.id
      }, {
        $push: {
          categorys: {
            name: channel.name,
            textChannels: channel.textChannels,
            voiceChannels: channel.voiceChannels,
            permissions: channel.permissions
          },
        }
      }).then()
    });
  }
  client.getBackup = functions.getBackup = async code => {
    if (!code) return;
    const data = await Backup.findOne({
      backupID: code
    });
    if (data) return data;
    return null
  }
  client.deleteBackup = functions.deleteBackup = async (code) => {
    if (!code) return;
    Backup.deleteOne({
      backupID: code
    }).then(() => {

    }).catch((err) => {

    });
  }
  client.fetchCategorys = functions.fetchCategorys = async guild => {
    const categorys = [];
    guild.channels.cache.sort((a, b) => (a.position > b.position) ? 1 : -1).forEach(c => {
      if (c.type !== 'category') return;
      var permissions = [];
      c.permissionOverwrites.filter(p => p.type === 'role').forEach(perm => {
        var role = guild.roles.cache.get(perm.id);
        permissions.push({
          roleName: role.name,
          allow: perm.allow.bitfield,
          deny: perm.deny.bitfield
        });
      });
      const textChildren = []
      const voiceChildren = []
      const tPerm = []
      const vPerm = []
      c.children.sort((a, b) => (a.position > b.position) ? 1 : -1).forEach(a => {
        if (a.type == 'text' || a.type == 'news') {
          a.permissionOverwrites.filter(p => p.type === 'role').forEach(perm => {
            var role = guild.roles.cache.get(perm.id);
            tPerm.push({
              roleName: role.name,
              allow: perm.allow.bitfield,
              deny: perm.deny.bitfield
            });
          });
          textChildren.push({
            name: a.name,
            permissions: a.permissionsLocked ? true : tPerm,
            topic: a.topic,
            nsfw: a.nsfw,
            rateLimitPerUser: a.rateLimitPerUser
          })
        }
        if (a.type == 'voice') {
          a.permissionOverwrites.filter(p => p.type === 'role').forEach(perm => {
            var role = guild.roles.cache.get(perm.id);
            vPerm.push({
              roleName: role.name,
              allow: perm.allow.bitfield,
              deny: perm.deny.bitfield
            });
          });
          voiceChildren.push({
            name: a.name,
            permissions: a.permissionsLocked ? true : vPerm,
            userLimit: a.userLimit,
            bitrate: a.bitrate
          })
        }
      })
      categorys.push({
        name: c.name,
        permissions: permissions,
        textChannels: textChildren,
        voiceChannels: voiceChildren
      })
    });
    return categorys
  }
  client.fetchRoles = functions.fetchRoles = async guild => {
    const roles = []
    guild.roles.cache.sort((a, b) => (a.position < b.position) ? 1 : -1).forEach(role => {
      if (role.id == guild.id) return;
      const list = {
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        mentionable: role.mentionable,
        permissions: role.permissions.bitfield
      }
      roles.push(list)
    })
    return roles;
  }
  client.fetchEmojis = functions.fetchEmojis = async guild => {
    const emojis = []
    guild.emojis.cache.forEach(e => {
      const list = {
        name: e.name,
        url: e.url
      }
      emojis.push(list)
    })
    return emojis;
  }
  client.fetchTextChannels = functions.fetchTextChannels = async guild => {
    const channels = []
    guild.channels.cache.sort((a, b) => (a.position > b.position) ? 1 : -1).forEach(c => {
      if (c.parent) return;
      if (c.type == 'text' || c.type == 'news') {
        var permissions = [];
        c.permissionOverwrites.filter(p => p.type === 'role').forEach(perm => {
          var role = guild.roles.cache.get(perm.id);
          permissions.push({
            roleName: role.name,
            allow: perm.allow.bitfield,
            deny: perm.deny.bitfield
          });
        });
        channels.push({
          name: c.name,
          nsfw: c.nsfw,
          topic: c.topic,
          rateLimitPerUser: c.rateLimitPerUser,
          permissions: permissions
        })
      }
    })
    return channels
  };
  client.fetchVoiceChannels = functions.fetchVoiceChannels = async guild => {
    const channels = []
    guild.channels.cache.sort((a, b) => (a.position > b.position) ? 1 : -1).forEach(c => {
      if (c.parent) return;
      if (c.type == 'voice') {
        var permissions = [];
        c.permissionOverwrites.filter(p => p.type === 'role').forEach(perm => {
          var role = guild.roles.cache.get(perm.id);
          permissions.push({
            roleName: role.name,
            allow: perm.allow.bitfield,
            deny: perm.deny.bitfield
          });
        })
        channels.push({
          name: c.name,
          userLimit: c.userLimit,
          bitrate: c.bitrate,
          permissions: permissions
        })
      }
    })
    return channels;
  };
  //load
  client.clearGuild = functions.clearGuild = async guild => {
    await guild.setName('Loading...');
    guild.setIcon(null);
    guild.setAFKChannel(null);
    guild.setAFKTimeout(null);
    guild.setBanner(null);
    guild.setExplicitContentFilter("DISABLED")
    guild.setRegion(null);
    guild.setVerificationLevel("NONE");

    await guild.channels.cache.forEach(c => {
      if (!guild.channels.resolve(c.id).deletable) return;
      c.delete();
    })
    await guild.roles.cache.forEach(r => {
      if (!guild.roles.resolve(r.id).editable || r.id == guild.id) return;
      r.delete();
    });
  };
  client.loadEmojis = functions.loadEmojis = async (guild, backup) => {
    await backup.emojis.forEach(e => {
      guild.emojis.create(e.url, e.name)
    });
  }
  client.loadRoles = functions.loadRoles = async (guild, backup) => {
    await backup.roles.forEach(r => {
      guild.roles.create().then(role => {
        role.edit({
          name: r.name,
          color: r.color,
          hoist: r.hoist,
          mentionable: r.mentionable,
          permissions: r.permissions
        })
      })
    })
  };
  client.loadCategorys = functions.loadCategorys = async (guild, backup) => {
    await backup.categorys.forEach(c => {
      const finalPermsCat = []
      c.permissions.forEach(r => {
        const role = guild.roles.cache.find(a => a.name == r.roleName)
        if (!role) return;
        finalPermsCat.push({
          type: 'role',
          id: role.id,
          allow: r.allow,
          deny: r.deny
        })
      });
      guild.channels.create(c.name, {
        type: 'category'
      }).then(cat => {
        cat.overwritePermissions(finalPermsCat)
        c.textChannels !== null ? c.textChannels.forEach(t => {
          const finalPermsText = []
          t.permissions == true ? '' : t.permissions.forEach(r => {
            const role = guild.roles.cache.find(b => b.name == r.roleName)
            if (!role) return;
            finalPermsText.push({
              type: 'role',
              id: role.id,
              allow: r.allow,
              deny: r.deny
            })
          });
          guild.channels.create(t.name, {
            type: 'text',
            parent: cat,
            nsfw: t.nsfw,
            rateLimitPerUser: t.rateLimitPerUser,
            topic: t.topic
          })
        }) : '';
        c.voiceChannels !== null ? c.voiceChannels.forEach(v => {
          const finalPermsVoice = []
          v.permissions == true ? '' : v.permissions.forEach(r => {
            const role = guild.roles.cache.find(b => b.name == r.roleName)
            if (!role) return;
            finalPermsVoice.push({
              type: 'role',
              id: role.id,
              allow: r.allow,
              deny: r.deny
            })
          });
          guild.channels.create(v.name, {
            type: 'voice',
            parent: cat,
            userLimit: v.userLimit,
            bitrate: v.bitrate,
            permissionOverwrites: v.permissions == true ? finalPermsCat : finalPermsVoice
          })
        }) : '';
      })
    })
  };
  client.loadOthersChannels = functions.loadOthersChannels = async (guild, backup) => {
    await backup.others.text.forEach(t => {
      const finalPermsText = []
      t.permissions.forEach(r => {
        const role = guild.roles.cache.find(b => b.name == r.roleName)
        if (!role) return;
        finalPermsText.push({
          id: role.id,
          allow: r.allow,
          deny: r.deny
        })
      });
      guild.channels.create(t.name, {
        type: 'text',
        topic: t.topic,
        nsfw: t.nsfw,
        rateLimitPerUser: v.rateLimitPerUser,
        permissionOverwrites: finalPermsText
      })
    })
    await backup.others.voice.forEach(v => {
      const finalPermsVoice = []
      v.permissions.forEach(r => {
        const role = guild.roles.cache.find(b => b.name == r.roleName)
        if (!role) return;
        finalPermsVoice.push({
          id: role.id,
          allow: r.allow,
          deny: r.deny
        })
      });
      guild.channels.create(v.name, {
        type: 'voice',
        userLimit: v.userLimit,
        bitrate: v.bitrate,
        permissionOverwrites: finalPermsVoice
      })
    })
  };
};