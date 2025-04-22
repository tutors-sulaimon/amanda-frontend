import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../../store/api";
import ReactMarkdown from "react-markdown"; // For rendering Markdown content
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown support
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Blog {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: string; // Rich text (Markdown) content
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
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BlogPostsDetails: React.FC = () => {
   const { i18n } = useTranslation();
   const locale = i18n.language;
  const { documentId } = useParams<{ documentId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const getBlog = async () => {
      try {
        if (!documentId) {
          throw new Error("Blog documentId is missing");
        }
        const data = await fetchBlogById(locale, documentId);
        setBlog(data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [locale, documentId]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!blog) return <div className="text-center mt-8">Blog not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {blog.coverImage?.url && (
          <img
            src={`${API_BASE_URL}${blog.coverImage.url}`}
            alt={blog.title}
            className="w-full h-48 md:h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
          <div className="text-gray-700 mb-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    className="mx-auto my-4 max-w-full h-auto rounded-lg shadow-md"
                    style={{ maxWidth: "60%" }}
                  />
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/blog")}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Back to blogs
      </button>
    </div>
  );
};

export default BlogPostsDetails;