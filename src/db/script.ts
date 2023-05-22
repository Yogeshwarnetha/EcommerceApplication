import { Op } from "sequelize"
import User from "./models/User"

export async function createAdminUser(){
    const username :string = "admin"
    const primaryProfile: number = 1
    const password :string = "admin@1234"
    const email :string = "admin@gmail.com"
    //check if admin exist or not if admin exist it exist funcation else create admin record
    const existingAdminCredentialCount = await User.count({
        where:{ 
            [Op.or]: [
                {user_name: username}]}})
    
    if(existingAdminCredentialCount > 0){
        return;
    }
    // create object for admin record
    const adminCredential = {
        user_name : username,
        password : password,
        primary_profile: primaryProfile,
        email:email,
        is_deleted: false

    }
    //creating admin record query
    await User.create(adminCredential)
}
