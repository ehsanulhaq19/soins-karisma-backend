const httpStatus = require('http-status');
const { Review, SubscriptionReview, ProductReview, SalonReview, Salon, Product, Subscription
 } = require('../../models');
const ReviewSerializer = require('../../serializers/v1/ReviewSerializer');
const uuidService = require('../../services/uuidService')

/**
 * Get salon reviews
 * @param {*} req
 * @param {*} res
 */

const getSalonReviews = async (req, res) => {
    const salonUuid = uuidService.decodeUuid(req.params.uuid);
    const { orderBy, page, itemsPerPage, pagination } = req.query;

    // pagination
    let paginationQuery = {};
    if (pagination === 'true') {
        paginationQuery = {
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage
        }
    }

    if (!salonUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid salon uuid!"} });
    }

    // To get reviews for a salon, we need to get the salon id from the salon uuid
    // Then we need to get the review id from the salon review table
    // Then we need to get the review from the review table

    let orderQuery = [];
    if (orderBy === 'ASC') {
        orderQuery = [
            ['createdAt', 'ASC']
        ]
    }
    else if (orderBy === 'DESC') {

        orderQuery = [
            ['createdAt', 'DESC']
        ]
    }

    const salon = await Salon.findOne({
        where: {
            uuid: salonUuid
        },
        attributes: ['id']
    });
    
    if (!salon) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Salon not found!"} });
    }

    const salonReviews = await SalonReview.findAll({
        where: {
            salonId: salon.id
        },
        order: orderQuery,
        include: [
            {
                model: Review,
            }
        ],
        ...paginationQuery
    });
    // Iterate over salon reviews and get the reviews
    const reviews = [];
    salonReviews.forEach(salonReview => {
        reviews.push(salonReview.Review);
    });

    if (salonReviews) {
        const reviewSerializer = new ReviewSerializer();
        
        return res.status(httpStatus.OK).json({ 
            ...{
                statusCode: httpStatus.OK, reviews: 
                await reviewSerializer.serializeBulk(reviews) 
            } });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Salon reviews not found!"} });
}

/**
 * Create salon review
 * @param {*} req
 * @param {*} res
 */

const createSalonReview = async (req, res) => {
    const salonUuid = uuidService.decodeUuid(req.params.uuid);
    const { rating, text } = req.body;

    if (!salonUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid salon uuid!"} });
    }
    const salon = await Salon.findOne({
        where: {
            uuid: salonUuid
        },
        attributes: ['id']
    });

    if (!salon) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Salon not found!"} });
    }

    const review = await Review.build({
        rating,
        text,
        userId: req.user.id
    });

    
    await review.save()
    .then(async(review) => {
            const salonReview = await SalonReview.build({
                salonId: salon.id,
                reviewId: review.id,

            });
            await salonReview.save()
                .then(async(salonReview) => salonReview)
                .catch(error => {
                    throw error;
                    // console.log(error);
                    // return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Salon review not created!"} });
                }
            );

            const reviewSerializer = new ReviewSerializer();
            return res.status(httpStatus.CREATED).json({ ...{statusCode: httpStatus.CREATED, review: await reviewSerializer.serialize(review)} });
        })
        .catch(error => {
            console.log(error);
            return res.status(httpStatus.BAD_REQUEST).json(
                { ...{statusCode: httpStatus.BAD_REQUEST, message: "Review not created!"} }
                );
        });
}

/**
 * Get product reviews
 * @param {*} req
 * @param {*} res
 */

