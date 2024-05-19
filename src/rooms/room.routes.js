import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../common/middlewares/validate-fields.js";
import { validateJWT } from "../common/middlewares/validate-jwt.js";
import { isAdmin } from "../common/middlewares/verify-admin.js";
import {
  createRoom,
  deactivateRoom,
  editRoom,
  getRoomById,
  listRooms,
} from "./room.controller.js";

const router = Router();
router.get("/", validateJWT, isAdmin, listRooms);

router.get("/:id", validateJWT, isAdmin, getRoomById);

router.post(
  "/",
  validateJWT,
  isAdmin,
  [
    check("room_number", "the room number can't be empty").not().isEmpty(),
    check("type", "the type cannot be empty").not().isEmpty(),
    check("capacity", "the capacity cannot be empty").not().isEmpty(),
    check("price_per_night", "the price per night cannot be empty")
      .not()
      .isEmpty(),
    check("hotel", "the hotel cannot be empty").not().isEmpty(),
    validateFields,
  ],
  createRoom
);

router.put(
  "/:id",
  validateJWT,
  isAdmin,
  [
    check("room_number", "the room number can't be empty")
      .optional()
      .not()
      .isEmpty(),
    check("type", "the type cannot be empty").optional().not().isEmpty(),
    check("capacity", "the capacity cannot be empty")
      .optional()
      .not()
      .isEmpty(),
    check("price_per_night", "the price per night cannot be empty")
      .optional()
      .not()
      .isEmpty(),
    check("hotel", "the hotel cannot be empty").optional().not().isEmpty(),
    validateFields,
  ],
  editRoom
);

router.patch("/:id", validateJWT, isAdmin, deactivateRoom);

export default router;
