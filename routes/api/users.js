const express = require("express");
const { schemas } = require('../../schemas/userSchema');
const { validation, authentication } = require('../../middlewares');
const ctrl = require('../../controllers');

const router = express.Router();

router.post('/register', validation(schemas.joiRegisterSchema), ctrl.register);
router.post('/login', validation(schemas.joiLoginSchema), ctrl.login);
router.get('/list', authentication, ctrl.listUsers);

module.exports = router;
