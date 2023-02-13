import signUp from "../../../models/signUp.js";
import  jwt  from "jsonwebtoken";
const isAdmin = async (req, res, next) => {
    try {
      const token =req.headers.token.split(' ')[1];

      const decodedToken=jwt.verify(token,process.env.TOKEN_KEY);
        const Adminaccess = await signUp.findOne({_id:decodedToken.id,role: "admin" });
        console.log(Adminaccess);
        if(!Adminaccess) {
            return res
                .status(401)
                .json({ message: "only admins allowed" });
        }
        next();
    } catch (error) {
        res.status(500).json(error);
    }
};
export default isAdmin