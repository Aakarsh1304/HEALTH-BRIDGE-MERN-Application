import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getDoctorProfile,
  updateDoctorProfile,
  getAllDoctors,
} from "../controller/doctorController.js";

import {
  requestPatientAccess,
  getPatientMedicalHistory,
  approvePatientAccess,
  getPatientAccessRequests,
  rejectPatientAccess,
} from "../controller/doctorPatientController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAllDoctors
);
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("doctor"),
  updateDoctorProfile
);

router.post(
  "/patient-access",
  authMiddleware,
  roleMiddleware("doctor"),
  requestPatientAccess
);
router.get(
  "/patient/:patientId/medical-history",
  authMiddleware,
  roleMiddleware("doctor"),
  getPatientMedicalHistory
);  
router.put(
  "/patient-access/:accessId/approve",
  authMiddleware,
  roleMiddleware("patient"),
  approvePatientAccess
);
router.put(
  "/patient-access/:accessId/reject",
  authMiddleware,
  roleMiddleware("patient"),
  rejectPatientAccess
);
router.get(
  "/patient-access",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientAccessRequests
);

export default router;