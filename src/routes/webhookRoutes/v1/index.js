const express = require('express');
const router = express.Router();
const stripeWebhookRoute = require("./stripeWebhookRoute")

const defaultRoutes = [
    {
        path: '/stripe',
        route: stripeWebhookRoute
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router