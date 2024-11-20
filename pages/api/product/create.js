import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/lib/db/product";
import { randomUUID } from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";
const storagePath = path.join(process.cwd(), "public/images");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, randomUUID() + path.extname(file.originalname)); // You should append the file extension
  },
  destination: (req, file, cb) => {
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, { recursive: true });
    }
    cb(null, storagePath);
  },
});

const upload = multer({ storage: storage });
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handle(req, res) {
  await connectToDatabase();
  if (req.method != "POST") {
    return res.json({ message: "method not allowed" });
  }

  try {
    await runMiddleware(req, res, upload.single("file")); // Handle single file upload
    if (!req.file) {
      console.log("Request Body:", req.body); // Debug body
      console.log("Request File:", req.file); // Debug file
      return res.json({ message: "no file uploaded" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
  try {
    const { name, description, price, discountedPrice } = req.body;
    const productInfo = JSON.parse(req.body.productInfo);

    const product = new Product({
      name,
      description,
      price,
      discountedPrice,
      image: req.file,
      productInfo,
    });
    await product.save();
    res.json({ message: "Product created successfully", data: product });
  } catch (error) {
    res.status(404).json({ message: error });
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
