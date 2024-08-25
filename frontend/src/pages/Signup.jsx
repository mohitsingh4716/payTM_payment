import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import ButtomWarning from "../components/BottomWarning"
import axios from "axios";
import { useNavigate } from 'react-router-dom'



 const Signup = () => {
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [username, setUsername]=useState("");
    const [password, setPassword]= useState("");
    const nevigate =useNavigate();

  return (
    <div className='bg-slate-300 flex justify-center border border-black'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={(e)=>{
                    setFirstName(e.target.value);
                }} placeholder="John" label={"First Name"}></InputBox>
                <InputBox onChange={(e)=>{
                    setLastName(e.target.value);
                }} placeholder="Doe" label={"Last Name"}></InputBox>
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value);
                }} placeholder="mohit@gmail.com" label={"Email"}></InputBox>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value);
                }} placeholder="123123" label={"Password"}></InputBox>

                <div className='pt-4'>
                    <Button onClick={async()=>{
                      const response=await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        firstName,
                        lastName,
                        password
                       })

                       localStorage.setItem("token", response.data.token)
                    //    localStorage.removeItem("token");
                       nevigate("/dashboard")
                       
                    }} label={"Sign up"}></Button>
                </div>
                <ButtomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></ButtomWarning>
                
            </div>

        </div>

    </div>
  )
}

export default Signup