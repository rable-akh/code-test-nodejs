const { Router } = require("express");
const Auth = require("../services/AuthService");
const backRoute = require('./api/back.js');

const router = Router();

router.all('/auth/*', Auth.authMiddware);

router.use(backRoute);

module.exports = router;