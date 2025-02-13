"use client";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import FixedEnquiryButton from "../components/FixedEnquiryButton";
import FeaturesSection from "../components/FeaturesSection";
import TeamSection from "../components/TeamSection";
import MotivationalSection from "../components/MotivationSection";
import AnimateOnScroll from "../components/AnimateOnScroll";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      {/* Header with fade in animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>

      {/* Hero section with initial load animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <HeroSection />
      </motion.div>

      {/* Features section with stagger effect */}
      <AnimateOnScroll animation="slideUp">
        <FeaturesSection />
      </AnimateOnScroll>

      {/* About section sliding from right */}
      <AnimateOnScroll animation="slideRight" delay={0.2}>
        <AboutSection />
      </AnimateOnScroll>

      {/* Team section fading in */}
      <AnimateOnScroll animation="fade" delay={0.3}>
        <TeamSection />
      </AnimateOnScroll>

      {/* Services section scaling up */}
      <AnimateOnScroll animation="scale" delay={0.2}>
        <ServicesSection />
      </AnimateOnScroll>

      {/* Fixed enquiry button with permanent animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 1,
          ease: "easeOut",
        }}
      >
        <FixedEnquiryButton />
      </motion.div>

      {/* Motivational section sliding up */}
      <AnimateOnScroll animation="slideUp" delay={0.2}>
        <MotivationalSection />
      </AnimateOnScroll>
    </main>
  );
}
