import {User} from "@/models/User.models";
import dbConnect from "@/lib/dbConnect";
import { Resume } from "@/models/Resume.models";

export async function GET(request, { params }) {

    const userId = params.userid;

    await dbConnect();

    try {
        const user = await User.findById({ _id: userId });

        if (!user) {
            return Response.json({ success: false, message: "User not found" }, { status: 404 });
        }

        const resume = await Resume.findOne({ user: userId });

        if (!resume) {
            return Response.json({ success: false, message: "Resume not found" }, { status: 404 });
        }

        return Response.json({ success: true, data: resume, message: "Resume fetched successfully" }, { status: 200 });
    } 
    catch (error) {
        return Response.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
};