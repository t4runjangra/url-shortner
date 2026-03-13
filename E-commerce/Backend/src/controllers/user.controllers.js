// import {User} from "../models/user.model.js";
import {User} from "../model/user.model.js"
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import {ApiError} from "../utils/api-error.js"
import { options } from "../constant.js";
// import { CreateUser } from "../../../../URL shortener/backend/src/controllers/user.controller.js";

export const generateAccessTokenAndRefreshToken = async (id) => {
  const user = await User.findById(id);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const registerUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, mobileno, address, email, password } = req.body;

    if (!firstname || !mobileno ||  !email || !password) {
        return res.status(400).json({ message: "Required fields are missing" });
    }

    const userExists = await User.findOne({
        $or: [{ email },  { mobileno }]
    });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }


    const user = await User.create({
        firstname,
        lastname,
        mobileno,
        address: {
            state: address?.state,
            city: address?.city,
            pincode: address?.pincode,
            street: address?.street
        },
        email,
        password
    });

     const {accessToken , refreshToken} = await generateAccessTokenAndRefreshToken(user._id);

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    const options = {
        httpOnly: true,     
        secure: true
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            message: "User registered successfully",
            user: createdUser
        });
});

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password , mobileno } = req.body;
       if(!email && !mobileno){
        throw new ApiError(400 , "Email or Mobile number is required");
       }
         if(!password){
        throw new ApiError(400 , "Password is required");
       }
        const user = await User.findOne({ $or: [{ email }, { mobileno }] });
        if(!user) {
            throw new ApiError(404 , "User not found");
        }
         const PasswordCheck = await user.isPassworCorrect(password);
            
             if(!PasswordCheck){
                 return res.status(400).json({message : "Password and Username is not correct :( "})
             }
         
             const {accessToken , refreshToken} = await generateAccessTokenAndRefreshToken(user._id);
        const logginUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" , refreshToken , options)
     .json( new ApiResponse(
        200,
        {
            user: logginUser , accessToken , refreshToken
        },
        "User logged in Successfully"
    )) 

    } catch (error) {
        throw new ApiError(500 , error.message);
    }
}); 


