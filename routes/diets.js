const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('diets')
})

module.exports = router