"use client";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from 'axios';


const SignUpPage = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (data) => {
        setIsSubmitting(true);

       try {
         const response = await axios.post("/api/sign-up", data);
 
         if (response) {
            toast({
                title: "Success",
                description: "User created successfully",
                variant: "success",
            });
 
            router.replace("/sign-in");

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
    <div className="flex justify-center items-center min-h-screen ">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

            <div className="text-center">
                <h1 className="text-4xl font-bold lg:text-5xl mb-6">Join Resume World</h1>
                <p className="mb-4">Sign up to start your journey.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your username " {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting}>
                       {
                           isSubmitting ? (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin">
                               Please wait
                           </Loader2>
                        ) : "Sign up"
                       }
                    </Button>

                </form>
            </Form>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">Already have an account? 
                    <Link href="/sign-in" className="text-blue-500">Sign in</Link>
                </p>
            </div>

        </div>
    </div>
  )
}

export default SignUpPage