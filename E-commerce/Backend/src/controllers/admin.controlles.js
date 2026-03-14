// import { Product } from "../models/product.model.js";
import {Product} from "../model/Product.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProduct = async (req, res) => {

  const { name, price, description , brandLink , discountPrice , category , brand , stock ,ratings , numReviews ,  } = req.body;

  if (!name || !price  || !description || !category || !stock ) {
    return res.status(400).json({
      message: "All filed are required",
    });
  }

  // COVER IMAGE
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!coverImageLocalPath) {
    return res.status(400).json({
      message: "Cover image is required",
    });
  }

  const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImageUpload) {
    return res.status(500).json({
      message: "Cover image upload failed",
    });
  }

  // MULTIPLE IMAGES
  let productImages = [];

  if (req.files?.images) {

    for (const file of req.files.images) {

      const result = await uploadOnCloudinary(file.path);

      if (result) {
        productImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
  }

  const product = await Product.create({
    name,
    price,
    description,
    brandLink,
    discountPrice ,
    category,
    brand,
    stock,
    ratings,
    numReviews,
    coverImage: coverImageUpload.secure_url,
    images: productImages,
  });

  return res.status(201).json({
    message: "Product created successfully",
    product,
  });
};