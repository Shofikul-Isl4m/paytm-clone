import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  
  const [fullName, setfullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="username"
            label={"username"}
          />
         
          <InputBox
            onChange={(e) => {
              setfullName(e.target.value);
            }}
            placeholder="fullname"
            label={"fullname"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            label={"Password"}
          />
          <div className="pt-4">
          <Button
  onClick={async () => {
    try {
      // Send the registration data to the server
      await axios.post(
        "/api/v1/users/register",
        {  username ,  fullName ,  password },
      
      );
      
      // Navigate the user to the signin page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error during registration. Please try again.");
    }
  }}
  label={"Sign up"}
/>

          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/login"}
          />
        </div>
      </div>
    </div>
  );
};