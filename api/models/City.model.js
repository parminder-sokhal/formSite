import mongoose from "mongoose";
import BaseModelSchema from "./Base.model.js";

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ...BaseModelSchema.obj, // Inherit from BaseModel
});

const City = mongoose.model("City", CitySchema);
export default City;
