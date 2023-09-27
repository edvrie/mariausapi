import mongoose, { Model, Schema } from "mongoose";
import { IDocument } from "./generics";

interface IAnnualData {
  Revenue: number;
  netIncome: number;
  fcf: number;
  sharesOutstanding: number;
  netPurchase: number;
}

const exampleSchema = new Schema<IAnnualData>({
  Revenue: { type: Number, required: true },
  netIncome: { type: Number, required: true },
  fcf: { type: Number, required: true },
  sharesOutstanding: { type: Number, required: true },
  netPurchase: { type: Number, required: true },
});

const ExampleData = new Schema<IDocument<IAnnualData>>({
  annualData: {
    type: Map,
    of: exampleSchema,
    required: true,
  },
});

exampleSchema.virtual("id").get(function () {
  return this._id;
});

exampleSchema.set("toObject", {
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id;
  },
});

const ExampleSchema: Model<IDocument<IAnnualData>> = mongoose.model(
  "Example Schema",
  ExampleData
);

export default ExampleSchema;
