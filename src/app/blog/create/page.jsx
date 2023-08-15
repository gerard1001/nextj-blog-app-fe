"use client";

import QuillEditor from "@/components/QuillEditor";
import axios from "@/components/axios/axios.instance";
import { useLoginData } from "@/components/context/LoginContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Form, Button, Input, message } from "antd";

const CreateBlog = () => {
  const router = useRouter();
  const { loginData, setLoginData } = useLoginData();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [descr, setDescr] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!loginData) {
      return router.push("/user/signin");
    }
  }, []);

  const onEditorChange = (value) => {
    setContent(value);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      title: title,
      title: title,
      content: content,
      blogger: loginData?.data?._id,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("descr", descr);
    formData.append("content", content);
    formData.append("blogger", loginData?.data?._id);

    axios
      .post("/blog", formData)
      .then((res) => {
        if (res) {
          console.log("====================================");
          console.log(res);
          console.log("====================================");
          message.success("Post Created!");
        }
      })
      .then(() => {
        setContent("");
        router.push("/blog");
      })
      .catch((err) => {
        console.log("####################################");
        console.log(err);
        console.log("####################################");
        message.error("Failed to create post");
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <QuillEditor
        placeholder={"Start Posting Something"}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />

      <Form onSubmit={onSubmit}>
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <Input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Type blog title"
            className="h-11"
          />
          <Input
            id="descr"
            name="descr"
            type="text"
            value={descr}
            onChange={(e) => {
              setDescr(e.target.value);
            }}
            placeholder="Enter description"
            className=""
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
            size="large"
            htmlType="submit"
            className=""
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateBlog;
