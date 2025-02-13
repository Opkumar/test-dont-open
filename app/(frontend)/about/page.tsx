import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Building2, Target, Award, Users, BarChart, 
  CheckCircle, Briefcase, FileText, Shield,
  Handshake
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        <div className="max-w-7xl mx-auto py-28 px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 sm:text-6xl md:text-7xl mb-8 tracking-tight">
              PRASK & ASSOCIATES
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-blue-100 leading-relaxed">
              A leading Chartered Accountants firm headquartered in New Delhi,
              India, with over 17 years of expertise in corporate and consulting
              environments.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-50"></div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 -mt-20 mb-24">
          <Card className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white relative overflow-hidden group rounded-2xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-600 to-blue-600"></div>
            <CardHeader className="flex flex-row items-center space-x-4 pt-8">
              <div className="p-4 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Our Mission
              </h2>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg leading-relaxed pb-8">
              We are committed to delivering client satisfaction through timely
              deliverables, smart industry-specific solutions, and a zero
              non-compliance policy. Our goal is to provide perfect and
              innovative solutions by fully applying regulatory and statutory
              frameworks.
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white relative overflow-hidden group rounded-2xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-indigo-600"></div>
            <CardHeader className="flex flex-row items-center space-x-4 pt-8">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Our Vision
              </h2>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg leading-relaxed pb-8">
              To be the trusted partner for businesses, helping them navigate
              complex financial landscapes and achieve their strategic goals.
            </CardContent>
          </Card>
        </div>

        {/* Services Section */}
        <div className="mb-24 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600">
              Our Services
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Comprehensive financial solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Audit & Compliances",
                description: "Statutory Audit, Internal Audit, Tax Audit, Secretarial Audit, and more.",
                icon: <Shield className="w-6 h-6" />,
                gradient: "from-indigo-600 to-blue-600"
              },
              {
                title: "Financial & Accounting",
                description: "Record to Report, transaction accounting, treasury, and corporate governance.",
                icon: <BarChart className="w-6 h-6" />,
                gradient: "from-blue-600 to-indigo-600"
              },
              {
                title: "Risk Consulting",
                description: "Risk control, strategic planning, management reporting, and virtual CFO services.",
                icon: <Award className="w-6 h-6" />,
                gradient: "from-indigo-600 to-blue-600"
              },
              {
                title: "Management Consultancy",
                description: "Merger & acquisitions, due diligence, structuring, and insolvency advisory.",
                icon: <Briefcase className="w-6 h-6" />,
                gradient: "from-blue-600 to-indigo-600"
              },
              {
                title: "Business Registrations",
                description: "Company incorporation, startup registration, MSME registration, and more.",
                icon: <FileText className="w-6 h-6" />,
                gradient: "from-indigo-600 to-blue-600"
              },
              {
                title: "Tax Advisory",
                description: "Comprehensive tax planning, compliance, and litigation handling.",
                icon: <CheckCircle className="w-6 h-6" />,
                gradient: "from-blue-600 to-indigo-600"
              },
              {
                title: "Offshore Accounting",
                description: "Specialized offshore accounting and bookkeeping for companies in Canada, USA, UK, and UAE.",
                icon: <Handshake className="w-6 h-6" />,
                gradient: "from-indigo-600 to-blue-600"
              }
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-md overflow-hidden rounded-2xl"
              >
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent className="text-gray-600">
                  {service.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="pb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600">
              Why Choose PRASK?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Your success is our priority
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Experienced Team",
                description: "Our professionals have worked with leading accounting and consulting firms, bringing a wealth of knowledge and expertise.",
                icon: <Users className="w-12 h-12" />,
                gradient: "from-indigo-600 to-blue-600"
              },
              {
                title: "Client-Centric Approach",
                description: "We emphasize constant communication with clients to ensure their expectations are met.",
                icon: <Target className="w-12 h-12" />,
                gradient: "from-blue-600 to-indigo-600"
              },
              {
                title: "Innovative Solutions",
                description: "We leverage our experience and tools to provide robust financial data analytics and innovative support.",
                icon: <Award className="w-12 h-12" />,
                gradient: "from-indigo-600 to-blue-600"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-md overflow-hidden rounded-2xl"
              >
                <CardContent className="pt-12 pb-12">
                  <div className={`flex justify-center mb-8 p-6 bg-gradient-to-br ${feature.gradient} rounded-2xl w-24 h-24 mx-auto text-white transform group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;