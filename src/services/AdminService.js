"use strict";

const Admin = require("../models/admin");
const LogService = require("../services/LogService");
const Password = require("../helpers/password");
module.exports.getAdmin = async (params) => {
  try {
    let admins = await Admin.findOne(params);
    if (admins) {
      return admins;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

module.exports.getList = async (params) => {
    const page = params.page ? params.page : 1;
    const perPage = params.perPage ? params.perPage : 10;

    const count = await Admin.count();
  
    return new Promise(function (reslove, reject) {
      Admin
        .find()
        .skip(Number(page - 1) * Number(perPage))
        .limit(perPage)
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
      name: params.name,
      email: params.email,
      password: Password.hash(params.password),
      role: params.role,
      created_by: params.authId,
      created_at: Date.now()
    };
    return new Promise(function (reslove, reject) {
      Admin.create(data, async function (err, res) {
        if (err) {
            reject(err);
        } else {
            await LogService.save({link: "User Create", action: "Add", change: `${params.name}, ${params.email}, ${params.role}, `, authId: params.authId});
            reslove(res);
        }
      });
    });
};

module.exports.edit = async (params) => {
    let data = {
      name: params.name,
      email: params.email,
      password: (params.password!==undefined && params.password !== '')?Password.hash(params.password):undefined,
      role: params.role,
      updated_at: Date.now()
    };
    return new Promise(function (reslove, reject) {
      Admin.findOneAndUpdate({_id: params.id}, data, async function (err, res) {
        if (err) {
            reject(err);
        } else {
            await LogService.save({link: "User Update", action: "Edit", change: `${params.name}, ${params.email}, ${params.role} >> ${res.name}, ${res.email}, ${res.role} `, authId: params.authId});
            reslove(res);
        }
      });
    });
};

module.exports.delete = async (params) => {
    return new Promise(function (reslove, reject) {
      Admin.findByIdAndDelete(params, async function (err, doc) {
        if (err) {
          reject(err);
        } else {
            await LogService.save({link: "User Delete", action: "Delete", change: `${doc}`, authId: params.authId});
            reslove(true);
        }
      });
    });
};
  