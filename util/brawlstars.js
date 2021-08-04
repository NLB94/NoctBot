const {
    Client
} = require('./functions');
const fetch = require('node-fetch')
const functions = require('./brawlstars');
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijg5NDQ2MGNiLTk3YzctNDM3Yi1iOWE0LWJiMWQ4ODk0NmI0ZCIsImlhdCI6MTYxODEyMDYwNywic3ViIjoiZGV2ZWxvcGVyL2ZkOGUwNWRiLTAzZGQtOTZjMC0xNTk2LTYyZGM1ZTY5MGExMCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTIuOTAuMTE1LjIwIl0sInR5cGUiOiJjbGllbnQifV19.QDvhjm31bv9-TKbWTzRwFVEDN0FaMeMRswc5tMQvkMGoOqPkxhizL5Vk3hb_6Yfwy9VZs0ufYjnsquglCji7rg'
const v = 'v1';
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    client.fetchBrawlURL = async (url) => {
        try {
            const response = await fetch(`https://api.brawlstars.com/${v}` + url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) return null;
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    client.getBrawlPlayer = async function (tag) {
        let newTag = await tag.replace('#', '');
        if (newTag.startsWith('%23') || newTag.startsWith('#')) newTag = newTag.startsWith('%') ? newTag.slice(3) : newTag.slice(1);
        tag = newTag;
        const player = await client.fetchBrawlURL(`/players/%23${newTag}`);
        return player;
    }
    client.getBrawlBrawlers = async function () {
        const brawlers = await client.fetchBrawlURL(`/brawlers`);
        return console.log(brawlers);
    }
}
// client.brawlStars.fetchURL('https://api.brawlstars.com/v1/players/%23CVJCVPG0')