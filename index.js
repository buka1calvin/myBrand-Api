import express from "express"
import { set, connect } from "mongoose"
import router from "./vscode/routes/routes.js"
import cookieParser from "cookie-parser"
import passport from "passport";
import { jwtStrategy} from "./vscode/routes/middlewares/passports.js";
import dotenv from "dotenv"
dotenv.config()
set('strictQuery', true)
const app = express()
connect("mongodb+srv://Buka-Dev:DestructorX@buka-devapps.lyhjr8f.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		
		app.use(express.json())
		passport.use(jwtStrategy);
        app.use(passport.initialize());
		app.use("/api/v1",router)
		app.listen(5000, () => {
			 console.log("Server has started!")
		}
		)
		
	})
	export default app
	
