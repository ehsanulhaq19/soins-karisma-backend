const httpStatus = require('http-status');
const express = require('express');
const router = express.Router();
//routes
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const userStatusRoutes = require('./userStatusRoutes');
const salonRoutes = require('./salonRoutes');
const roleRoutes = require('./roleRoutes');
const businessServiceRoutes = require('./businessServiceRoutes');
const businessServiceEmployeeRoutes = require('./businessServiceEmployeeRoutes');
const employeeRoutes = require('./employeeRoutes');
const employeeRoleRoutes = require('./employeeRoleRoutes');
const employeeScheduleRoutes = require('./employeeScheduleRoutes');
const bookingRoutes = require('./bookingRoutes');
const bookingStatusRoutes = require('./bookingStatusRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const subscriptionCollectionRoutes = require('./subscriptionCollectionRoutes')
const stripePaymentRoutes = require('./stripePaymentRoutes');
const stripeCustomerRoutes = require('./stripeCustomerRoutes');
const productRoutes = require('./productRoutes');
const userProductRoutes = require('./userProductRoutes');
const cartRoutes = require('./cartRoutes');
const cartItemRoutes = require('./cartItemRoutes');
const orderRoutes = require('./orderRoutes');
const productCollectionRoutes = require('./productCollectionRoutes');
const questionRoutes = require('./questionRoutes');
const questionStatusRoutes = require('./questionStatusRoutes');
const questionTypeRoutes = require('./questionTypeRoutes');
const questionOptionRoutes = require('./questionOptionRoutes');
const questionOptionStatusRoutes = require('./questionOptionStatusRoutes');
const userAnswerRoutes = require('./userAnswerRoutes');
const reviewRoutes = require('./reviewRoutes');
const customerRoutes = require('./customerRoutes');
const noteRoutes = require('./noteRoutes');
const mediaRoutes = require('./mediaRoutes');
const userSubscriptionRoutes = require('./userSubscriptionRoutes');
//middlewares
const authValidator = require("../../../middlewares/v1/validators/authValidator")
const userValidator = require("../../../middlewares/v1/validators/userValidator")
const salonValidator = require("../../../middlewares/v1/validators/salonValidator")
const subscriptionValidator = require("../../../middlewares/v1/validators/subscriptionValidator")
const subscriptionCollectionValidator = require("../../../middlewares/v1/validators/subscriptionCollectionValidator")
const employeeValidator = require("../../../middlewares/v1/validators/employeeValidator")
const employeeRoleValidator = require("../../../middlewares/v1/validators/employeeRoleValidator")
const employeeScheduleValidator = require("../../../middlewares/v1/validators/employeeScheduleValidator")
const businessServiceValidator = require("../../../middlewares/v1/validators/businessServiceValidator")
const bookingValidator = require("../../../middlewares/v1/validators/bookingValidator")
const stripePaymentValidator = require("../../../middlewares/v1/validators/stripePaymentValidator")
const stripeCustomerValidator = require("../../../middlewares/v1/validators/stripeCustomerValidator")
const businessServiceEmployeeValidator = require("../../../middlewares/v1/validators/businessServiceEmployeeValidator")
const authMiddleware = require("../../../middlewares/v1/auth/authMiddleware")
const productValidator = require("../../../middlewares/v1/validators/productValidator")
const productCollectionValidator = require("../../../middlewares/v1/validators/productCollectionValidator")
const userProductValidator = require("../../../middlewares/v1/validators/userProductValidator")
const cartValidator = require("../../../middlewares/v1/validators/cartValidator")
const cartItemValidator = require("../../../middlewares/v1/validators/cartItemValidator")
const orderValidator = require("../../../middlewares/v1/validators/orderValidator")
const questionValidator = require("../../../middlewares/v1/validators/questionValidator")
const questionOptionValidator = require("../../../middlewares/v1/validators/questionOptionValidator")
const userAnswerValidator = require("../../../middlewares/v1/validators/userAnswerValidator")
const reviewValidator = require("../../../middlewares/v1/validators/reviewValidator")
const customerValidator = require("../../../middlewares/v1/validators/customerValidator")
const noteValidator = require("../../../middlewares/v1/validators/noteValidator")
const userSubscriptionValidator = require("../../../middlewares/v1/validators/userSubscriptionValidator")
//swagger docs
const swaggerDocument = require('../../../docs/v1/index.js');
//api configurations
const apiConfig = require("../../../constants/apiConfig.json")

router.get('/docs.json', (req, res) => {
    return res.status(httpStatus.OK).json(swaggerDocument);
});

const defaultRoutes = [
    {
        path: '/',
        route: authRoutes,
        middleware: [authValidator]
    },
    {
        path: '/users',
        route: userRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer',
                    'salon'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'customer'
                ],
                [apiConfig.roles['POST']]: [
                    'admin'
                ],
            })
            , userValidator
        ]
    },
    {
        path: '/user_statuses',
        route: userStatusRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'employee',
                    'salon',
                    'customer'
                ],
            })
        ]
    },
    {
        path: '/salons',
        route: salonRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'salon'
                ],
                [apiConfig.roles['POST']]: [
                    'admin'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin',
                    'salon'
                ],
            }),
            salonValidator
        ]
    },
    {
        path: '/employees',
        route: employeeRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'customer',
                ],
                [apiConfig.roles['POST']]: [
                    'admin',
                    'salon'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin',
                    'salon'
                ],

                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'salon',
                    'employee'
                ],
            }),
            employeeValidator
        ]
    },
    {
        path: '/employee_roles',
        route: employeeRoleRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee'
                ],
                [apiConfig.roles['POST']]: [
                    'admin',
                    'salon'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'salon'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin',
                    'salon'
                ],
            }),
            employeeRoleValidator
        ]
    },
    {
        path: '/employee_schedules',
        route: employeeScheduleRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee',
                    'customer'
                ],
                [apiConfig.roles['POST']]: [
                    'admin',
                    'salon',
                    'employee'
                ],
            }),
            employeeScheduleValidator
        ]
    },
    {
        path: '/roles',
        route: roleRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon'
                ],
            }),
        ]
    },
    {
        path: '/business_service_employees',
        route: businessServiceEmployeeRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['POST']]: [
                    'admin',
                    'salon',
                ],
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee',
                    'customer'
                ],
            }),
            businessServiceEmployeeValidator
        ]
    },
    {
        path: '/business_services',
        route: businessServiceRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['POST']]: [
                    'admin',
                    'salon'
                ],
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'customer'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'salon'
                ],
            }),
            businessServiceValidator
        ]
    },
    {
        path: '/bookings',
        route: bookingRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['POST']]: [
                    'admin',
                    'salon',
                    'customer'
                ],
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'customer'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin',
                    'salon',
                    'customer',
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'salon',
                    'customer',
                ],
            }),
            bookingValidator
        ]
    },
    {
        path: '/booking_statuses',
        route: bookingStatusRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'employee',
                    'salon',
                    'customer'
                ],
            })
        ]
    },
    {
        path: '/subscriptions',
        route: subscriptionRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['POST']]: [
                    'admin'
                ],
            }),
            subscriptionValidator
        ]
    },
    {
        path: '/subscription_collections',
        route: subscriptionCollectionRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['POST']]: [
                    'admin'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin'
                ],
            }),
            subscriptionCollectionValidator
        ]
    },
    {
        path: '/stripe',
        route: stripePaymentRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['POST']]: [
                    'customer',
                    'guest'
                ]
            }),
            stripePaymentValidator
        ]
    },
    {
        path: '/stripe_customer',
        route: stripeCustomerRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'customer',
                    'guest'
                ]
            }),
            stripeCustomerValidator
        ]
    },
    {
        path: '/products',
        route: productRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin'
                ],
                [apiConfig.roles['POST']]: [
                    'admin'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin'
                ],
            }),
            productValidator
        ]
    },
    {
        path: '/product_collections',
        route: productCollectionRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin'
                ],
                [apiConfig.roles['POST']]: [
                    'admin'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin'
                ],
            }),
            productCollectionValidator
        ]
    },
    {
        path: '/user_products',
        route: userProductRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer'
                ],
            }),
            userProductValidator
        ]
    },
    {
        path: '/carts',
        route: cartRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['POST']]: [
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin',
                    'customer',
                    'guest'
                ],
            }),
            cartValidator
        ]
    },
    {
        path: '/cart_items',
        route: cartItemRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['POST']]: [
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin',
                    'customer',
                    'guest'
                ],
            }),
            cartItemValidator
        ]
    },
    {
        path: '/orders',
        route: orderRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer',
                    'guest'
                ],
                [apiConfig.roles['POST']]: [
                    'admin',
                    'customer'
                ],
            }),
            orderValidator
        ]
    },
    {
        path: '/questions',
        route: questionRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin'
                ],
                [apiConfig.roles['POST']]: [
                    'admin'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin'
                ],
            }),
            questionValidator
        ]
    },
    {
        path: '/question_options',
        route: questionOptionRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer'
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin'
                ],
                [apiConfig.roles['POST']]: [
                    'admin'
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin'
                ],
            }),
            questionOptionValidator
        ]
    },
    {
        path: '/user_answers',
        route: userAnswerRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['POST']]: [
                    'customer'
                ],
                [apiConfig.roles['DELETE']]: [
                    'customer'
                ],
            }),
            userAnswerValidator
        ]
    },
    {
        path: '/question_statuses',
        route: questionStatusRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer',
                    'employee',
                    'customer'
                ],
            })
        ]
    },
    {
        path: '/question_types',
        route: questionTypeRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer',
                    'employee',
                    'customer'
                ],
            })
        ]
    },
    {
        path: '/question_option_statuses',
        route: questionOptionStatusRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer',
                    'employee',
                    'customer'
                ],
            })
        ]
    },
    {

        path: '/customers',
        route: customerRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon'
                ],
            }),
            customerValidator
        ]
    },
    {
        path: '/review',
        route: reviewRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                    'admin',
                    'salon',
                    'employee',
                ],
                [apiConfig.roles['PATCH']]: [
                    'admin',
                    'salon',
                    'employee',
                ],
                [apiConfig.roles['POST']]: [
                    'admin',
                    'salon',
                    'employee',
                ],
                [apiConfig.roles['DELETE']]: [
                    'admin',
                    'salon',
                    'employee',
                ],
            }),
            reviewValidator
        ]
    },
    {
        path: '/notes',
        route: noteRoutes,
        noteValidator,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['GET']]: [
                'admin',
                'customer',
                'guest',
            ],
            [apiConfig.roles['PATCH']]: [
                'admin',
                'customer',
                'guest',
            ],
            [apiConfig.roles['POST']]: [
                'admin',
                'customer',
                'guest',
            ],
            [apiConfig.roles['DELETE']]: [
                'admin',
                'customer',
                'guest',
            ],
        }),
        noteValidator,
        ]
    },
    {
        path: '/media',
        route: mediaRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['POST']]: [
                    'admin',
                    'salon',
                    'customer'
                ],
            }),
        ]
    },
    {
        path: '/user_subscriptions',
        route: userSubscriptionRoutes,
        middleware: [
            (req, res, next) => authMiddleware(req, res, next, {
                [apiConfig.roles['POST']]: [
                    'admin',
                    'customer',
                ],
                [apiConfig.roles['GET']]: [
                    'admin',
                    'customer',
                    'guest'
                ]
            }),
            userSubscriptionValidator
        ]
    },
];

defaultRoutes.forEach((route) => {
    const { middleware } = route
    if (middleware && middleware.length) {
        middleware.forEach(middlewareFunction => {
            router.use(route.path, middlewareFunction);
        })
    }
    router.use(route.path, route.route);
});

module.exports = router