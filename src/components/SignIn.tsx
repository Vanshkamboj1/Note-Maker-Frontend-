import { useState } from "react";
import { FormInput } from "./FormInput";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { ROUTES } from "../constants/route";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

interface SignInProps {
  setIsSignIn: (value: boolean) => void;
}

export const SignIn = ({ setIsSignIn }: SignInProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useAuth();
  const signInHandler = async () => {
    if (!email || !password) {
      console.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosClient.post("/auth/signin", {
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
      <div className="text-center font-semibold text-[17px] text-zinc-200">
        Don't have an account?{" "}
        <span
          className="underline cursor-pointer "
          onClick={() => {
            setIsSignIn(false);
          }}
        >
          {" "}
          Sign up
        </span>
      </div>
      <div
        onClick={signInHandler}
        className="flex flex-col justify-center items-center bg-black text-white  p-3 rounded-md mt-2  cursor-pointer "
      >
        {loading === false ? "Signin" : "Signing in..."}
      </div>
    </div>
  );
};
