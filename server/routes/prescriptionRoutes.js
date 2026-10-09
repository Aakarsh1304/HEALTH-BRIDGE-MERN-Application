import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  createPrescription,
  getPatientPrescriptions,
  getDoctorPrescriptions,
} from "../controller/prescriptionController.js";

const router = express.Router();

// Doctor creates prescription
router.post(
  "/",
  authMiddleware,
  roleMiddleware("doctor"),
  createPrescription
);

// Patient views own prescriptions
router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientPrescriptions
);

// Doctor views prescriptions created by them
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorPrescriptions
);

export default router;