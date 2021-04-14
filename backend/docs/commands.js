const router = require('express').Router();
const { client } = require('../../index');

router.get('/', (req, res) => {
    res.send(client.commands)
})

module.exports = router;