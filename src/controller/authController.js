const authService = require('../services/authService');

exports.signin = function (req, res) {
  return authService.signin(req, res);
};

exports.signup = function (req, res) {
  return authService.signup(req, res);
};

exports.createRole = function (req, res) {
  return authService.createRole(req, res);
}

exports.updateRole = function (req, res) {
  return authService.updateRole(req, res);
}

exports.deleteRole = function (req, res) {
  return authService.deleteRole(req, res);
}

exports.getRoles = function (req, res) {
  return authService.getRoles(req, res);
}