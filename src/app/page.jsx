import WhyChooseUs from "@/components/home/Choose";
import FeaturedDoctors from "@/components/home/FeaturedDoctors";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import MedicalSpecializations from "@/components/home/MedicalSpecializations";
import PlatformStats from "@/components/home/PlatformStats";
import SuccessStoriesPage from "@/components/home/SuccessStoriesPage";

export default function Home() {
  return (
    <main className="min-h-screen bg-theme text-theme font-sans antialiased">
      <Hero />
      <FeaturedDoctors />
      <MedicalSpecializations />
      <PlatformStats />
      <SuccessStoriesPage />
      <WhyChooseUs />
      <HowItWorks />
    </main>
  );
}
