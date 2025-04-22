import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../store/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Blog {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
      small: {
        url: string;
      };
      medium: {
        url: string;
      };
      large: {
        url: string;
      };
    };
  };
  blogContent: Array<{
    contents: string;
    images: Array<{
      url: string;
    }>;
  }>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BlogPosts: React.FC = () => {
  const { i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs(i18n.language);
        setBlogs(data.data);
      } catch (err) {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, [i18n.language]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl text-gray-500 text-center mb-8">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.documentId}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            style={{ minHeight: "400px" }} 
          >
            {blog.coverImage?.url && (
              <img
                src={`${API_BASE_URL}${blog.coverImage.url}`}
                alt={blog.title}
                className="w-full h-48 object-fit: cover"
              />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-left text-xl text-gray-600 mb-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {blog.description}
              </p>
              <Link
                to={`/blog/${blog.documentId}`}
                className="text-sm text-gray-700 hover:text-blue-700 self-start"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;