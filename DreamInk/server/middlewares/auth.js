import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => 
{
    const {token} = req.headers;
    if(!token)
    {
        return res.status(401).json({success: false, message: "Unauthorized: No token provided"});
    }
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id)
        {
            req.userId = tokenDecode.id;
        }
        else{
            return res.status(401).json({success: false, message: "Unauthorized: Invalid token"});
        }
        next();
    }
    catch(error)
    {
        console.log(error)
        return res.status(401).json({success: false, message: "Unauthorized: Token verification failed"});
    
    }
};

export default userAuth;