import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "../styles/global.css"
import ScrollToTop from "./ScrollToTop";

const RootLayout = () => {
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
