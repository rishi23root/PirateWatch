const express = require('express');
const router = express.Router();
const fs = require('fs');

router.use((req, res, next) => {
    console.log(req.url, '@', Date.now(), 'from', req.ip)
    next()
})

// domain/api/
router.get('',)



module.exports = router;