"use client"
import { useState} from 'react'
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from 'axios';
import { useSession } from 'next-auth/react'


const CvBuild = () => {

    const { data: session } = useSession();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            address: "",
            portfolio: "",
            skills: [],
            education1: {
                school: "",
                degree: "",
                from: "",
                to: "",
            },
            education2: {
                school: "",
                degree: "",
                from: "",
                to: "",
            },
            experience1: {
                company: "",
                position: "",
                from: "",
                to: "",
            },
            experience2: {
                company: "",
                position: "",
                from: "",
                to: "",
            },
            project1: {
                name: "",
                description: "",
            },
            project2: {
                name: "",
                description: "",
            },
            certificate1: {
                title: "",
                issuedBy: "",
            },
            certificate2: {
                title: "",
                issuedBy: "",
            },
            languages: [],
            user: session?.user?._id
        },
    });


    const handleSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/my-cv", data);
            if (response) {
                toast({
                    title: "Success",
                    description: "Cv created successfully",
                    variant: "success",
                });

                router.replace("/dashboard");
                setIsSubmitting(false);
            }
        } 
        catch (error) {
            toast({
                title: "Error",
                description: error.response.data.message,
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    }; 


  return (
    <div className="flex justify-center items-center w-full p-10">
        <div className="w-[70%] p-8 space-y-8 bg-white rounded-lg shadow-md">

            <div className="text-center">
                <h1 className="text-4xl font-bold lg:text-5xl mb-6">Fill your details</h1>
                <p className="mb-4">Please enter your details.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-3 '>

                    <div className='space-y-2 p-2'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-xl font-bold">Name</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-xl font-bold">Email</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your email" type="email" {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-xl font-bold">Address</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your address" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="portfolio"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-xl font-bold">Portfolio</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your portfolio site url" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-xl font-bold">Skills</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your skills with (,)" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>

                    <div className='space-y-3 border-[1px] border-black p-5'>
                    <h2 className='text-2xl font-bold tracking-wide'>Education</h2>
                    <FormField
                        control={form.control}
                        name="education1.school"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-lg font-bold">Education 1</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your school" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="education1.degree"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter your degree" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex gap-3'>
                    <FormField
                        control={form.control}
                        name="education1.from"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Started from" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="education1.to"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Ended in" type="text" {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <FormField
                        control={form.control}
                        name="education2.school"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-lg font-bold">Education 2</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your school" type="text" {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="education2.degree"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter your degree" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex gap-3'>
                    <FormField
                        control={form.control}
                        name="education2.from"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Started from" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="education2.to"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Ended in" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    </div>


                    <div className='space-y-3 border-[1px] border-black p-5'>
                    <h2 className='text-2xl font-bold tracking-wide'>Experience</h2>

                    <p className='font-bold text-xl'>Experience 1</p>
                    <div className='flex gap-3'>
                    <FormField
                        control={form.control}
                        name="experience1.company"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter the company" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="experience1.position"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter your role" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="experience1.from"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Started from" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="experience1.to"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Ended in" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>

                    <p className='font-bold text-xl'>Experience 2</p>
                    <div className='flex gap-3'>
                    <FormField
                        control={form.control}
                        name="experience2.company"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter the company" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="experience2.position"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter your role" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="experience2.from"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Started from" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="experience2.to"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Ended in" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    </div>

                    <div className='space-y-3 border-[1px] border-black p-5'>
                    <h2 className='text-2xl font-bold tracking-wide'>Projects</h2>

                    <p className='font-bold'>Project 1</p>
                    <div className='grid grid-cols-2 gap-3'>
                    <FormField
                        control={form.control}
                        name="project1.name"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter the title" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="project1.description"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter your description" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>

                    <p className='font-bold'>Project 2</p>
                    <div className='grid grid-cols-2 gap-3'>
                    <FormField
                        control={form.control}
                        name="project2.name"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter the title" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="project2.description"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter your description" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    </div>

                    <div className='space-y-3 border-[1px] border-black p-5'>
                    <h2 className='text-2xl font-bold tracking-wide'>Certificates</h2>

                    <p className='font-bold'>Certificate 1</p>
                    <div className='grid grid-cols-2 gap-3'>
                    <FormField
                        control={form.control}
                        name="certificate1.title"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter the title" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="certificate1.issuedBy"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter the issued by company" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>

                    <p className='font-bold'>Certificate 2</p>
                    <div className='grid grid-cols-2 gap-3'>
                    <FormField
                        control={form.control}
                        name="certificate2.title"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter the title" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="certificate2.issuedBy"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder = "Enter the issued by company" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="languages"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-2xl font-bold">Languages</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your languages with (,) " type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="mt-5">
                       {
                           isSubmitting ? (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin">
                               Please wait
                           </Loader2>
                        ) : "Submit"
                       }
                    </Button>

                </form>
            </Form>

        </div>
    </div>
  )
}

export default CvBuild