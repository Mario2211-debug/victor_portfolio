import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Nav } from "@/components/site/Nav";
import { ContactBubble } from "@/components/site/ContactBubble";
import { Footer } from "@/components/site/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Project from "@/pages/Project";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-dvh flex-col">
          <header className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
            <div className="pointer-events-auto flex items-center gap-4">
              <Nav />
              <ContactBubble />
            </div>
          </header>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/projects/:slug" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
