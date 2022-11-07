'use strict';
const LogService = require("../../services/LogService");
const { authId } = require("../../services/AuthService");

module.exports.list = (req,  res) => {
    let response = {};
    try {
        var params = {page: req.query.page};
        LogService.getList(params).then((result) => {
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