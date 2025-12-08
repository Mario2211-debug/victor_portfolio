import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  gumroadUrl: string;
  featured?: boolean;
}

// Mock data - substituir por dados reais ou integração com Gumroad API
const featuredProducts: Product[] = [
  {
    id: "1",
    title: "Minimalist Portfolio Template",
    description:
      "A clean, modern portfolio template built with Next.js and Tailwind CSS.",
    price: "29",
    category: "Templates",
    gumroadUrl: "https://gumroad.com/l/portfolio-template",
    featured: true,
  },
  {
    id: "2",
    title: "Design System Course",
    description:
      "Learn how to build and maintain a design system from scratch.",
    price: "79",
    category: "Courses",
    gumroadUrl: "https://gumroad.com/l/design-system-course",
    featured: true,
  },
  {
    id: "3",
    title: "React Component Library",
    description:
      "A comprehensive set of reusable React components with TypeScript support.",
    price: "49",
    category: "Components",
    gumroadUrl: "https://gumroad.com/l/react-components",
    featured: true,
  },
];

export function MarketplacePreview() {
  return (
    // <section className="max-w-7xl mx-auto grid items-center gap-8 pb-12 pt-12 md:py-16 px-4 md:px-6 lg:px-8">
    //   <div className="flex max-w-[800px] flex-col items-start gap-2">
    //     <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
    //       Digital Products
    //     </h2>
    //     <p className="max-w-[650px] text-base text-muted-foreground leading-relaxed sm:text-lg">
    //       Templates, courses, and resources I&apos;ve created to help you build
    //       better things.
    //     </p>
    //   </div>

    //   <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    //     {featuredProducts.map((product) => (
    //       <Card
    //         key={product.id}
    //         className="flex flex-col transition-all hover:shadow-md"
    //       >
    //         <CardHeader>
    //           <div className="flex items-start justify-between mb-2">
    //             <Badge variant="outline" className="text-xs">
    //               {product.category}
    //             </Badge>
    //           </div>
    //           <CardTitle className="text-lg">{product.title}</CardTitle>
    //           <CardDescription className="line-clamp-2">
    //             {product.description}
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent className="flex-1">
    //           <div className="text-2xl font-bold">${product.price}</div>
    //         </CardContent>
    //         <CardFooter>
    //           <Button variant="outline" size="sm" className="w-full" asChild>
    //             <Link
    //               href={product.gumroadUrl}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //               View on Gumroad →
    //             </Link>
    //           </Button>
    //         </CardFooter>
    //       </Card>
    //     ))}
    //   </div>

    //   <div className="flex justify-center">
    //     <Button variant="outline" asChild>
    //       <Link href="/marketplace">View All Products</Link>
    //     </Button>
    //   </div>
    // </section>
    <section className="max-w-7xl mx-auto grid items-center gap-8 pb-12 pt-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="flex max-w-[800px] flex-col items-start gap-2">
        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Digital Products
        </h2>
        <p className="max-w-[650px] text-base text-muted-foreground leading-relaxed sm:text-lg">
        Briefly, templates, courses, and resources I&apos;ve created to help you build better things. 
        </p>
      </div>
    </section>
  );
}

