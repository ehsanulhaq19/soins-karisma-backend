const httpStatus = require('http-status');
const { 
        Subscription, SubscriptionCollection, SubscriptionCollectionStatus, 
        SubscriptionCollectionList, SubscriptionDuration, SubscriptionStatus
} = require('../../models');
const SubscriptionCollectionStatusValues = require('../../models/values/SubscriptionCollectionStatus');
const SubscriptionCollectionTypeValues = require('../../models/values/SubscriptionCollectionType');
const SubscriptionCollectionListStatusValues = require('../../models/values/SubscriptionCollectionListStatus');
const SubscriptionCollectionListTypeValues = require('../../models/values/SubscriptionCollectionListType');
const uuidService = require('../../services/uuidService')
const SubscriptionCollectionSerializer = require('../../serializers/v1/SubscriptionCollectionSerializer')
const apiDataJson = require("../../constants/apiConfig.json")
const sequelize = require("sequelize")

/**
 * get subscriptionCollection item
 * @param {*} req 
 * @param {*} res 
 */

const getSubscriptionCollectionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    
    await SubscriptionCollection.findOne({
        include: [
            {
                model: Subscription,
                include: [
                    {
                        model: SubscriptionStatus,
                    },
                    {
                        model: SubscriptionDuration,
                    },
                ]
            },
            {
                model: SubscriptionCollectionStatus
            }
    ],
        where: { uuid }
    }).then(async(subscriptionCollection) => {
        const subscriptionCollectionSerializer = new SubscriptionCollectionSerializer()
        return res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, subscriptionCollection: await subscriptionCollectionSerializer.serialize(subscriptionCollection)} });
    })
    .catch(error => {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "SubscriptionCollection not found"} });
    });
};

/**
 * patch subscriptionCollection item
 * @param {*} req 
 * @param {*} res 
 */

 const patchSubscriptionCollectionItem = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const subscriptions = req.subscriptions

    const subscriptionCollection = await SubscriptionCollection.findOne({
                                        where: { uuid }
                                    })
    
    
    for(let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i]
        await SubscriptionCollectionList.create({
            subscriptionCollectionId: subscriptionCollection.id,
            subscriptionId: subscription.id,
            statusId: SubscriptionCollectionListStatusValues.ACTIVE.id,
            typeId: SubscriptionCollectionListTypeValues.DEFAULT.id
        })
    }
    
    const updateSubsctiptionCollection = await SubscriptionCollection.findOne({
        where: {
            id: subscriptionCollection.id
        },
        include: [
            {
                model: Subscription,
                include: [
                    {
                        model: SubscriptionStatus,
                    },
                    {
                        model: SubscriptionDuration,
                    },
                ]
            },
            {
                model: SubscriptionCollectionStatus
            }
        ]
    })

    const subscriptionCollectionSerializer = new SubscriptionCollectionSerializer()
    return res.status(httpStatus.CREATED).json({ ...{
        statusCode: httpStatus.CREATED,
        subscription: await subscriptionCollectionSerializer.serialize(updateSubsctiptionCollection)
    } });
};

/**
 * create SubscriptionCollection item
 * @param {*} req 
 * @param {*} res 
 */

 const createSubscriptionCollectionItem = async (req, res) => {
    const data = req.body
    const subscriptions = req.subscriptions
    
    //create subscription collection
    await SubscriptionCollection.create({
        statusId: SubscriptionCollectionStatusValues.ACTIVE.id,
        typeId: SubscriptionCollectionTypeValues.DEFAULT.id
    })
    .then(async(subscriptionCollection) => {
        for(let i = 0; i < subscriptions.length; i++) {
            const subscription = subscriptions[i]
            await SubscriptionCollectionList.create({
                subscriptionCollectionId: subscriptionCollection.id,
                subscriptionId: subscription.id,
                statusId: SubscriptionCollectionListStatusValues.ACTIVE.id,
                typeId: SubscriptionCollectionListTypeValues.DEFAULT.id
            })
        }
        
        const newSubsctiptionCollection = await SubscriptionCollection.findOne({
            where: {
                id: subscriptionCollection.id
            },
            include: [
                {
                    model: Subscription,
                    include: [
                        {
                            model: SubscriptionStatus,
                        },
                        {
                            model: SubscriptionDuration,
                        },
                    ]
                },
                {
                    model: SubscriptionCollectionStatus
                }
            ]
        })

        const subscriptionCollectionSerializer = new SubscriptionCollectionSerializer()
        return res.status(httpStatus.CREATED).json({ ...{
            statusCode: httpStatus.CREATED,
            subscription: await subscriptionCollectionSerializer.serialize(newSubsctiptionCollection)
        } });
    })
    .catch(async(e) => {
        await newSubscription.destroy({ truncate: true})
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: e?.errors?.[0]?.message ? e.errors[0].message : "SubscriptionCollection is not created"
        } });
    });
};

