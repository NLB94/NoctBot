const {
    Client
} = require('discord.js');
const fetch = require('node-fetch')
const functions = require('./brawlstars');
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijg5NDQ2MGNiLTk3YzctNDM3Yi1iOWE0LWJiMWQ4ODk0NmI0ZCIsImlhdCI6MTYxODEyMDYwNywic3ViIjoiZGV2ZWxvcGVyL2ZkOGUwNWRiLTAzZGQtOTZjMC0xNTk2LTYyZGM1ZTY5MGExMCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTIuOTAuMTE1LjIwIl0sInR5cGUiOiJjbGllbnQifV19.QDvhjm31bv9-TKbWTzRwFVEDN0FaMeMRswc5tMQvkMGoOqPkxhizL5Vk3hb_6Yfwy9VZs0ufYjnsquglCji7rg'
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    client.fetchBrawlURL = functions.fetchBrawlURL = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) return false;
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    client.getBrawlPlayer = functions.getBrawlPlayer = async function (tag, v) {
        let newTag = await tag.replace('#', '');
        if (newTag.startsWith('%23') || newTag.startsWith('#')) newTag = newTag.startsWith('%') ? newTag.slice(3) : newTag.slice(1);
        tag = newTag;
        const player = await client.fetchBrawlURL(`https://api.brawlstars.com/${v}/players/%23${newTag}`);
        if (!player) return false;
        else return player;
    }
    client.getBrawlBrawlers = functions.getBrawlBrawlers = async function (v) {
        if (v == '') v = 'v1';
        const brawlers = await client.fetchBrawlURL(`https://api.brawlstars.com/${v}/brawlers`);
        return brawlers;
    }
}
// client.brawlStars.fetchURL('https://api.brawlstars.com/v1/players/%23CVJCVPG0')