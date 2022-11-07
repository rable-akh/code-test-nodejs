"use strict";

const jwt = require("jsonwebtoken");
const adminServce = require("./AdminService.js");
const LogService = require("./LogService");
const Password = require("../helpers/password");
require("dotenv").config();

//Admin Auth
async function AdminAuth(params, cb) {
  const { email, password } = params;
  await adminServce
    .getAdmin({ email: email })
    .then( async (res) => {
        if (res) {
            console.log(res);
            if (Password.compare(password, res.password)) {
                let jwtValue = {
                    id: res._id,
                    name: res.name,
                    email: res.email,
                    role: res.role,
                };
                const jwtToken = generateToken(jwtValue);
                cb({
                    _id: res._id,
                    token: jwtToken,
                    name: res.name,
                    email: res.email,
                    photo: res.photo,
                    phone: res.phone,
                    role: res.role,
                    created_by: res.created_by,
                    created_at: res.created_at,
                    updated_at: res.updated_at,
                });
                
                await LogService.save({link: "User Auth", action: "Login", change: `Login Success`, authId: res._id});
            } else {
                await LogService.save({link: "User Auth", action: "Login", change: `Login Fail => password do not match`, authId: res._id});
                cb({ warn: true });
            }
        } else {
            cb({ warn: true });
        }
    })
    .catch((e) => {
        console.log(e);
      cb({ issue: true, error: e });
    });
}

async function CheckAuthToken(params) {
  let { token } = params;
  return new Promise(function (reslove, reject) {
    if (checkTokens(token)) {
      const user = jwt.decode(token);
      reslove(user);
    } else {
      reject(false);
    }
  });
}


function checkTokens(token, expire = "1d") {
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET, {
      expiresIn: expire,
    });
    
    if (decoded) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function checkRole(req)
{
    var data = decodeTokens(req);
    if(data){
        if(data?.role==='supervisor' || data?.role==='leader'){
            return true;
        }
        return false;
    }
    return false;
}

function decodeTokens(req, expire = "1d") {
  var jdcode = jwt.decode(extractToken(req), { expiresIn: expire });
  return jdcode;
}

function authId(req) {
  try {
    var data = decodeTokens(req);
    return data.id;
  } catch (e) {
    return 0;
  }
}

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

function generateToken(params, expire) {
  try {
    return jwt.sign(params, process.env.TOKEN_SECRET, { expiresIn: "1d" });
  } catch (e) {
    return e;
  }
}

function generateTokens(params, expire = "1d") {
  try {
    return jwt.sign(params, process.env.TOKEN_SECRET, { expiresIn: expire });
  } catch (e) {
    return e;
  }
}

// Auth Checking Middware
const authMiddware = (req, res, next) => {
  const token = extractToken(req);
  if (checkTokens(token)) {
    next();
  } else {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
      developer_message: "Unauthorized",
      results: null,
    });
  }
};

const roleAndPermission = (req, res, next) => {
    // const token = extractToken(req);
    if (checkRole(req)) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
        developer_message: "Unauthorized",
        results: null,
      });
    }
  };

module.exports = {
  AdminAuth,
  CheckAuthToken,
  generateToken,
  generateTokens,
  checkTokens,
  decodeTokens,
  extractToken,
  authMiddware,
  roleAndPermission,
  authId,
};
