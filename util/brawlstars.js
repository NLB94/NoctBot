const {
    Client
} = require('discord.js');
const fetch = require('node-fetch')
const functions = require('./brawlstars');
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImZjMjk0YTZlLTY3YjUtNDQzNy05MzkzLWI4MTQ2MmRkOWUxNCIsImlhdCI6MTYxNzA5NDkzNCwic3ViIjoiZGV2ZWxvcGVyL2IzMmEzNWZhLWU3MTYtM2EyMi03MjNkLWI3NTIwMzMzNDgxYSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNC4yNDQuNjQuMjE4IiwiMzQuMjQwLjIuMzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.Dnz0jENdzcNU4-TRADtkNOH-MvpiA2D1WfDRI-tVujZdioT1djc7-2RnzU5AwfEsriOplVvD1IySI-XEp6S7OA'
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    client.brawlStars = {
        fetchURL: functions.fetchURL = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                console.log(response.statusText);
            }
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error)
        }
    }}
    client.brawlStars.fetchURL('https://api.brawlstars.com/v1/players/%23CVJCVPG0')
}