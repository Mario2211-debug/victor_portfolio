import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Nav } from "@/components/site/Nav";
import { ContactBubble } from "@/components/site/ContactBubble";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Footer } from "@/components/site/Footer";
import { useScrollRestoration } from "@/lib/useScrollRestoration";
import { useHideOnScroll } from "@/lib/useHideOnScroll";
import { cn } from "@/lib/utils";
import { copy } from "@/lib/copy";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Project from "@/pages/Project";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // A API dorme em free tier: uma retentativa automática cobre o arranque
      // a frio sem obrigar a pessoa a carregar em "Try again" (08 — Doherty).
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Shell() {
  useScrollRestoration();
  const headerHidden = useHideOnScroll();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Primeiro alvo do Tab em qualquer página: saltar o header fixo. */}
      <a
        href="#content"
        className="interactive motion-micro sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-solid focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-on-solid"
      >
        {copy.nav.skipToContent}
      </a>

      {/* A barra sai de cena ao descer e volta ao subir.
          Desloca a sua própria altura, o que é mais do que os 4–8px que o `06`
          manda usar — mas essa regra é para elementos que *entram* em cena; um
          header que se retira é o mesmo movimento de um drawer, e teria de
          percorrer a distância toda para deixar mesmo de tapar o texto.
          `focus-within` faz a barra regressar assim que o `Tab` lhe chega:
          escondida por scroll continua a ser alcançável a teclado. */}
      <header
        className={cn(
          "motion-enter pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-6",
          "focus-within:translate-y-0 focus-within:opacity-100",
          headerHidden && "-translate-y-[calc(100%+1rem)] opacity-0",
        )}
      >
        <div className="pointer-events-auto flex items-center gap-3">
          <Nav />
          <ContactBubble />
          <ThemeToggle />
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
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