const getProductReviews = async (req, res) => {
    const productUuid = uuidService.decodeUuid(req.params.uuid);

    const { page, itemsPerPage, pagination } = req.query;

    // pagination
    let paginationQuery = {};
    if (pagination === 'true') {
        paginationQuery = {
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage
        }
    }

    if (!productUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid product uuid!"} });
    }

    // To get reviews for a product, we need to get the product id from the product uuid
    // Then we need to get the review id from the product review table
    // Then we need to get the review from the review table

    const product = await Product.findOne({
        where: {
            uuid: productUuid
        },
        attributes: ['id']
    });

    if (!product) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Product not found!"} });
    }

    const productReviews = await ProductReview.findAll({
        where: {
            productId: product.id
        },
        include: [
            {
                model: Review,
            }
        ],
        ...paginationQuery
    });

    // Iterate over product reviews and get the reviews
    const reviews = [];
    productReviews.forEach(productReview => {
        reviews.push(productReview.Review);
    });

    
    if (productReviews) {
        const reviewSerializer = new ReviewSerializer();
        return res.status(httpStatus.OK).json({
            ...{
                statusCode: httpStatus.OK, 
                reviews: await reviewSerializer.serializeBulk(reviews)
            }
        });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Product reviews not found!"} });
}

/**
 * Create product review
 * @param {*} req
 * @param {*} res
 * @returns
    */

const createProductReview = async (req, res) => {
    const productUuid = uuidService.decodeUuid(req.params.uuid);
    const { rating, text } = req.body;

    if (!productUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid product uuid!"} });
    }

    const product = await Product.findOne({
        where: {
            uuid: productUuid
        },
        attributes: ['id']
    });

    if (!product) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Product not found!"} });
    } 

    const review = await Review.build({
        rating,
        text,
        userId: req.user.id
    });

    await review.save()
        .then(async(review) => {
            const productReview = await ProductReview.build({
                productId: product.id,
                reviewId: review.id
            });
            await productReview.save()
                .then(async(productReview) => productReview)
                .catch(error => {
                    console.log(error);
                    return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Product review not created!"} });
                }
            );
            
            const reviewSerializer = new ReviewSerializer();
            return res.status(httpStatus.CREATED).json({ ...{statusCode: httpStatus.CREATED, review: await reviewSerializer.serialize(review)} });
        }
        )
        .catch(error => {
            console.log(error);
            return res.status(httpStatus.BAD_REQUEST).json(
                { ...{statusCode: httpStatus.BAD_REQUEST, message: "Review not created!"} }
                );
        });
}

/**
 * Get subscription reviews
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getSubscriptionReviews = async (req, res) => {
    const subscriptionUuid = uuidService.decodeUuid(req.params.uuid);


    const { page, itemsPerPage, pagination } = req.query;

    // pagination
    let paginationQuery = {};
    if (pagination === 'true') {
        paginationQuery = {
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage
        }
    }

    if (!subscriptionUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid subscription uuid!"} });
    }

    // To get reviews for a subscription, we need to get the subscription id from the subscription uuid
    // Then we need to get the review id from the subscription review table
    // Then we need to get the review from the review table

    const subscription = await Subscription.findOne({
        where: {
            uuid: subscriptionUuid
        },
        attributes: ['id']
    });

    if (!subscription) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Subscription not found!"} });
    }

    const subscriptionReviews = await SubscriptionReview.findAll({
        where: {
            subscriptionId: subscription.id
        },
        include: [
            {
                model: Review,
            }
        ],
        ...paginationQuery
    });

    // Iterate over subscription reviews and get the reviews
    const reviews = [];
    subscriptionReviews.forEach(subscriptionReview => {
        reviews.push(subscriptionReview.Review);
    }
    );

    if (subscriptionReviews) {
        const reviewSerializer = new ReviewSerializer();
        return res.status(httpStatus.OK).json({
            ...{
                statusCode: httpStatus.OK, 
                reviews: await reviewSerializer.serializeBulk(reviews)
            }
        });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Subscription reviews not found!"} });
}

/**
 * Create subscription review
 * @param {*} req
 * @param {*} res
 * @returns
 */

