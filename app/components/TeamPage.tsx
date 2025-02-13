"use client";

import Image from "next/image";
import { Mail, Linkedin } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { useState, useRef, useEffect } from "react";

export default function TeamPage({ teamMembers }) {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-[#1a2942] mb-12">
          Our Team
        </h1>
        <div className="space-y-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              member={member}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamMemberCard({ member, isReversed }) {
  const [showMore, setShowMore] = useState(false);
  const [showMoreWork, setShowMoreWork] = useState(false);
  const workExpRef = useRef(null);

  // Function to parse work experience into bullet points
  const parseWorkExperience = (experience) => {
    if (!experience) return [];
    return experience
      .split(/[•\n]/)
      .map(item => item.trim())
      .filter(item => item !== '');
  };

  // Function to get visible items based on collapsed state
  const getVisibleItems = (items) => {
    if (showMoreWork) return items;
    
    // Show only first item completely
    if (items.length <= 1) return items;
    return items.slice(0, 3);
  };

  const workExperience = parseWorkExperience(member.workOfExperience);
  const hasMoreWork = workExperience.length > 1;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl overflow-hidden ${isReversed ? "md:flex-row-reverse" : ""}`}
    >
      {/* Image Section */}
      <div
        className={`relative w-full flex items-center justify-center ${isReversed ? "md:order-2" : "md:order-1"}`}
      >
        <Image
          src={urlFor(member.image).url()}
          alt={member.name}
          width={500}
          height={500}
          className="object-cover rounded-full w-72 h-72 md:w-[35rem] md:h-[35rem]"
        />
      </div>

      {/* Description Section */}
      <div
        className={`p-6 md:p-8 flex flex-col justify-center space-y-6 ${isReversed ? "md:order-1" : "md:order-2"}`}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-[#1a2942]">
          {member.name}
        </h3>
        <p className="text-purple-600 text-lg mt-2">{member.role}</p>

        {/* About Section */}
        <div>
          <h4 className="text-lg font-semibold text-[#1a2942] mb-4">About</h4>
          <div
            className={`relative transition-all duration-300 ease-in-out overflow-hidden ${
              showMore ? "max-h-[1000px]" : "max-h-[100px]"
            }`}
          >
            <p className="text-gray-600">{member.desc}</p>
          </div>
          {(member.desc || "").length > 100 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMore(!showMore);
              }}
              className="text-purple-600 hover:underline transition-colors duration-200 mt-2"
            >
              {showMore ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        {/* Qualifications Section */}
        <div>
          <h4 className="text-lg font-semibold text-[#1a2942]">
            Academic & Professional Qualifications
          </h4>
          <ul className="space-y-2 text-gray-700">
            {member.qualifications.map((qualification, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 flex-shrink-0">●</span>
                <span>{qualification}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Work Experience Section */}
        <div>
          <h4 className="text-lg font-semibold text-[#1a2942] mb-4">
            Work Experience
          </h4>
          <div ref={workExpRef} className="relative">
            <ul className="space-y-3">
              {getVisibleItems(workExperience).map((experience, idx) => (
                <li key={idx} className="flex items-start text-gray-600">
                  <span className="mr-2 flex-shrink-0">●</span>
                  <span className="flex-grow">{experience}</span>
                </li>
              ))}
              {/* {!showMoreWork && hasMoreWork && (
                <li className="text-gray-600">...</li>
              )} */}
            </ul>
            {hasMoreWork && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreWork(!showMoreWork);
                }}
                className="text-purple-600 hover:underline transition-colors duration-200 mt-2"
              >
                {showMoreWork ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>

        {/* Expertise Section */}
        <div>
          <h4 className="text-lg font-semibold text-[#1a2942]">
            Area of Expertise
          </h4>
          <ul className="space-y-2 text-gray-700">
            {member.expertise.split(",").map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 flex-shrink-0">●</span>
                <span>{item.trim()}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-[#1a2942]">Contact</h4>
          <div className="flex items-center text-gray-700">
            <Linkedin className="w-5 h-5 mr-3 text-purple-600" />
            <a
              target="_blank"
              href={member.linkedin}
              className="hover:text-purple-700 transition-colors"
            >
              Linkedin
            </a>
          </div>
          <div className="flex items-center text-gray-700">
            <Mail className="w-5 h-5 mr-3 text-purple-600" />
            <a
              href={`mailto:${member.email}`}
              className="hover:text-purple-700 transition-colors"
            >
              {member.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}