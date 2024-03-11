"use client";

import { auth } from "@/config/firebase.config";
import { userContext } from "@/context/user.context";
import { AlertDialog, Button, Flex, TextField } from "@radix-ui/themes";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [wrongDetails, setWrongDetails] = useState(false);
  const [userDetails, setUserDetails] = useState("");

  // Toast

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      Cookies.set("accessToken", response?._tokenResponse?.idToken);
      Cookies.set("refreshToken", response?._tokenResponse?.refreshToken);
    } catch (error) {
      console.log("Error while logging in", error);
    }
  };

  const handleRegister = async () => {
    try {
      if (userDetails.password !== userDetails.confirmPassword) {
        setWrongDetails(true);
        throw new Error("Password do not match!");
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      Cookies.set("accessToken", response?._tokenResponse?.idToken);
      Cookies.set("refreshToken", response?._tokenResponse?.refreshToken);
      window.location.reload();
    } catch (error) {
      console.log("Error while registering user", error);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <FaUser />
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <div className="text-center text-3xl font-bold">
          Newzee<span className=" text-red-700 text-4xl">.</span>
        </div>
        <div className="w-full flex justify-center items-center p-2">
          <FaUser fontSize={48} />
        </div>
        <AlertDialog.Title className="text-center ">
          {login ? "Login" : "Register"}
        </AlertDialog.Title>
        <Flex direction={"column"} gap={"3"}>
          <TextField.Input
            required
            id="email"
            type="email"
            onChange={handleChange}
            placeholder="Email..."
          />
          <TextField.Input
            required
            id="password"
            type="password"
            onChange={handleChange}
            placeholder="Password..."
          />
          {login ? null : (
            <TextField.Input
              required
              id="confirmPassword"
              type="password"
              onChange={handleChange}
              placeholder="Confirm Password..."
            />
          )}
          {wrongDetails ? (
            <p className="text-right text-xs text-red-600">
              Password do not match!
            </p>
          ) : null}
        </Flex>

        <Flex direction={"column"} gap="3" mt="4" justify="center">
          <Button onClick={login ? handleLogin : handleRegister}>
            {login ? "Login" : "Register"}
          </Button>

          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <p className="text-center">
            {login ? "Don't" : "Already"} have an account ?{" "}
            <span
              onClick={() => setLogin(!login)}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              {login ? "Register" : "Login"}
            </span>
          </p>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Login;
