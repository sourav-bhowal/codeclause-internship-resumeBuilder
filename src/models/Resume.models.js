import { School } from "lucide-react";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
    },
    address: {
        type: String,
    },
    portfolio: {
        type: String,
    },
    skills: [
        {
            type: String,
            required: [true, "Please provide a skill"],
        }
    ],
    education1: {
        type: {
            school: {
                type: String,
            },
            degree: {
                type: String,
            },
            from: {
                type: String,
            },
            to: {
                type: String,
            },
        },
        required: [true, "Please provide an education"],
    },
    education2: {
        type: {
            school: {
                type: String,
            },
            degree: {
                type: String,
            },
            from: {
                type: String,
            },
            to: {
                type: String,
            },
        }
    },
    experience1: {
        type: {
            company: {
                type: String,
            },
            position: {
                type: String,
            },
            from: {
                type: String,
            },
            to: {
                type: String,
            },
        },
        required: [true, "Please provide an experience"],
    },
    experience2: {
        type: {
            company: {
                type: String,
            },
            position: {
                type: String,
            },
            from: {
                type: String,
            },
            to: {
                type: String,
            },
        },
        required: [true, "Please provide an experience"],
    },
    project1: {
        type: {
            name: {
                type: String,
            },
            description: {
                type: String,
            },
        }
    },
    project2: {
        type: {
            name: {
                type: String,
            },
            description: {
                type: String,
            },
        }
    },
    certificate1: {
        type: {
            title: {
                type: String,
            },
            issuedBy: {
                type: String,
            },
        },
    },
    certificate2: {
        type: {
            title: {
                type: String,
            },
            issuedBy: {
                type: String,
            },
        },
    },
    languages: [
        {
        type: String,
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
});


export const Resume = mongoose.models.resume || mongoose.model("resume", resumeSchema);