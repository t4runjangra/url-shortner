
export const ValidateUrl = async (req , res , next) => {
    const {originalUrl} = req.body;
    
    if(!originalUrl || originalUrl === "" ){
        return res.status(400).json({message : "orignal url is required " , });
    }

    try {
        const newUrl = new URL(originalUrl.trim());

        if(!["http:" , "https:"].includes(newUrl.protocol)){
            return res.status(400).json({message : "Invalid Protocal"});
        }

        const hostname = newUrl.hostname;

        if(hostname === "localhost" || hostname.startsWith("122.") || hostname.startsWith("192.169.") || hostname.startsWith("10.")){
             return res.status(400).json({ message: "Local URL are not allowed" });
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid URL format" });
    }
}
