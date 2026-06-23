import FeaturedDoctors from "@/components/home/FeaturedDoctors";
import Hero from "@/components/home/Hero";
import MedicalSpecializations from "@/components/home/MedicalSpecializations";
import PlatformStats from "@/components/home/PlatformStats";

export default function Home() {
  return (
    <main className="min-h-screen bg-theme text-theme font-sans antialiased">
      <Hero />
      <FeaturedDoctors />
      <MedicalSpecializations />
      <PlatformStats />
    </main>
  );
}