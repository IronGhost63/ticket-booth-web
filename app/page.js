import Image from "next/image";
import Link from "next/link";
import Layout from "@/app/ui/layout/main";
import heroImage from "@/public/home-hero.jpg";

export default function Home() {
  return (
    <Layout className="home-screen">
      <main>
        <div className="hero">
          <div className="hero-background">
            <Image src={heroImage} className="hero-image" alt=""/>
          </div>
          <div className="hero-content">
            <div className="main-container">
              <h1 className="title">Enjoy Singing Cats</h1>
              <p className="description">A concert performed by cats is pure, joyful chaos—dramatic leaps, swishing tails, and bold “meow” solos. Some strut like superstars, others pounce on instruments as if they’re prey. It’s unpredictable, mischievous, and wildly entertaining from start to finish.</p>
              <Link href="/concerts/1" className="button outlined dark w-auto">Get ticket!</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
