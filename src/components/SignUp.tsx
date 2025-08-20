import { useState } from "react";
import { FormInput } from "./FormInput";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/route";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

interface SignUpProps {
  setIsSignIn: (value: boolean) => void;
}

export const SignUp = ({ setIsSignIn }: SignUpProps) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useAuth();
  const signUpHandler = async () => {
    if (!firstName || !lastName || !email || !password) {
      console.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosClient.post("/auth/register", {
        fname: firstName,
        lname: lastName,
        email: email,
        password: password,
      });
      Cookies.set("token", res.data.token, { expires: 1 });
      setUser(res.data.user);
      navigate(ROUTES.NOTES);
      setLoading(false);
      console.log("Response:", res.data);
    } catch (error) {
      setLoading(false);
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="authOptions p-6 rounded-md flex flex-col w-xl justify-center gap-2 h-full/2">
      <FormInput
        label="FirstName"
        setValue={setFirstName}
        placeHolder="Enter your  FirstName"
      />
      <FormInput
        label="LastName"
        setValue={setLastName}
        placeHolder="Enter your LastName"
      />
      <FormInput
        label="Email"
        setValue={setEmail}
        type="email"
        placeHolder="Enter your Email"
      />
      <FormInput
        label="Password"
        setValue={setPassword}
        type="password"
        placeHolder="Enter your password"
      />

      <div className="text-center font-semibold text-[17px]  text-zinc-200">
        Already have an account?{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => {
            setIsSignIn(true);
          }}
        >
          Sign In
        </span>
      </div>

      <div
        className="flex flex-col justify-center items-center bg-black text-white p-3 rounded-md mt-2 cursor-pointer"
        onClick={signUpHandler}
      >
        {loading === false ? "Signup" : "Registering..."}
      </div>
    </div>
  );
};
