const statuses = require('../../../constants/statuses.json')
const authValidatorHelper = require("../../../validations/v1/routeValidators/authValidatorHelper.js")

const validator = async(req, res, next) => {
    
  const requestUrl = req.originalUrl
  let validatorResponse = null;

  if (requestUrl === "/api/v1/login") {
    validatorResponse = await authValidatorHelper.authLoginValidator(req)
  }

  else if (requestUrl === "/api/v1/login/two_factor_authentication") {
    validatorResponse = await authValidatorHelper.twoFactorAuthValidator(req)
  }

  else if (requestUrl === "/api/v1/login/two_factor_authentication/otp_verify") {
    validatorResponse = await authValidatorHelper.twoFactorAuthOtpVerifyValidator(req)
  }

  else if (requestUrl === "/api/v1/register") {
    validatorResponse = await authValidatorHelper.registerValidator(req)
  }

  else if (requestUrl === "/api/v1/basic/register") {
    validatorResponse = await authValidatorHelper.basicRegisterValidator(req)
  }

  else if (requestUrl === "/api/v1/salon/register") {
    validatorResponse = await authValidatorHelper.salonRegisterValidator(req)
  }

  else if (requestUrl === "/api/v1/employee/register") {
    validatorResponse = await authValidatorHelper.employeeRegisterValidator(req)
  }

  else if (requestUrl === "/api/v1/change_password") {
    validatorResponse = await authValidatorHelper.changePasswordValidator(req)
  }

  else if (requestUrl === "/api/v1/forgot_password") {
    validatorResponse = await authValidatorHelper.forgotPasswordValidator(req)
  }

  else if (requestUrl === "/api/v1/forgot_password/otp_verify") {
    validatorResponse = await authValidatorHelper.forgotPasswordOtpVerifyValidator(req)
  }
          
  else if (requestUrl === "/api/v1/forgot_password/otp_verify/update_password") {
    validatorResponse = await authValidatorHelper.forgotPasswordOtpVerifyUpdatePasswordValidator(req)
  }

  if (validatorResponse) {
    if (validatorResponse.type === statuses.ERROR) {
      delete validatorResponse["type"]
      return res.status(validatorResponse.statusCode).json(validatorResponse);
    }
  }   
  next()
}

module.exports = validator;