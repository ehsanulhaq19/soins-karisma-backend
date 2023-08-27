const {StripeCustomer, User, UserRole} = require("../models")
const {
    createCustomer,
    updateCustomer,
    createEphemeralKey,
    createSetupIntent
} = require("../services/payment/stripePaymentService")
const UserStatusValues = require("../models/values/UserStatus")
const authService = require("../services/authService")

const getOrCreateStripeCustomer = async(data) => {
    const {userName, email, phone, roleId, stripePaymentSourceId} = data
    let user = await User.findOne({
        where: {
            email
        }
    })

    //create a new user if user is not exits
    if (!user) {
        //create new user password
        let hashPassword = null
        await authService.cryptPassword(email)
        .then(hashResponse => {
            hashPassword = hashResponse
        })
        user = await User.create({
            email,
            userName,
            phone,
            password: hashPassword,
            statusId: UserStatusValues.ACTIVE.id
        })

        //add role for the user
        const userRole = UserRole.build({
            userId: user.id,
            roleId: role.id
        });

        await userRole.save()
    }

    //Get stripe customer
    let stripeCustomerObj = await StripeCustomer.findOne({
        where: {
            userId: user.id
        }
    })

    //Create a new stripe customer if nor found
    if (!stripeCustomerObj) {
        const stripeCustomer = await createCustomer({
            name: userName,
            email,
            phone,
            ...(stripePaymentSourceId && {source: stripePaymentSourceId})
        })
        
        const {customer} = stripeCustomer
    
        //create stripe customer
        stripeCustomerObj = await StripeCustomer.create({
            userId: user.id,
            stripeCustomerId: customer.id,
            statusId: UserStatusValues.ACTIVE.id,
            typeId: roleId
        })
    } else {
        //update stripe customer and attach payment source with it
        const stripeCustomer = await updateCustomer({
            stripeCustomerId: stripeCustomerObj.stripeCustomerId,
            source: stripePaymentSourceId
        })
    }

    return stripeCustomerObj
}

const createStripeEphemeralKey = async({customerId, apiVersion}) => {
    const ephemeralKey = await createEphemeralKey({
        customerId,
        apiVersion
    });
        
    return ephemeralKey
}

const createStripeSetupIntent = async({customerId}) => {
    const setupIntent = await createSetupIntent({
        customerId
    });
    
    return setupIntent
}


module.exports = {
    getOrCreateStripeCustomer,
    createStripeEphemeralKey,
    createStripeSetupIntent
}