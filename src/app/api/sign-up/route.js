import dbConnect from "@/lib/dbConnect";
import {User} from "@/models/User.models";
import bcrypt from "bcryptjs";


export async function POST(request) {

    await dbConnect();

    try {
        const { username, email, password } = await request.json(); 
        
        if (!username || !email || !password) {
            return Response.json({message: "All fields are required", success: false}, {status: 400});
        }
        
        const exsitingUser = await User.findOne({ username });

        if (exsitingUser) {
            return Response.json({message: "User already exists", success: false}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });

        const savedUser = await newUser.save();

        return Response.json({message: "User created successfully", success: true, data: savedUser}, {status: 200});
    } 
    catch (error) {
        console.log("Error while creating user", error);
        return Response.json({message: "Something went wrong while creating user", success: false}, {status: 500});
    }
};