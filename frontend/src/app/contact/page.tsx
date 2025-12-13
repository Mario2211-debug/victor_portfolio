"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Mario2211-debug",
    icon: "→",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/mario-afonso-018107141",
    icon: "→",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/mario",
    icon: "→",
  },
  {
    name: "Email",
    url: "mailto:marioafonso1997@gmail.com",
    icon: "→",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {theme} = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Aqui você integraria com sua API
    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-12 md:mb-16 max-w-[650px]">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
          Get in Touch
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
          Have a project in mind? Want to collaborate? Or just want to say hi?
          I&apos;d love to hear from you. Send me a message and I&apos;ll respond
          as soon as possible.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I&apos;ll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or idea..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Other ways to reach me or connect.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Email</p>
                <a
                  href="mailto:mailto:marioafonso1997@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  marioafonso1997@gmail.com
                </a>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-3">Social Links</p>
                <div className="space-y-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      <span>{link.name}</span>
                      <span>{link.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-0 rounded-none ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"}`}>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                I typically respond within 24-48 hours. For urgent matters,
                please mention it in your message.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

