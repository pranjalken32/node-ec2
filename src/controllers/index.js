module.exports = {
  loginController: require("./AuthController/loginController"),
  signupController: require("./AuthController/signupController"),
  generateOTP: require("./AuthController/generateOTP"),
  verifyOTP: require("./AuthController/verifyOTP"),
  resetPassword: require("./AuthController/resetPassword"),
  UserController: require("./user-controller"),
  PlanController: require("./plan-controller"),
}
