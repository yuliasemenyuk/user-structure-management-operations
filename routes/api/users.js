const express = require("express");
const { schemas } = require('../../schemas/userSchema');
const { validation } = require('../../middlewares');
const ctrl = require('../../controllers');

const router = express.Router();

router.post('/register', validation(schemas.joiRegisterSchema), ctrl.register);
router.post('/login', validation(schemas.joiLoginSchema), ctrl.login);
router.get('/', ctrl.listUsers);

module.exports = router;