/**
 * get subscriptionCollection collection
 * @param {*} req 
 * @param {*} res 
 */

 const getSubscriptionCollectionCollection = async (req, res) => {
    const data = req.query
    
    let pageNumber = 1
    let itemsPerPage = apiDataJson.itemsPerPage
    if (data?.pagination === "true") {
        pageNumber = data.page ? data.page : pageNumber
        itemsPerPage = data.itemsPerPage ? data.itemsPerPage : itemsPerPage
    }
    // apiDataJson
    const subscriptionCollections = await SubscriptionCollection.findAll({
        order: [
            ['id', 'ASC']
        ],
        include: [
            {
                model: Subscription,
                include: [
                    {
                        model: SubscriptionStatus,
                    },
                    {
                        model: SubscriptionDuration,
                    },
                ]
            },
            {
                model: SubscriptionCollectionStatus
            }
        ],
        offset: (pageNumber - 1) * itemsPerPage,
        limit: itemsPerPage,
    })
    const subscriptionCollectionSerializer = new SubscriptionCollectionSerializer()
    const statusCode = httpStatus.OK
    res.status(statusCode).json({ ...{
        statusCode,
        subscriptionCollections: await subscriptionCollectionSerializer.serializeBulk(subscriptionCollections)
    } });
};

/**
 * delete subscriptionCollection collection operation
 * @param {*} req
 * @param {*} res 
 */

 const deleteSubscriptionCollectionCollection = async (req, res) => {
    const uuid = uuidService.decodeUuid(req.params.uuid)
    const subscriptionIds = req.subscriptionIds

    let subscriptionCollection;
    try {
        subscriptionCollection = await SubscriptionCollection.findOne({ 
            where: { uuid }
        })
    } catch (error) {
        subscriptionCollection = null
    }
    
    if (!subscriptionCollection) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "SubscriptionCollection not found"} });
    }

    try {
        await SubscriptionCollectionList.destroy({
            where: {
                subscriptionId: {
                    [sequelize.Op.in]: subscriptionIds
                },
                subscriptionCollectionId: subscriptionCollection.id
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ ...{statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: "Subscriptions from collection are not deleted"} });
    }

    const updatedSubscriptionCollection = await SubscriptionCollection.findOne({ 
        where: { 
            id: subscriptionCollection.id
         },
        include: [
            {
                model: Subscription,
                include: [
                    {
                        model: SubscriptionStatus,
                    },
                    {
                        model: SubscriptionDuration,
                    },
                ]
            },
            {
                model: SubscriptionCollectionStatus
            }
        ] 
    })
    
    const subscriptionCollectionSerializer = new SubscriptionCollectionSerializer()
    res.status(httpStatus.OK).json({ ...{statusCode: httpStatus.OK, subscriptionCollection: await subscriptionCollectionSerializer.serialize(updatedSubscriptionCollection)} });
 };

module.exports = {
    getSubscriptionCollectionItem,
    patchSubscriptionCollectionItem,
    createSubscriptionCollectionItem,
    getSubscriptionCollectionCollection,
    deleteSubscriptionCollectionCollection
}