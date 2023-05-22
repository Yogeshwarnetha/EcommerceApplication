import { Router, Request, Response } from 'express'
import Jwt from "jsonwebtoken";
import User from '../db/models/User';


const authRouter = Router()
// login
authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const reqData = req.body
        //adding validation
        if (!reqData.user_name || reqData.user_name.length === 0) {
            return res.status(400).send({
                message: "Please enter a user name"
            })
        }
        if (!reqData.password || reqData.password.length === 0) {
            return res.status(400).send({
                message: "Please enter a password"
            })
        }

        // check user already exist or not
        const checkUser = await User.findOne({ where: { user_name: reqData.user_name } })
        if (!checkUser) {
            return res.status(400).send({
                message: "User does not exist"
            })
        }
        if (!(checkUser.password === reqData.password)) {
            return res.status(400).send({
                message: "Password is incorrect"
            })
        }
        // generate access token
        const token = Jwt.sign(
            { id: checkUser.id, userName: checkUser.user_name,primaryProfile:checkUser.primary_profile   },

            process.env.TOKEN_SECRET || "",
            {
                expiresIn: "1h",
            }
        );
        return res.status(200).send({ message: "login successfully", access_token: token })
    }
    catch (error: any) {
        return res.status(500).send({ message: `error in creating a new user : ${error}` })
    }
})

export default authRouter