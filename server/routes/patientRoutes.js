import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getPatientProfile,
  updatePatientProfile,
  addMedicalHistory,
  getMedicalHistory,
} from "../controller/patientController.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("patient"),
  updatePatientProfile
);

router.post(
  "/medical-history",
  authMiddleware,
  roleMiddleware("patient"),
  addMedicalHistory
);

router.get(
  "/medical-history",
  authMiddleware,
  roleMiddleware("patient"),
  getMedicalHistory
);

export default router;