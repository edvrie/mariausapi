import { NextFunction, Request, Response, Router } from "express";
import ExampleSchema from "../schemas/exampleShema";
import { RequestError } from "../utils/errorHandlers";

const router = Router();

router.get("/", (_: never, res: Response) => {
  console.log("Hello from home.");
  res.sendStatus(200);
});

router.post(
  "/test",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const test = new ExampleSchema(req.body);
      await test.save();
      res.sendStatus(200);
      return;
    } catch (err) {
      next(RequestError.InternalError(err.message));
      return;
    }
  }
);

router.get("/test", async (_: never, res: Response, next: NextFunction) => {
  try {
    const test = await ExampleSchema.find({});
    console.log(test);
    res.status(200).json(test);
    return;
  } catch (err) {
    next(RequestError.InternalError(err.message));
    return;
  }
});

router.get(
  "/test/:id",
  async (req: Request, res: Response, next: NextFunction) => {}
);

router.put(
  "/test/:id",
  async (req: Request, res: Response, next: NextFunction) => {}
);

router.delete(
  "/test/:id",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default router;
