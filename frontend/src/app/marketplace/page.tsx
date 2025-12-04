"use client";

import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  currency?: string;
  category: string;
  imageUrl?: string;
  gumroadUrl: string;
  featured?: boolean;
}

// Mock data - substituir por dados reais ou integração com Gumroad API
const products: Product[] = [
  {
    id: "1",
    title: "Minimalist Portfolio Template",
    description:
      "A clean, modern portfolio template built with Next.js and Tailwind CSS. Perfect for designers and developers.",
    price: "29",
    currency: "USD",
    category: "Templates",
    gumroadUrl: "https://gumroad.com/l/portfolio-template",
    featured: true,
  },
  {
    id: "2",
    title: "React Component Library",
    description:
      "A comprehensive set of reusable React components with TypeScript support and full documentation.",
    price: "49",
    currency: "USD",
    category: "Components",
    gumroadUrl: "https://gumroad.com/l/react-components",
  },
  {
    id: "3",
    title: "Design System Course",
    description:
      "Learn how to build and maintain a design system from scratch. Includes Figma files and code examples.",
    price: "79",
    currency: "USD",
    category: "Courses",
    gumroadUrl: "https://gumroad.com/l/design-system-course",
    featured: true,
  },
  {
    id: "4",
    title: "UI/UX Design Kit",
    description:
      "A collection of modern UI components, icons, and design patterns for your next project.",
    price: "39",
    currency: "USD",
    category: "Design",
    gumroadUrl: "https://gumroad.com/l/ui-ux-kit",
  },
  {
    id: "5",
    title: "Next.js Starter Kit",
    description:
      "A production-ready Next.js starter with authentication, database setup, and best practices.",
    price: "59",
    currency: "USD",
    category: "Templates",
    gumroadUrl: "https://gumroad.com/l/nextjs-starter",
  },
  {
    id: "6",
    title: "TypeScript Handbook",
    description:
      "A comprehensive guide to TypeScript with practical examples and advanced patterns.",
    price: "19",
    currency: "USD",
    category: "Books",
    gumroadUrl: "https://gumroad.com/l/typescript-handbook",
  },
];

const categories = Array.from(
  new Set(products.map((p) => p.category))
);

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    return true;
  });

  const featuredProducts = filteredProducts.filter((p) => p.featured);
  const regularProducts = filteredProducts.filter((p) => !p.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
          Marketplace
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Digital products, templates, courses, and resources I&apos;ve created
          to help you build better things.
        </p>
      </div>

      {/* Categories */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Separator className="mb-6" />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col transition-all hover:shadow-md"
              >
                {product.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge className="text-xs">Featured</Badge>
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-2xl font-bold">
                    ${product.price}
                    {product.currency && (
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.currency}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link
                      href={product.gumroadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Gumroad →
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Products */}
      {regularProducts.length > 0 && (
        <section>
          {featuredProducts.length > 0 && (
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
          )}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {regularProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col transition-all hover:shadow-md"
              >
                {product.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-2xl font-bold">
                    ${product.price}
                    {product.currency && (
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.currency}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full" asChild>
                    <Link
                      href={product.gumroadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Gumroad →
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

