import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  uploadMedicalReport,
  getPatientReports,
  getMedicalReport,
  deleteMedicalReport,
} from "../controller/medicalReportController.js";

const router = express.Router();

// Patient uploads report
router.post(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  upload.single("file"),
  uploadMedicalReport
);

// Patient views own reports
router.get(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientReports
);

// Get single report
router.get(
  "/:id",
  authMiddleware,
  getMedicalReport
);

// Patient deletes own report
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("patient"),
  deleteMedicalReport
);

export default router;