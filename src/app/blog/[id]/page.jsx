"use client";

import React, { useEffect, useState } from "react";
import axios from "@/components/axios/axios.instance";
import { Card, Avatar, Col, Typography, Row } from "antd";

const { Title } = Typography;
const { Meta } = Card;

const BlogPost = ({ params }) => {
  const [blog, setBlog] = useState({});
  // const blogs = await fetchBlogs();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/blog/${params.id}`);
        setBlog(res.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPost();
  }, []);

  // const filteredBlogs = blogs?.data?.filter((value) => {
  //   return value._id !== blog.data._id;
  // });

  console.log("====================================");
  console.log(blog);
  console.log("====================================");
  return (
    <main className="">
      {/* <div className="flex px-14">
        <div className="w-8/12 min-h-screen">
          <img src={blog.data.blogger.image} className="w-[80px] aspect-auto" />
          <img src={blog.data.image} className="w-[90%] aspect-video mx-auto" />
          <h1 className="text-xl font-semibold">{blog?.data.title}</h1>
          <p className="">{blog.data.content}</p>
        </div>
        <div className="">
          <div className="my-6">
            {filteredBlogs?.map((blog) => {
              return <h1 className="text-orange-500">{blog.title}</h1>;
            })}
          </div>
        </div>
      </div> */}
      <div className="postPage" style={{ width: "80%", margin: "3rem auto" }}>
        <Title level={2}>{blog?.blogger?.userName}</Title>
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Title level={4}>
            {new Date(blog.createdAt).toLocaleDateString()}
          </Title>
        </div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </main>
  );
};

export default BlogPost;
