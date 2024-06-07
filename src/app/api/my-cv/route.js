import dbConnect from "@/lib/dbConnect";
import { Resume } from "@/models/Resume.models";


export async function POST(request) {

    await dbConnect();
    
    const { name, email, address, portfolio, skills, education1, education2, experience1, experience2, project1, project2,
        certificate1, certificate2, languages, user} = await request.json();

    if (name === "" || email === "" || address === "") {
        return Response.json({ message: "All fields are required", success: false }, { status: 400 });
    }

    try {
        const oldResume = await Resume.findOne({ user: user });
        if (oldResume) {
            await Resume.deleteMany({ user: user });
        }
        const newResume = new Resume({
            name,
            email,
            address,
            portfolio,
            skills: skills.split(","),
            education1: {
                school: education1.school,
                degree: education1.degree,
                from: education1.from,
                to: education1.to
            },
            education2: {
                school: education2.school,
                degree: education2.degree,
                from: education2.from,
                to: education2.to
            },
            experience1: {
                company: experience1.company,
                position: experience1.position,
                from: experience1.from,
                to: experience1.to
            },
            experience2: {
                company: experience2.company,
                position: experience2.position,
                from: experience2.from,
                to: experience2.to
            },
            project1: {
                name: project1.name,
                description: project1.description
            },
            project2: {
                name: project2.name,
                description: project2.description
            },
            certificate1: {
                title: certificate1.title,
                issuedBy: certificate1.issuedBy
            },
            certificate2: {
                title: certificate2.title,
                issuedBy: certificate2.issuedBy
            },
            languages: languages.split(","),
            user: user
        });

        const savedResume = await newResume.save();

        return Response.json({ message: "Resume created successfully", success: true, data: savedResume }, { status: 200 });
    }
    catch (error) {
        console.log("Error while submitting user details", error);

        return Response.json({ message: "Something went wrong while submitting user details", success: false }, { status: 500 });
    }
};