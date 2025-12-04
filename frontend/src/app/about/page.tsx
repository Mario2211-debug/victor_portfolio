'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProfile, useSkills, useExperience, useEducation } from "@/hooks/use-portfolio-data";

export default function AboutPage() {
  const { profile, user, isLoading: profileLoading } = useProfile();
  const { skills, isLoading: skillsLoading } = useSkills();
  const { experience, isLoading: experienceLoading } = useExperience();
  const { education, isLoading: educationLoading } = useEducation();

  const isLoading = profileLoading || skillsLoading || experienceLoading || educationLoading;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-12 md:mb-16 max-w-[850px]">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
          About Me
        </h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
            </div>
          ) : (
            <>
              {profile?.summary ? (
                <p className="text-base text-muted-foreground leading-relaxed mb-4 sm:text-lg whitespace-pre-line">
                  {profile.summary}
                </p>
              ) : (
                <>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4 sm:text-lg">
                    I&apos;m {user?.name || 'Victor'}, a {profile?.title || 'Product Designer & Developer'} based in {profile?.location || 'Brazil'}.
                    I specialize in creating digital experiences that are both beautiful
                    and functional.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4 sm:text-lg">
                    With a background in both design and development, I bring a unique
                    perspective to every project. I believe in the power of minimalism,
                    clean code, and user-centered design.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
                    When I&apos;m not coding or designing, you&apos;ll find me reading,
                    exploring new technologies, or sharing my learnings through writing.
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
        {skillsLoading ? (
          <div className="flex flex-wrap gap-2">
            {[...Array(10)].map((_, i) => (
              <Badge key={i} variant="secondary" className="text-sm py-1.5 animate-pulse">
                Loading...
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill._id} 
                variant="secondary" 
                className="text-sm py-1.5"
                title={`${skill.technology} - Level ${skill.level}/5 - ${skill.category}`}
              >
                {skill.technology}
              </Badge>
            ))}
          </div>
        )}
      </section>

      <Separator className="mb-8" />

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>
        {experienceLoading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-muted animate-pulse rounded w-1/2"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : experience.length > 0 ? (
          <div className="space-y-6">
            {experience.map((exp) => (
              <Card key={exp._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{exp.position}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{exp.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {exp.context && (
                    <p className="text-muted-foreground mb-2">{exp.context}</p>
                  )}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No experience data available.</p>
        )}
      </section>

      <Separator className="mb-8" />

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Education</h2>
        {educationLoading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-muted animate-pulse rounded w-1/2"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : education.length > 0 ? (
          <div className="space-y-6">
            {education.map((edu) => (
              <Card key={edu._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {edu.institution}
                      </CardDescription>
                      {edu.description && (
                        <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
                      )}
                    </div>
                    <Badge variant="outline">{edu.period}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No education data available.</p>
        )}
      </section>

      <Separator className="mb-8" />

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">View My Work</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
