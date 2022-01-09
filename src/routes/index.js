const express = require("express");
const authRoute = require("./auth.route");
const scheduleRoute = require("./schedule.route");
const timeSlotRoute = require("./timeSlot.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/schedule",
    route: scheduleRoute,
  },
  {
    path: "/time-slot",
    route: timeSlotRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
