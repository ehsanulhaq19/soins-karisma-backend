const httpStatus = require('http-status');
const { Subscription, Review, SubscriptionDuration, SubscriptionStatus, StripeSubscriptionProduct} = require('../../models');
const SubscriptionStatusValues = require('../../models/values/SubscriptionStatus');
const uuidService = require('../../services/uuidService')
const SubscriptionSerializer = require('../../serializers/v1/SubscriptionSerializer')
const apiDataJson = require("../../constants/apiConfig.json")
const subscriptionService = require("../../services/subscriptionService")
const statuses = require("../../constants/statuses.json")

/**
 * get subscription item
 * @param {*} req 
 * @param {*} res 
 */

const getSubscriptionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    await Subscription.findOne({
        include: [
            {
                model: SubscriptionStatus,
            },
            {
                model: SubscriptionDuration,
            },
            {
                model: Review
            }
    ],
        where: { uuid }
    }).then(async(subscription) => {
        const subscriptionSerializer = new SubscriptionSerializer()
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, subscription: await subscriptionSerializer.serialize(subscription)} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Subscription not found"} });
    });
};

/**
 * create subscription item
 * @param {*} req 
 * @param {*} res 
 */

 const createSubscriptionItem = async (req, res) => {
    const data = req.body
    const subscriptionStatus = SubscriptionStatusValues['ACTIVE']
    const subscriptionDuration = req.subscriptionDuration
    const {maxActiveBookingsLimitPerDay, maxActiveBookingsLimit} = subscriptionService.getSubscriptionBookingLimits(subscriptionDuration.id)
    
    //create subscription
    const newSubscription = await Subscription.build({
        name: data.name,
        price: data.price,
        description: data.description,
        durationId: subscriptionDuration.id,
        statusId: subscriptionStatus.id,
        maxActiveBookingsLimitPerDay,
        maxActiveBookingsLimit
    });

    //send response
    await newSubscription.save()
    .then(async(subscription) => {
        //create stripe subscription product
        const productResponse = await subscriptionService.createStripeSubscriptionProduct(subscription)
        if (productResponse.type === statuses.ERROR) {
            throw new Error('Stripe subscription product failed');
        }
        const subscriptionObject = await Subscription.findOne({
            where: {
                id: subscription.id
            },
            include: [
                {
                    model: StripeSubscriptionProduct
                },
                {
                    model: SubscriptionStatus,
                },
                {
                    model: SubscriptionDuration,
                },
                {
                    model: Review
                }
            ]
        })
        //create stripe subscription price
        const priceResponse = await subscriptionService.createStripeSubscriptionPrice(subscriptionObject)
        if (priceResponse.type === statuses.ERROR) {
            throw new Error('Stripe subscription price failed');
        }
        
        const subscriptionSerializer = new SubscriptionSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            subscription: await subscriptionSerializer.serialize(subscriptionObject)
        } });
    })
    .catch(async(e) => {
        await newSubscription.destroy({ truncate: true})
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "Subscription is not created"
        } });
    });
};

/**
 * get subscription collection
 * @param {*} req 
 * @param {*} res 
 */

 const getSubscriptionCollection = async (req, res) => {
    const data = req.query
    
    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const subscriptions = await Subscription.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [
            {
                model: SubscriptionStatus,
            },
            {
                model: SubscriptionDuration,
            },
            {
                model: Review
            }
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    const subscriptionSerializer = new SubscriptionSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        subscriptions: await subscriptionSerializer.serializeBulk(subscriptions)
    } });
};

module.exports = {
    getSubscriptionItem,
    createSubscriptionItem,
    getSubscriptionCollection
}