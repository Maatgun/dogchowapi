import { Router } from "express"
import validarJWT from "../middlewares/validarJwt";
import { recolectarErrores } from "../middlewares/recolectarErrores";

import { check } from "express-validator";
import { getOrders, createOrder } from "../controllers/orders";
import { isVerified } from "../middlewares/validarVerificado";

const router = Router();

router.get("/",[validarJWT, recolectarErrores], getOrders);

router.post("/", [
    validarJWT,
    isVerified,
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
    check("items", "El array de productos es obligatorio").not().isEmpty(),
    recolectarErrores
],createOrder)

export default router;