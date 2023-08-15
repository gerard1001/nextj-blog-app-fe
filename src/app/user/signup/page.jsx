"use client";

import { Button, Form, Input, Typography, message } from "antd";
import axios from "@/components/axios/axios.instance";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginData } from "@/components/context/LoginContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const { loginData, setLoginData } = useLoginData();

  const router = useRouter();
  if (loginData) {
    return router.push("/blog/create");
  }

  const formData = new FormData();
  formData.append("userName", username);
  formData.append("password", password);
  formData.append("image", image);

  const handleSubmit = async () => {
    await axios
      .post("/user", formData)
      .then((res) => {
        message.success(res.data.message);
        console.log(res);
      })
      .then(() => {
        setUsername("");
        setPassword("");
        setImage(null);
        router.push("/user/signin");
      })
      .catch((err) => {
        message.error(err.response.data.error._message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-[450px] w-full">
        <Typography className="text-center mb-4 font-bold text-2xl">
          Register
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
          <Input
            id="image"
            name="image"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            required
            placeholder="Enter your password"
            className="h-11"
            style={{
              display: "none",
            }}
          />
          <Button
            htmlFor="image"
            className="bg-stone-500 text-white h-11 w-36 inset-0"
          >
            <label htmlFor="image">Upload Image</label>
          </Button>

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

export default Register;
