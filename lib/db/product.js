import mongoose from "mongoose";
const productInfo = new mongoose.Schema(
  {
    Overview: { type: String, default: null },
    Features: { type: String, default: null },
    Specs: { type: String, default: null },
  },
  { _id: false }
);
const productReviewSchema = new mongoose.Schema(
  {
    username: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { _id: false }
);
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  productInfo: { type: productInfo, default: null },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  stock: { type: Number, default: 0 },
  review: { type: productReviewSchema, default: null },
  badge: { type: String, default: "Product" },
  image: { type: Object, default: null },
});

// Check if the model already exists to avoid overwriting it
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export { Product };
