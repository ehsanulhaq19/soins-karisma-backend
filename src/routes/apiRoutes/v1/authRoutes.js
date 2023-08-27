const express = require('express');
const router = express.Router();
const AuthController = require('../../../controllers/v1/auth/AuthController');
const SalonAuthController = require('../../../controllers/v1/auth/SalonAuthController');
const EmployeeAuthController = require('../../../controllers/v1/auth/EmployeeAuthController');
const authMiddleware = require("../../../middlewares/v1/auth/authMiddleware")
const salonSelfAuthMiddleware = require("../../../middlewares/v1/auth/salonSelfAuthMiddleware")
const apiConfig = require("../../../constants/apiConfig.json")

//auth
router.post('/register', AuthController.register);
router.post('/basic/register', AuthController.basicRegister);
router.post('/login', AuthController.login);
router.post('/login/two_factor_authentication', AuthController.loginWithTwoFactorAuthentication);
router.post('/login/two_factor_authentication/otp_verify', AuthController.loginWithTwoFactorAuthOtpVerify);
router.post('/change_password', AuthController.changePassword);
router.post('/forgot_password', AuthController.forgotPasswod);
router.post('/forgot_password/otp_verify', AuthController.forgotPasswodOtpVerify);
router.post('/forgot_password/otp_verify/update_password', AuthController.changePasswordWithOtp);
//guest user
router.post('/guest_user_token', AuthController.getGuestUserToken);

//salon auth
router.post('/salon/register', SalonAuthController.salonRegister);

//employee auth
router.post('/employee/register', async(req, res, next) => {
    authMiddleware(req, res, next, {
        [apiConfig.roles.POST]: [
            'admin',
            'salon'
        ]
    })
}, salonSelfAuthMiddleware, EmployeeAuthController.employeeRegister);

module.exports = router;