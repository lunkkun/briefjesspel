const express = require('express');
const router = express.Router();
const crypto = require("crypto")

router.get('/:gameId?', function (req, res) {
  if (!req.session.userId) {
    req.session.userId = crypto.randomBytes(16).toString('hex')
  }
  if (!req.session.gameId) {
    req.session.gameId = req.params.gameId // TODO: validate gameId
  }

  res.sendFile('index.html', { root: __dirname + '/../client/dist'})
})

module.exports = router;
