const express = require("express");
const authRoute = require("./auth.route");
const scheduleRoute = require("./schedule.route");
const timeSlotRoute = require("./timeSlot.route");
const patientRoute = require("./patient.route");
const doctorRoute = require("./doctor.route");

const router = express.Router();

const defaultRoutes = [{
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
  {
    path: "/patient",
    route: patientRoute,
  },
  {
    path: "/doctor",
    route: doctorRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;