import CardSection from "@/components/CardSection";
import GestureGoFooter from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Sign from "@/components/Sign";
import GestureGoImpactSection from "@/components/Vision";

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
