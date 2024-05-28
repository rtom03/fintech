import AuthForm from '@/components/AuthForm'
import React from 'react'

const SignIn = () => {
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'/>
      <AuthForm type="sign-in"/>
    </section>
  )
}
export default SignIn;