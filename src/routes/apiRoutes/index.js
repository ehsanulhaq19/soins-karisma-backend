const express = require('express');
const routesV1 = require('./v1/index');
const router = express.Router();
const path = require('path');

//routes
const defaultRoutes = [
  {
    path: '/v1/',
    route: routesV1,
  }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

router.get('/order/email_template',function(req,res) {
  res.sendFile(path.resolve(__dirname + '../../../views/email/order/checkout.html'));
});

router.get('/subscription/email_template',function(req,res) {
  res.sendFile(path.resolve(__dirname + '../../../views/email/subscription/checkout.html'));
});

module.exports = router;