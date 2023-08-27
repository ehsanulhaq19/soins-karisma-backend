const auth = require('./auth')
const user = require('./user')
const userStatus = require('./userStatus')
const salon = require('./salon')
const salonStatus = require('./salonStatus')
const salonType = require('./salonType')
const role = require('./role')
const employee = require('./employee')
const businessService = require('./businessService')
const businessServiceEmployee = require('./businessServiceEmployee')
const employeeSchedule = require("./employeeSchedule")
const booking = require("./booking")
const bookingStatus = require("./bookingStatus")
const subscription = require("./subscription")
const subscriptionDuration = require("./subscriptionDuration")
const subscriptionStatus = require("./subscriptionStatus")
const product = require("./product")
const productStatus = require("./productStatus")
const userProduct = require("./userProduct")
const cart = require("./cart")
const cartStatus = require("./cartStatus")
const cartItem = require("./cartItem")
const cartItemStatus = require("./cartItemStatus")
const order = require("./order")
const orderStatus = require("./orderStatus")
const stripe = require("./stripe")
const productCollection = require("./productCollection")
const productCollectionStatus = require("./productCollectionStatus")
const question = require("./question")
const questionStatus = require("./questionStatus")
const questionType = require("./questionType")
const questionOption = require("./questionOption")
const questionOptionStatus = require("./questionOptionStatus")
const userAnswer = require("./userAnswer")
const employeeRole = require("./employeeRole")
const review = require("./review")
const customer = require("./customer")
const note = require("./note")
const userSubscription = require("./userSubscription")
const subscriptionCollection = require("./subscriptionCollection")
const subscriptionCollectionStatus = require("./subscriptionCollectionStatus")
const stripeCustomer = require("./stripeCustomer")
const address = require("./address")
const userType = require("./userType")

const media = require("./media")

module.exports = {
    auth,
    user,
    salon,
    salonStatus,
    salonType,
    employee,
    role,
    businessService,
    businessServiceEmployee,
    employeeSchedule,
    booking,
    bookingStatus,
    subscription,
    subscriptionDuration,
    subscriptionStatus,
    stripe,
    product,
    productStatus,
    userProduct,
    cart,
    cartStatus,
    cartItem,
    cartItemStatus,
    order,
    orderStatus,
    productCollection,
    productCollectionStatus,
    question,
    questionStatus,
    questionType,
    questionOption,
    questionOptionStatus,
    userAnswer,
    employeeRole,
    customer,
    note,
    review,
    media,
    userStatus,
    subscriptionCollection,
    subscriptionCollectionStatus,
    userSubscription,
    stripeCustomer,
    address,
    userType
}