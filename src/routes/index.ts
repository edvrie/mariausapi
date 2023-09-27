import { Router } from "express";
import ExampleSchema from "../schemas/exampleShema";

const router = Router();

router.get("/", (req, res) => {
  console.log("Hello from home.");
  res.sendStatus(200);
});

router.post("/test", async (req, res, next) => {
  try {
    const test = new ExampleSchema(req.body);
    console.log(test);
    await test.save();
    res.sendStatus(200);
  } catch (err) {
    console.log("AAAAAAAAAAA");
  }
});

export default router;
