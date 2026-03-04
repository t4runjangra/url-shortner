
export const adminVerify = async (req , res , next) => {
    if(!req.user){
        return res.status(401).json({message : "unauthorized request "});
    }
    if(req.user.role !== "admin"){
        return res.status(403).json({message : "this is only for admin "});
    }

    next()
}