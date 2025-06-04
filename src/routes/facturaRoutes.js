import express from "express";
import * as facturaController from "../controllers/facturaController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateJWT);

router.get("/", facturaController.getAll);
//@ts-ignore
router.get("/:id", facturaController.getById);
//@ts-ignore
router.post("/", facturaController.create);
router.put("/:id", facturaController.update);
router.delete("/:id", facturaController.remove);

export default router;
