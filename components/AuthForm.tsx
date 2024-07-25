'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { fields } from '@hookform/resolvers/typebox/src/__tests__/__fixtures__/data.js'
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import SignIn from '@/app/(auth)/sign-in/page'
import PlaidLink from './PlaidLink'

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false)
  //  const loggedInUser = await getLoggedInUser();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", },
  })
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password,
      }
      // Sign up with Appwrite & create plaid link token
      if (type === 'sign-up') {
        const newUser = await signUp(userData);
        setUser(newUser)
      }
      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password
        })
        if (response)
          router.push('/')
      }
      // console.log(data);
      // setIsLoading(false);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer flex items-center gap-1'>
          <Image
            src="/icons/wealth.svg"
            width={34}
            height={34}
            alt="wealth logo" />
          <h1 className='concert-one-regular'>WealthFlow</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? "Sign In"
                : "Sign Up"}
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? 'Link Your Account To Get Stated'
                : 'Please Enter Your Details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>
          <PlaidLink user={user} variant='primary' />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {type === 'sign-up' && (
                <>
                  <div className='flex gap-4'>
                    <CustomInput control={form.control} name="firstName"
                      label='First Name' placeholder='Enter your first name' />
                    <CustomInput control={form.control} name="lastName"
                      label='Last Name' placeholder='Enter your last name' />
                  </div>
                  <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                  <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' />
                    <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                  </div>
                </>
              )}
              <CustomInput control={form.control} name="email"
                label='Email' placeholder='Enter your email' />
              <CustomInput control={form.control} name='password'
                label='Password' placeholder='Enter your password' />
              <div className='flex flex-col gap-4'>
                <Button type="submit" className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20}
                        className='animate-spin' /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in'
                    ? 'Sign-in' : 'Sign-up'}
                </Button>
              </div>
            </form>
          </Form>
          <footer>
            <p className='text-14 font-normal text-gray-600'>
              {type === 'sign-in' ? 'Dont have an Account?' : 'Already Have an Account'}
              <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                {type === 'sign-in' ? 'Sign-up' : 'Sign-in'}
              </Link>
            </p>
          </footer>
        </>
      )}
    </section >
  )
}

export default AuthForm
