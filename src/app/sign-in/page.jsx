"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const SignInPage = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        }
    });

    const handleSubmit = async (data) => {
        setIsSubmitting(true);

        const response = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });

        if (response?.error) {
            toast({
                title: 'Error signing in',
                description: response.error,
                variant: 'destructive',
            });

            setIsSubmitting(false);
        }

        if (response?.url) {
            router.replace("/dashboard")
        }
    };



  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

            <div className="text-center">
                <h1 className="text-4xl font-bold lg:text-5xl mb-6">Login to your account</h1>
                <p className="mb-4">Login to start creating and sharing resumes.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>

                    <FormField
                        control={form.control}
                        name="identifier"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder = "Enter your username" {...field} />
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

                    <Button type="submit" disabled={isSubmitting} className="mt-5">
                       {
                           isSubmitting ? (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin">
                               Please wait
                           </Loader2>
                        ) : "Sign in"
                       }
                    </Button>

                </form>
            </Form>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">Don&apos;t have an account? 
                    <Link href="/sign-up" className="text-blue-500"> Sign up</Link>
                </p>
            </div>

        </div>
    </div>
  )
}


export default SignInPage