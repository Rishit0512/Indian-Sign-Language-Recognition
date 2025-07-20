import CardSection from "@/components/hi/CardSection";
import GestureGoFooter from "@/components/hi/Footer";
import HeroSection from "@/components/hi/Hero";
import Sign from "@/components/hi/Sign";
import GestureGoImpactSection from "@/components/hi/Vision";
export default function Home() {
  return (
    <div className="w-full h-screen bg-white">
      <HeroSection />
      <Sign />
      <CardSection />
      <GestureGoImpactSection />
      <GestureGoFooter />
    </div>
  );
}
