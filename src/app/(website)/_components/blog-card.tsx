"use client";

import React from "react";

export const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <article className="border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-bold">{blog.title}</h3>
      <p className="text-gray-500">{blog.description}</p>
    </article>
  );
};
