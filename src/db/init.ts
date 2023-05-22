import User from "./models/User";
import { createAdminUser } from "./script";

const isDev = true
const dbInit = async () => {
    await User.sync({ alter: isDev });

    await createAdminUser()

}


export default dbInit