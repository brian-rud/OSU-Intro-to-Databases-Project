const express = require('express')
router = express.Router()

router.get('/', (req,res) => {
    res.render('cuisines')
})

module.exports = router