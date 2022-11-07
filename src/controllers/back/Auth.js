const authService = require("../../services/AuthService");

module.exports.Login = (req, res) => {
  let response = {};
  try {
    authService.AdminAuth(
      { email: req.body.user, password: req.body.hash },
      function (result) {
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
      }
    );
  } catch (e) {
    response.code = 401;
    response.message = "error";
    response.devloper_message =
      "Error, Please check more detail in 'Results' Object";
    response.results = e;
    return res.status(200).json({ response });
  }
};

module.exports.checkToken = async (req, res) => {
  let response = {};
  try {
    authService
      .CheckAuthToken({ token: req.body.token })
      .then((result) => {
        response.code = 200;
        response.message = "success";
        response.devloper_message = "success";
        response.results = result;
        return res.status(200).json(response);
      })
      .catch((error) => {
        response.code = 401;
        response.message = "warning";
        response.devloper_message =
          "Error, Please check more detail in 'Results' Object";
        response.results = "Your token is expired.";
        return res.status(200).json(response);
      });
  } catch (e) {
    response.code = 401;
    response.message = "error";
    response.devloper_message =
      "Error, Please check more detail in 'Results' Object";
    response.results = e;
    return res.status(200).json(response);
  }
};