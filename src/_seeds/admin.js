"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/admin");

if (process.env.CONNECTDB) {
  try {
    mongoose.connect(process.env.CONNECTDB);
    Admin.create(
        {
          name: "Admin",
          email: "admin@mail.com",
          password: "$2b$12$krFQfjihg67Pk0hqN6kn1OLejPApOMQozgt8t16gkfdJwhr5Q06xu", //123456
          role: 'admin',
          created_by: null,
          created_at: Date.now(),
          updated_at: null,
        },
        function (err, doc) {
          if (err) {
            console.log("admin err", err);
          } else {
            console.log("User : " + doc.email);
            console.log("Password : 123456");
            console.log("Admin collection data create success.");
            mongoose.connection.close();
          }
        }
      );
  } catch (error) {
    console.log(error);
  }
}