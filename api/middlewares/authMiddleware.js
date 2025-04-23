// jwt token verification

const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
  
    const token = req.cookies.token;

    if(!token) 
    {
        return res.status(401).json({ msg: "Unauthorized" });
    }
  
    try 
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch (error)
    {
        console.error(error);
        res.status(403);
        throw new Error('Unauthorized');
    }
};
  
module.exports = auth;