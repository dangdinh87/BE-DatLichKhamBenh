const express = require('express');
const authRoute = require('./auth.route');
const patientRoute = require('./patient.route');
// const productRoute = require('./product.route');
// const productTypeRoute = require('./productType.route');
// const productCategoryRoute = require('./productCategory.route');
// const docsRoute = require('./docs.route');
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/patient',
    route: patientRoute
  }
  // {
  //   path: '/product',
  //   route: productRoute,
  // },
  // {
  //   path: '/product-type',
  //   route: productTypeRoute,
  // },
  // {
  //   path: '/product-category',
  //   route: productCategoryRoute,
  // }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
