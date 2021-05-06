const fetch = require('node-fetch').default;
const token = 'VAç78.IA83jkjaà08aoPuJHEALLn';
const { Client } = require('discord.js');

const fetchClient = /**
@return {Client}
*/async function() {
    const fetched = await fetch('http://206.217.221.202:4000/client', {
        headers: {
            Authorization: `Bearer 817kHUIa7189.ioHuaoç9.PIIHOan`,
        }
    }).then(res => res.json());
    return fetched;
};
const func = async function() {
    const client = await fetchClient();
    const server = require('./server');
    await server(client);
    module.exports = {client}
}

func();