"use client";

import { Button, Form, Input, Typography, message } from "antd";
import axios from "@/components/axios/axios.instance";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginData } from "@/components/context/LoginContext";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");

  const { loginData, setLoginData } = useLoginData();

  const userData = JSON.parse(localStorage.getItem("loginData"));
  if (userData) {
    return router.push("/blog/create");
  }

  const handleSubmit = async () => {
    await axios
      .post("/user/login", {
        userName: username,
        password,
      })
      .then((res) => {
        message.success(res.data.message);
        localStorage.setItem("loginData", JSON.stringify(res.data));
        console.log(res);
      })
      .then(() => {
        setUsername("");
        setPassword("");
        setLoginData(JSON.parse(localStorage.getItem("loginData")));
      })
      .then(() => {
        router.push("/blog/create");
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        message.error(err.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-[450px] w-full">
        <Typography className="text-center mb-4 font-bold text-2xl">
          Sign In
        </Typography>
        <Form className="w-full flex flex-col items-center gap-2">
          <Input
            id="username"
            name="name"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            placeholder="Enter your name"
            className="h-11"
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="Enter your password"
            className="h-11"
          />
          <Button
            className="bg-pink-700 text-white h-11 w-36"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
