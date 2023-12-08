import { Router } from "express";
import * as auth from "../controllers/auth";

const router = Router();

router.post("/login", auth.login);

router.get("/ping", auth.validate , (req, res) => res.json({ pong: true , admin: true }));

router.get("/events", auth.validate , )

export default router;
