import { Router } from "express";

const router = Router();

router.get("/foo", (req, res) => {
  console.log("Hello from home.");
  res.sendStatus(200);
});

export default router;
