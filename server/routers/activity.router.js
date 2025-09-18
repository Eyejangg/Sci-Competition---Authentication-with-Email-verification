import express from "express";
const router = express.Router();
import activityController from "../controllers/activity.controller.js";
import authJwt from "../middleware/authJwt.js";

// POST: สร้างกิจกรรม (admin, manager)
router.post(
  "/",
  authJwt.verifyToken,
  authJwt.isManager,
  activityController.create
);
// GET: ดูกิจกรรมทั้งหมด (admin, manager)
router.get(
  "/",
  authJwt.verifyToken,
  authJwt.isManager,
  activityController.getAll
);
// GET: ดูกิจกรรมตาม id (admin, manager)
router.get(
  "/:id",
  authJwt.verifyToken,
  authJwt.isManager,
  activityController.getById
);
// PUT: แก้ไขกิจกรรม (admin, manager)
router.put(
  "/:id",
  authJwt.verifyToken,
  authJwt.isManager,
  activityController.update
);
// DELETE: ลบกิจกรรม (admin เท่านั้น)
router.delete(
  "/:id",
  authJwt.verifyToken,
  authJwt.isAdmin,
  activityController.delete
);
// GET: ค้นหากิจกรรม (admin, manager)
router.get(
  "/search",
  authJwt.verifyToken,
  authJwt.isManager,
  activityController.searchActivity
);

export default router;
