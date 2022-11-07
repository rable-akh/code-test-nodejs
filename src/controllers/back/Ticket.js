'use strict';
const TicketService = require("../../services/TicketService");
const { authId } = require("../../services/AuthService");

module.exports.list = (req,  res) => {
    let response = {};
    try {
        var params = {page: req.query.page};
        TicketService.getList(params).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "Tickets not found.";
            }
            return res.status(200).json({ response });
        }).catch((error) => {
            response.code = 401;
            response.message = "error";
            response.devloper_message =
              "Error, Please check more detail in 'Results' Object";
            response.results = error;
            return res.status(200).json({ response });
        })
    } catch (e) {
        response.code = 401;
        response.message = "error";
        response.devloper_message =
        "Error, Please check more detail in 'Results' Object";
        response.results = e;
        return res.status(200).json({ response });
    }
}

module.exports.add = (req, res) => {
    let response = {};
    try {
        var data = {
            name: req.body.name,
            code: req.body.code,
            desc: req.body.desc,
            price: req.body.price,
            authId: authId(req)
        }
        TicketService.save(data).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "Tickets not found.";
            }
            return res.status(200).json({ response });
        }).catch((error) => {
            response.code = 401;
            response.message = "error";
            response.devloper_message =
              "Error, Please check more detail in 'Results' Object";
            response.results = error;
            return res.status(200).json({ response });
        })
    } catch (e) {
        response.code = 401;
        response.message = "error";
        response.devloper_message =
        "Error, Please check more detail in 'Results' Object";
        response.results = e;
        return res.status(200).json({ response });
    }
}

module.exports.edit = (req,  res) => {
    let response = {};
    try {
        var data = {
            id: req.body.id,
            name: req.body.name,
            code: req.body.code,
            desc: req.body.desc,
            price: req.body.price,
            authId: authId(req)
        }
        TicketService.edit(data).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "Tickets not found.";
            }
            return res.status(200).json({ response });
        }).catch((error) => {
            response.code = 401;
            response.message = "error";
            response.devloper_message =
              "Error, Please check more detail in 'Results' Object";
            response.results = error;
            return res.status(200).json({ response });
        })
    } catch (e) {
        response.code = 401;
        response.message = "error";
        response.devloper_message =
        "Error, Please check more detail in 'Results' Object";
        response.results = e;
        return res.status(200).json({ response });
    }
}

module.exports.status = (req, res) => {
    let response = {};
    try {
        var data = {
            id: req.body.id,
            status: req.body.status,
            note: req.body.note,
            authId: authId(req)
        }
        TicketService.status(data).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "Tickets not found.";
            }
            return res.status(200).json({ response });
        }).catch((error) => {
            response.code = 401;
            response.message = "error";
            response.devloper_message =
              "Error, Please check more detail in 'Results' Object";
            response.results = error;
            return res.status(200).json({ response });
        })
    } catch (e) {
        response.code = 401;
        response.message = "error";
        response.devloper_message =
        "Error, Please check more detail in 'Results' Object";
        response.results = e;
        return res.status(200).json({ response });
    }
}

module.exports.delt = (req,  res) => {
    let response = {};
    try {
        var data = req.params.id;
        TicketService.delete(data).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "Tickets not found.";
            }
            return res.status(200).json({ response });
        }).catch((error) => {
            response.code = 401;
            response.message = "error";
            response.devloper_message =
              "Error, Please check more detail in 'Results' Object";
            response.results = error;
            return res.status(200).json({ response });
        })
    } catch (e) {
        response.code = 401;
        response.message = "error";
        response.devloper_message =
        "Error, Please check more detail in 'Results' Object";
        response.results = e;
        return res.status(200).json({ response });
    }
}