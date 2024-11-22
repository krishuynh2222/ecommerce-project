//add those API WHERE WE NEED THE ADMIN PERMISSION 
    //LIKE ADDING PRODUCT REMOVING PRODUCT\
import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        
        //get the token friom the users req header
        const {token} = req.headers

        //check if the tioken is available - we will continue
        if (!token) {
             //return this res then this execution will stopped
            return res.json({success:false, message:"Not Authorized login Again"}) 

        } 
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            //check decode token === adminemail + adminpassword -> it will be verified
             //we will genertate one response that our user is not authorized to access API
            if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
                return res.json({success:false, message:"Not Authorized login Again"}) 
            } 
            next()
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

export default adminAuth