import axios from "axios";
import { POST } from "./type";

export const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/blog/`;
export const blogGet = (url) => axios.get(url).then((res) => res.data);
export const blogGetPk = (url, id) =>
  axios.get(`${url}${id}/`).then((res) => res.data);

// ------------------------------------
// ブログデータの全件取得
// ------------------------------------
export const getSortedPostsData = async () => {
  const blogs = await blogGet(apiUrl);
  const filteredBlogs = blogs.sort(function (a, b) {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
    return 0;
  });
  const allPostsData: POST[] = filteredBlogs.map((blog) => {
    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      date: blog.created_at,
    };
  });
  return allPostsData;
};

// ------------------------------------
// ブログデータの全件取得（idのみ）
// ------------------------------------
export const getAllPostIds = async () => {
  const blogs = await blogGet(apiUrl);
  return blogs.map((blog) => {
    return {
      params: {
        id: String(blog.id),
      },
    };
  });
};

// ------------------------------------
// ブログデータの取得（パラメータのキーで取得する）
// ------------------------------------
export const getPostData = async (id?: string) => {
  if (!id) return null;
  const blog = await blogGetPk(apiUrl, id);

  const blogData: POST = {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    date: blog.created_at,
  };
  return blogData;
};
