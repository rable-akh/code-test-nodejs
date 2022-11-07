"use strict";

const TicketDoc = require("../models/Ticket");
const LogService = require("../services/LogService");
const Password = require("../helpers/password");

module.exports.getList = async (params) => {
    const page = params.page ? params.page : 1;
    const perPage = params.perPage ? params.perPage : 10;

    const count = await TicketDoc.count();
  
    return new Promise(function (reslove, reject) {
        TicketDoc
        .find({})
        .skip(Number(page - 1) * Number(perPage))
        .limit(perPage)
        .populate('created_by')
        .exec(function (err, res) {
          if (err) {
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
        code: params.code,
        desc: params.desc,
        price: params.price,
        status: 'pending',
        status_logs: [
            {
                status: 'pending',
                note: '',
                date: Date.now()
            }
        ],
        created_by: params.authId 
    };
    return new Promise(function (reslove, reject) {
        TicketDoc.create(data, async function (err, res) {
        if (err) {
            reject(err);
        } else {
            await LogService.save({link: "Ticket Create", action: "Add", change: `name: ${params.name}, code: ${params.code}, desc: ${params.desc}, price: ${params.price}`, authId: params.authId});
            reslove(res);
        }
      });
    });
};

module.exports.edit = async (params) => {
    let data = {
        name: params.name,
        code: params.code,
        desc: params.desc,
        price: params.price,
    };
    return new Promise(function (reslove, reject) {
        TicketDoc.findOneAndUpdate({_id: params.id}, data, async function (err, res) {
        if (err) {
            reject(err);
        } else {
            await LogService.save({link: "Ticket Update", action: "Edit", change: `name: ${params.name}, code: ${params.code}, desc: ${params.desc}, price: ${params.price}`, authId: params.authId});
            reslove(res);
        }
      });
    });
};


module.exports.status = async (params) => {
    let data = {
        status: params.status,
        $push: {
            "status_logs": {
                status: params.status,
                note: params.note,
                date: Date.now(),
                by: params.authId
            }
        },
    };
    return new Promise(function (reslove, reject) {
        TicketDoc.findOneAndUpdate({_id: params.id}, data, async function (err, res) {
        if (err) {
            reject(err);
        } else {
            await LogService.save({link: "Ticket Status Log", action: "Status", change: `Status: ${params.status}, Note: ${params.note} `, authId: params.authId});
            reslove(res);
        }
      });
    });
};

module.exports.delete = async (params) => {
    return new Promise(function (reslove, reject) {
        TicketDoc.findByIdAndDelete(params, async function (err, doc) {
        if (err) {
          reject(err);
        } else {
            await LogService.save({link: "Ticket Delete", action: "Delete", change: `${doc}`, authId: params.authId});
            reslove(true);
        }
      });
    });
};
  