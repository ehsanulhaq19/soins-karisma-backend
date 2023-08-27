const components = require('./components/index')
const error = require('./error')

function getComponentDocs() {
    return {
        components: {
            schemas: {
                ...components.user.schemas,
                ...components.userStatus.schemas,
                ...components.userType.schemas,
                ...components.salon.schemas,
                ...components.salonStatus.schemas,
                ...components.salonType.schemas,
                ...components.employeeRole.schemas,
                ...components.employee.schemas,
                ...components.businessService.schemas,
                ...components.businessServiceEmployee.schemas,
                ...components.employeeSchedule.schemas,
                ...components.booking.schemas,
                ...components.bookingStatus.schemas,
                ...components.role.schemas,
                ...components.subscription.schemas,
                ...components.subscriptionDuration.schemas,
                ...components.subscriptionStatus.schemas,
                ...components.subscriptionCollection.schemas,
                ...components.subscriptionCollectionStatus.schemas,
                ...components.product.schemas,
                ...components.productStatus.schemas,
                ...components.productCollection.schemas,
                ...components.productCollectionStatus.schemas,
                ...components.cart.schemas,
                ...components.cartStatus.schemas,
                ...components.cartItem.schemas,
                ...components.cartItemStatus.schemas,
                ...components.order.schemas,
                ...components.orderStatus.schemas,
                ...components.question.schemas,
                ...components.questionStatus.schemas,
                ...components.questionType.schemas,
                ...components.questionOption.schemas,
                ...components.questionOptionStatus.schemas,
                ...components.userAnswer.schemas,
                ...components.employeeRole.schemas,
                ...components.review.schemas,
                ...components.note.schemas,
                ...components.media.schemas,
                ...components.address.schemas,
                ...components.userSubscription.schemas,
                ...error.schemas
            },
            securitySchemes: {
                apiKey: {
                    type: "apiKey",
                    description: "Value for the Authorization header parameter.",
                    name: "Authorization",
                    in: "header"
                }
            }
        },
        paths: {
            ...components.auth.paths,
            ...components.user.paths,
            ...components.userStatus.paths,
            ...components.salon.paths,
            ...components.salonStatus.paths,
            ...components.employee.paths,
            ...components.customer.paths,
            ...components.employeeRole.paths,
            ...components.businessService.paths,
            ...components.businessServiceEmployee.paths,
            ...components.employeeSchedule.paths,
            ...components.booking.paths,
            ...components.bookingStatus.paths,
            ...components.role.paths,
            ...components.subscription.paths,
            ...components.subscriptionCollection.paths,
            ...components.stripe.paths,
            ...components.stripeCustomer.paths,
            ...components.product.paths,
            ...components.productCollection.paths,
            ...components.userProduct.paths,
            ...components.cart.paths,
            ...components.cartItem.paths,
            ...components.order.paths,
            ...components.question.paths,
            ...components.questionStatus.paths,
            ...components.questionType.paths,
            ...components.questionOption.paths,
            ...components.questionOptionStatus.paths,
            ...components.userAnswer.paths,
            ...components.note.paths,
            ...components.review.paths,
            ...components.media.paths,
            ...components.userSubscription.paths
        },
    }
    
}

module.exports = getComponentDocs()