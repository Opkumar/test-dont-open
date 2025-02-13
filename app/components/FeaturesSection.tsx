"use client"

import { motion } from "framer-motion"
import { Eye, Flag, Heart } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    title: "OUR VISION",
    icon: Eye,
    description:
      "PRASK's vision is to provide globally benchmarked qualitative, timely and professional services to its clients and becoming a renowned and reliable firm.",
  },
  {
    title: "OUR MISSION",
    icon: Flag,
    description:
      "To perform such kind of services that would maximize of clients worth and the enhancement of business prospects and growth.",
  },
  {
    title: "CORE VALUE",
    icon: Heart,
    description:
      "PRASK takes ownership, seek continuous improvement, and are accountable to its clients, the firm, and the public by providing superior services",
  },
]

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-xl relative">
                <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardHeader className="pt-8 pb-6">
                  <h3 className="text-2xl font-bold text-blue-700">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 leading-relaxed mb-6">{feature.description}</p>
                  <Link
                    href="/about"
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2 transition-colors"
                  >
                    Learn More
                    <span className="text-lg">→</span>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

