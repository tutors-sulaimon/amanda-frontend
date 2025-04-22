import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageUploadTest from "./pages/imageUploadTest";
import WorkShopCreationPage from "./pages/WorkShopCreationPage";
import Home from "./pages/Home/Home";
import ServicePage from "./pages/Services/ServiceGastro";
import ServiceBirthday from "./pages/Services/ServiceBirthday";
import ServiceCatering from "./pages/Services/ServiceCatering";
import ServiceChef from "./pages/Services/ServiceChef";
import ServiceDaily from "./pages/Services/ServiceDaily";
import Gallery from "./pages/Gallery/Gallery.tsx";
import Contact from "./pages/Contact/Contact.tsx";
import About from "./pages/About/About.tsx";
import Menu from "./pages/Menu.tsx";
import BlogPosts from "./pages/Blog/BlogPosts.tsx";
import BlogPostsDetail from "./pages/Blog/BlogPostsDetails.tsx";
import { Bounce, ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/gastronomic",
        element: <ServicePage />,
      },
      {
        path: "/birthday",
        element: <ServiceBirthday />,
      },
      {
        path: "/blog",
        element: <BlogPosts />,
      },
      {
        // path: "/blog",element: <Blog />,
        path: "/blog/:documentId",
        element: <BlogPostsDetail />,
      },
      {
        path: "/catering",
        element: <ServiceCatering />,
      },
      {
        path: "/chef",
        element: <ServiceChef />,
      },
      {
        path: "/daily",
        element: <ServiceDaily />,
      },
      {
        path: "/image-upload-test",
        element: <ImageUploadTest />,
      },
      {
        path: "/workshop-creation",
        element: <WorkShopCreationPage />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </QueryClientProvider>
  );
}

export default App;
