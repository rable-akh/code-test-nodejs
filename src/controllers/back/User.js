'use strict';
const AdminService = require("../../services/AdminService");
const { authId } = require("../../services/AuthService");

module.exports.list = (req,  res) => {
    let response = {};
    try {
        var params = {page: req.query.page};
        AdminService.getList(params).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "User not found.";
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

module.exports.add = (req,  res) => {
    let response = {};
    try {
        var data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, 
            role: req.body.role,
            authId: authId(req)
        }
        AdminService.save(data).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "User not found.";
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
            email: req.body.email,
            password: req.body.password, 
            role: req.body.role,
            authId: authId(req)
        }
        AdminService.edit(data).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "User not found.";
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
        AdminService.delete(data).then((result) => {
            if (result) {
                response.code = 200;
                response.message = "success";
                response.devloper_message = "success";
                response.results = result;
            } else {
                response.code = 200;
                response.message = "warning";
                response.devloper_message = "warning";
                response.results = "User not found.";
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