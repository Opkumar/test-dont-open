"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { getTeamMembers } from "../actions/getTeamMembers";
import { useEffect, useState } from "react";

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const handleGetTeamMembers = async () => {
      const teamMembers = await getTeamMembers();

      setTeamMembers(teamMembers);
    };

    handleGetTeamMembers();
  }, []);

  return (
    <section className="relative bg-gray-100 py-24">
      <div className="mx-auto w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Team
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Meet our experienced partners who lead PRASK & Associates with
            excellence and dedication
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-white shadow-md transition-all hover:shadow-xl dark:bg-gray-800/50"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00]/20 to-transparent" />
                <Image
                  src={
                    member.image
                      ? urlFor(member.image).url()
                      : "/placeholder.svg"
                  }
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="relative space-y-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-purple-600">{member.role}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Academic & Professional Qualifications
                  </h4>
                  <ul className="list-inside space-y-1 text-sm text-muted-foreground">
                    {member.qualifications.map((qualification, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        {qualification}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  asChild
                  variant="link"
                  className="group/btn p-0 text-purple-600 hover:no-underline"
                >
                  <Link href="/team" className="inline-flex items-center gap-1">
                    More Info
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900">
        <div className="absolute h-full w-full bg-[radial-gradient(#ff6b00_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
    </section>
  );
}
