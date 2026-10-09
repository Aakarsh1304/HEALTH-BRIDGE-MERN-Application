import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";

const router = express.Router();


// Patient books appointment
router.post(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  createAppointment
);


// Patient views appointments
router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientAppointments
);


// Doctor views appointments
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorAppointments
);


// Doctor updates appointment status
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("doctor"),
  updateAppointmentStatus
);


export default router;