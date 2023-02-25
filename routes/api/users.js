const express = require('express');
const { listUsers } = require('../../controllers');

const router = express.Router();

router.get('/', listUsers);

module.exports = router;