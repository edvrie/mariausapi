import { Router } from "express";
import ExampleSchema from "../schemas/exampleShema";
import { RequestError } from "../utils/errorHandlers";

const router = Router();

router.get("/", (req, res) => {
  console.log("Hello from home.");
  res.sendStatus(200);
});

router.post("/test", async (req, res, next) => {
  try {
    const test = new ExampleSchema(req.body);
    await test.save();
    res.sendStatus(200);
    return;
  } catch (err) {
    next(RequestError.InternalError(err.message));
    return;
  }
});

export default router;