const createSubscriptionReview = async (req, res) => {
    const subscriptionUuid = uuidService.decodeUuid(req.params.uuid);
    const { rating, text } = req.body;

    if (!subscriptionUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid subscription uuid!"} });
    }

    const subscription = await Subscription.findOne({
        where: {
            uuid: subscriptionUuid
        },
        attributes: ['id']
    });

    if (!subscription) {
        return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Subscription not found!"} });
    }

    const review = await Review.build({
        rating,
        text,
        userId: req.user.id
    });
    await review.save()
        .then(async(review) => {

            const subscriptionReview = await SubscriptionReview.create({
                subscriptionId: subscription.id,
                reviewId: review.id
            });

            const reviewSerializer = new ReviewSerializer();
            
            return res.status(httpStatus.CREATED).json({ ...{
                statusCode: httpStatus.CREATED, 
                review: await reviewSerializer.serialize(review)} 
            });
        }
        )
        .catch(error => {
            console.log(error);
            return res.status(httpStatus.BAD_REQUEST).json(
                { ...{statusCode: httpStatus.BAD_REQUEST, message: "Review not created!"} }
                );
        });
}


/**
 * Get a review by uuid
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getReview = async (req, res) => {
    const reviewUuid = uuidService.decodeUuid(req.params.uuid);

    if (!reviewUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid review uuid!"} });
    }

    const review = await Review.findOne({
        where: {
            uuid: reviewUuid
        }
    });

    if (review) {
        const reviewSerializer = new ReviewSerializer();
        return res.status(httpStatus.OK).json({
            ...{
                statusCode: httpStatus.OK,
                review: await reviewSerializer.serialize(review)
            }
        });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Review not found!"} });
}


/**
 * patch a review by uuid
 * @param {*} req
 * @param {*} res
 */

const patchReview = async (req, res) => {
    const reviewUuid = uuidService.decodeUuid(req.params.uuid);
    const { rating, text } = req.body;

    if (!reviewUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid review uuid!"} });
    }

    const review = await Review.findOne({
        where: {
            uuid: reviewUuid
        }
    });

    if (review) {
        review.rating = rating ? rating : review.rating;
        review.text = text ? text : review.text;

        await review.save()
            .then(async(review) => {
                const reviewSerializer = new ReviewSerializer();
                return res.status(httpStatus.OK).json({
                    ...{
                        statusCode: httpStatus.OK,
                        review: await reviewSerializer.serialize(review)
                    }
                });
            }
            )
            .catch(error => {
                console.log(error);
                return res.status(httpStatus.BAD_REQUEST).json(
                    { ...{statusCode: httpStatus.BAD_REQUEST, message: "Review not updated!"} }
                    );
            });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Review not found!"} });
}

/**
 * Delete a review by uuid
 * @param {*} req
 * @param {*} res
 * @returns
 */

const deleteReview = async (req, res) => {
    const reviewUuid = uuidService.decodeUuid(req.params.uuid);

    if (!reviewUuid) {
        return res.status(httpStatus.BAD_REQUEST).json({ ...{statusCode: httpStatus.BAD_REQUEST, message: "Invalid review uuid!"} });
    }

    const review = await Review.findOne({
        where: {
            uuid: reviewUuid
        }
    });

    const review_id = review.id;
    
    if (review) {
        await review.destroy()
            .then(async(review) => {
                
                const salonReview = await SalonReview.findOne({
                    where: {
                        reviewId: review_id
                    }
                });

                if (salonReview) {
                    await salonReview.destroy();
                }

                const productReview = await ProductReview.findOne({
                    where: {
                        reviewId: review_id
                    }
                });

                if (productReview) {
                    await productReview.destroy();
                }

                const subscriptionReview = await SubscriptionReview.findOne({
                    where: {
                        reviewId: review_id
                    }

                });

                if (subscriptionReview) {
                    await subscriptionReview.destroy();
                }

                return res.status(httpStatus.NO_CONTENT).json({
                    ...{
                        statusCode: httpStatus.NO_CONTENT,
                    }
                });
            }
            )
            .catch(error => {
                console.log(error);
                return res.status(httpStatus.BAD_REQUEST).json(
                    { ...{statusCode: httpStatus.BAD_REQUEST, message: "Review not deleted!"} }
                    );
            });
    }
    return res.status(httpStatus.NOT_FOUND).json({ ...{statusCode: httpStatus.NOT_FOUND, message: "Review not found!"} });
}



module.exports = {
    getSalonReviews,
    createSalonReview,
    getProductReviews,
    createProductReview,
    getSubscriptionReviews,
    createSubscriptionReview,
    getReview,
    patchReview,
    deleteReview
}