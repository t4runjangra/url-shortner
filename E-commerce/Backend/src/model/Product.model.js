import mongoose , {Schema} from "mongoose";

const ProductModel = new Schema({
   name : {
    type : String,
    required : true
   } ,
   description : {
    type : String,
    required : true
   } ,
   bought : {
    type : String,
   },
   brandLink : {
    type : String
   },
   price : {
    type : String,
    required : true
   } ,
   discountPrice : {
    type : String,
   } ,
   category : {
    type : String,
    required : true
   } ,
   brand : {
    type : String,
    // required : true
   } ,
   stock : {
    type : String,
    required : true
   } ,
   coverImage : {
    type : String,
    required : true,
   },
   images: [
      {
        url: String,
        public_id: String,
      },
    ],
   ratings : {
    type : String,
    // required : true
   } ,
   numReviews : {
    type : String,
    // required : true
   } ,

  //  createdBy : {
  //   type : String,
  //   required : true
  //  } ,
   
} , {timestamps : true})

export const Product = mongoose.model("Product" , ProductModel)
