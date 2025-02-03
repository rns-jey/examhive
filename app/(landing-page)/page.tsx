import HeroSection from "@/components/organisms/hero-section";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PublicLayout from "./public-layout";
import Home from "../(main)/home/page";
import PrivateLayout from "../(main)/private-layout";

export default function LandingPage() {
  return (
    <>
      <SignedIn>
        <PrivateLayout>
          <Home />
        </PrivateLayout>
      </SignedIn>

      <SignedOut>
        <PublicLayout>
          <main className="flex flex-col">
            <HeroSection />
          </main>
        </PublicLayout>
      </SignedOut>
    </>
  );
}
