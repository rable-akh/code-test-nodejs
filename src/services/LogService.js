"use strict";

const Logs = require("../models/Logs");

module.exports.getList = async (params) => {
    const page = params.page ? params.page : 1;
    const perPage = params.perPage ? params.perPage : 10;

    const count = await Logs.count();
  
    return new Promise(function (reslove, reject) {
        Logs
        .find()
        .skip(Number(page - 1) * Number(perPage))
        .limit(perPage)
        .populate('created_by')
        .exec(function (err, res) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            reslove({
              items: res,
              pages: parseInt(page),
              perPage: parseInt(perPage),
              total: count,
            });
          }
        });
    });
  };

module.exports.save = async (params) => {
    let data = {
        link: params.link,
        action: params.action,
        change: params.change,
        created_by: params.authId
    };
    console.log(data);
    return new Promise(function (reslove, reject) {
        Logs.create(data, function (err, res) {
        if (err) {
          reject(err);
        } else {
          reslove(res);
        }
      });
    });
};