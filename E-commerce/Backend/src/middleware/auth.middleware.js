import { User } from "../model/user.model";
import { apiError } from "../utils/api-error";
import { asyncHandler } from "../utils/async-handler";
import jwt from "jsonwebtoken"


export const Protect = asyncHandler(async (req , res , next) => {
 try {
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "");
   
       if(!token){
           throw new apiError(400 , "Token is not found anauthorized request ");
       }
   
       const decodedToken = jwt.verify(token ,  process.env.ACCESS_TOKEN_SECRET)
   
       if(!decodedToken){
           throw new apiError(400 , "Not authorized token ");
       }
   
       const user = await User.findOne(decodedToken._id);
   
       if(!user){
           throw new apiError(400 , "user not found ")
       }
   
       req.user = user;
       next();
 } catch (error) {
    throw new apiError(500 , "somthing went wrong ")
 }
})


