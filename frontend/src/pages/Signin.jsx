import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtomWarning from "../components/BottomWarning"

 const Signin = () => {
  return (
    <div className='bg-slate-300 flex justify-center border border-black'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={"Sign in"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>

                <InputBox placeholder="mohit@gmail.com" label={"Email"}></InputBox>
                <InputBox placeholder="123123" label={"Password"}></InputBox>

                <div className='pt-4'>
                    <Button label={"Sign in"}></Button>
                </div>
                <ButtomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}></ButtomWarning>
                
            </div>

        </div>

    </div>
  )
}
export default Signin

