import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-2xl font-bold">About</h1>
        <p>Over ons</p>
      </div>
      <Footer />
    </main>
  );
}
