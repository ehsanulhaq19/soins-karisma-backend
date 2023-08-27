const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const statuses = require("../../constants/statuses.json")

const createProduct = async (product) => {
    const {name, description, metadata} = product
    try {
        const stripeProduct = await stripe.products.create({
            name,
            description,
            metadata
        });
    
        return {
            type: statuses.SUCCESS,
            stripeProduct
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        }
    }
}

const createPrice = async (data) => {
    const {currency, unit_amount, recurring, product} = data
    try {
        const stripePrice = await stripe.prices.create({
            unit_amount,
            currency,
            recurring,
            product
          });
    
        return {
            type: statuses.SUCCESS,
            stripePrice
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        }
    }
}

const createSubscriptionCheckout = async (data) => {
    const {line_items, success_url, cancel_url, metadata} = data

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items,
            success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}'`,
            cancel_url,
            metadata
        });
    
        return {
            type: statuses.SUCCESS,
            session
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        }   
    }
}

const createCardPaymentMethod = async(data) => {
    const {number, expMonth: exp_month, expYear: exp_year, cvc} = data
    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
              number,
              exp_month,
              exp_year,
              cvc
            },
        });

        return {
            type: statuses.SUCCESS,
            paymentMethod
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        } 
    }
}

const createCustomer = async(data) => {
    const {name, email, phone, paymentMethodId, description="", source} = data
    
    try {
        const customer = await stripe.customers.create({
            name,
            email,
            phone,
            payment_method: paymentMethodId,
            source,
            description
        });
        return {
            type: statuses.SUCCESS,
            customer
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        } 
    }
}

const updateCustomer = async(data) => {
    const {stripeCustomerId, source} = data
    
    try {
        const customer = await stripe.customers.update(
            stripeCustomerId,
            {
                source
            }
        );
        return {
            type: statuses.SUCCESS,
            customer
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        } 
    }
}

const retrieveCustomer = async(customerId) => {
    
    try {
        const customer = await stripe.customers.retrieve(
            customerId
        );
        return {
            type: statuses.SUCCESS,
            customer
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        } 
    }
}

const createSubscription = async(data) => {
    const {customerId: customer, priceId: price, description, defaultPaymentMethod: default_payment_method} = data
    try {
        const subscription = await stripe.subscriptions.create({
            customer,
            items: [
              {price},
            ],
            description,
            default_payment_method
        });

        return {
            type: statuses.SUCCESS,
            subscription
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        }
    }
}

const createCard = async(data) => {
    try {
        const {customerId, number, expMonth: exp_month, expYear: exp_year, cvc} = data
        const card = await stripe.customers.createSource(
            customerId,
            {
                source: {
                    object: "card",
                    number,
                    exp_month,
                    exp_year,
                    cvc
                }
            }
        );

        return {
            type: statuses.SUCCESS,
            card
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        }
    }
}

const createCharge = async(data) => {
    try {
        const {amount, currency, source, customer, description, metadata} = data
        const charge = await stripe.charges.create({
            amount,
            currency,
            ...(
                source && {source}
            ),
            description,
            customer,
            metadata
        });

        return {
            type: statuses.SUCCESS,
            charge
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        }
    }
}

const createPaymentIntent = async(data) => {
    try {
        const {amount, currency, customer = null, automatic_payment_methods = null, shipping, metadata} = data
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            ...(
                shipping &&
                {
                    shipping: {
                        name: shipping.name,
                        phone: shipping.phone,
                        address: {
                            city: shipping.address.city,
                            country: shipping.address.country,
                            line1: shipping.address.line1,
                            line2: shipping.address.line2,
                            postal_code: shipping.address.postal_code,
                            state: shipping.address.state,
                        }
                    }
                }
            ),
            ...(
                customer && {
                    customer
                }
            ),
            automatic_payment_methods,
            metadata
        });

        return {
            type: statuses.SUCCESS,
            paymentIntent
        }
    } catch (error) {
        return {
            type: statuses.ERROR,
            error
        }
    }
}


const retrievePaymentMethod = async(paymentMethhodId) => {
    const paymentMethod = await stripe.paymentMethods.retrieve(
        paymentMethhodId
    );

    return paymentMethod
}

const createEphemeralKey = async({customerId, apiVersion}) => {
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customerId},
        {apiVersion}
    );

    return ephemeralKey
}

const createSetupIntent = async({customerId}) => {
    const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
    });

    return setupIntent
}

const retrieveStripCustomerPaymentMethods = async({customerId}) => {
    const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
    });

    return paymentMethods
}

module.exports = {
    createProduct,
    createPrice,
    createSubscriptionCheckout,
    createCardPaymentMethod,
    createCustomer,
    retrieveCustomer,
    createSubscription,
    createCard,
    createCharge,
    createPaymentIntent,
    retrievePaymentMethod,
    updateCustomer,
    createEphemeralKey,
    createSetupIntent,
    retrieveStripCustomerPaymentMethods
}