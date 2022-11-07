const { Router } = require("express");
const { Login } = require("../../controllers/back/Auth");
const ticket = require('../../controllers/back/Ticket');
const Logs = require('../../controllers/back/Logs');
const Auth = require("../../services/AuthService");
const user = require('../../controllers/back/User');

const router = Router();

router.post('/login', Login);

// User Route
router.get('/auth/user', user.list);
router.post('/auth/user', user.add);
router.put('/auth/user', user.edit);
router.delete('/auth/user/:id', user.delt);

// Ticket Route
router.get('/auth/ticket', ticket.list);
router.post('/auth/ticket', ticket.add);
router.put('/auth/ticket', ticket.edit);
router.delete('/auth/ticket/:id', ticket.delt);

router.post('/auth/ticket-status', Auth.roleAndPermission, ticket.status);

// Logs
router.get('/auth/logs', Logs.list);


module.exports = router;