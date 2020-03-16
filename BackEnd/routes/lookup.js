const express = require('express');
const router = express.Router();
const async = require('async');
const data = require("../config/countries");


// ---------------- Send All Countries---------------- 

router.get('/countries', function (req, res) {
    res.json(data);
});
module.exports = router;
