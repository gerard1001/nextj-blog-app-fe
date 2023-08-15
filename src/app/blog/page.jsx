"use client";

import axios from "@/components/axios/axios.instance";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import { BsPencil } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import Link from "next/link";

const { Title } = Typography;
const { Meta } = Card;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/blog");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center gap-2 flex-wrap">
        {blogs?.data?.map((blog) => {
          return (
            <div className="max-w-[280px] flex flex-col  bg-white rounded-md shadow-md">
              <Link href={`/blog/${blog._id}`}>
                <img
                  src={blog.image}
                  alt=""
                  className="rounded-t-md w-full aspect-video object-cover"
                />
              </Link>

              <div className="p-4">
                <h1 className="text-base font-bold line-clamp-2 mb-4 h-12">
                  {blog.title}
                </h1>
                <p className="text-sm line-clamp-3 my-4">{blog.descr}</p>
                <Link
                  href={`/blog/${blog._id}`}
                  className="text-sm font-semibold mt-4 hover:text-orange-500"
                >
                  Read article
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
