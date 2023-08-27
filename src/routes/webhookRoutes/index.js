const express = require('express');
const routesV1 = require('./v1/index');
const router = express.Router();

//routes
const defaultRoutes = [
  {
    path: '/v1/',
    route: routesV1,
  },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;