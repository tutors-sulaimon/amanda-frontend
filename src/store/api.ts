import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch menu data
export const fetchData = async () => {
  try {
    // API call
    const response = await axios.get(`${API_URL}/api/menu-news?populate[data][populate][category][populate]=*&populate[data][populate][products][populate]=*&populate[data][populate][images][populate]=*&populate[data][populate][BocadillosItems][populate][priceLabel][populate]=*&populate[data][populate][BocadillosItems][populate][others][populate]=*`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// Fetch submenu data
export const fetchSubMenuData = async () => {
  try {
    // API call
    const response = await axios.get(`${API_URL}/api/submenus?populate[category][populate]=*&populate[items][populate]=*&populate[notes][populate]=*&populate[tableInfo][populate]=*`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const API_URL_BLOG = `${API_URL}/api/blogs`;

// Fetch all blogs
export const fetchBlogs = async (locale: string) => {
  try {
    const response = await axios.get(API_URL_BLOG, {
      params: {
        locale: locale,
        populate: '*',
        sort: 'content_id',
      
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

// Fetch a single blog by documentId
export const fetchBlogById = async (locale: string, documentId: string) => {
  try {
    const response = await axios.get(`${API_URL_BLOG}/${documentId}`, {
      params: {
        locale: locale,
        populate: '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};