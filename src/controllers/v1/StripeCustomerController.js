const httpStatus = require('http-status');
const stripePaymentService = require("../../services/payment/stripePaymentService")

/**
 * Get stripe customer saved payment methods from stripe api
 * @param {*} req 
 * @param {*} res 
 */

 const getStripeCustomerPaymentMethods = async (req, res) => {
    const queryUser = req.queryUser
    
    const paymentMethods = await stripePaymentService.retrieveStripCustomerPaymentMethods({
        customerId: queryUser.StripeCustomer.stripeCustomerId
    })
    
    return res.status(httpStatus.OK).json({ ...{
        statusCode: httpStatus.OK,
        paymentMethods: paymentMethods.data
    } });
};

module.exports = {
    getStripeCustomerPaymentMethods
}