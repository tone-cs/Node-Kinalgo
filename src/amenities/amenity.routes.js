import { Router } from "express";
import { check } from "express-validator";
import { amenityExists } from "../common/helpers/db-validators.js";
import { validateFields } from "../common/middlewares/validate-fields.js";
import { validateJWT } from "../common/middlewares/validate-jwt.js";
import { isAdmin } from "../common/middlewares/verify-admin.js";
import {
  createAmenity,
  deleteAmenity,
  listAmenities,
  getAmenityById,
  updateAmenity,
} from "./amenity.controller.js";

const router = Router();

router.get("/", validateJWT, isAdmin, listAmenities);

router.get("/:id", validateJWT, isAdmin, getAmenityById)

router.post(
  "/",
  validateJWT,
  isAdmin,
  [
    check("description")
      .notEmpty()
      .withMessage("The description cannot be empty"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("The description must have at least 5 characters"),
    check("description").custom(amenityExists),
    validateFields,
  ],
  createAmenity
);

router.put(
  "/:id",
  validateJWT,
  isAdmin,
  [
    check("description")
      .notEmpty()
      .withMessage("The description cannot be empty"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("The description must have at least 5 characters"),
    check("description").custom(amenityExists),
    validateFields,
  ],
  updateAmenity
);

router.delete("/:id", validateJWT, isAdmin, deleteAmenity);

export default router;
