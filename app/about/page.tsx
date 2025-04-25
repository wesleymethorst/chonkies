import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-4xl font-luckiest-guy text-[#3B5FFF] mb-4">Over Chonkies</h1>
        <div className="max-w-2xl text-center text-lg text-gray-800">
          <div className="flex justify-center mb-6">
            <Image
              src="/products/horror/art-the-clown-bloody-1.png"
              alt="Chonkies mascotte"
              width={120}
              height={120}
              className="rounded-full shadow-lg bg-[#FFF275] p-2"
            />
          </div>
          <p className="mb-4">
            <span className="font-bold text-[#FF5CA2]">Chonkies</span> is dé plek voor unieke, dikke <b>Funko Pops</b> met karakter. Wij geloven dat verzamelen leuk, vrolijk en een beetje eigenwijs mag zijn!
          </p>
          <h2 className="text-xl font-bold text-[#3B5FFF] mb-2 mt-6">Ons verhaal</h2>
          <p className="mb-4">
            Chonkies is ontstaan uit liefde voor Funko Pops, popcultuur en design. Wat begon als een kleine verzameling groeide uit tot een webshop waar iedereen zijn favoriete chonky Pop kan vinden. We selecteren elk product met zorg en een glimlach.
          </p>
          <h2 className="text-xl font-bold text-[#3B5FFF] mb-2 mt-6">Onze missie</h2>
          <p className="mb-4">
            Wij willen Funko-verzamelaars blij maken met originele, vrolijke en kwalitatieve producten. Of je nu net begint of al een muur vol Pops hebt: bij Chonkies vind je altijd iets bijzonders.
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#3B5FFF] mb-2">Onze kernwaarden</h2>
            <ul className="list-none flex flex-col gap-2 items-center">
              <li className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#FF5CA2]" />
                <span className="text-sm text-[#FF5CA2] font-semibold">Uniek bij Chonkies</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#3B5FFF]" />
                <span className="text-sm text-[#3B5FFF] font-semibold">Snelle levering</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#FFF275]" />
                <span className="text-sm text-[#FFF275] font-semibold">Altijd met een glimlach</span>
              </li>
            </ul>
          </div>
          <h2 className="text-xl font-bold text-[#3B5FFF] mb-2 mt-6">Onze belofte aan jou</h2>
          <p className="mb-4">
            Bestel je bij Chonkies, dan krijg je niet alleen een uniek product, maar ook persoonlijke service en een snelle levering. We pakken alles met zorg in, zodat jouw Pop veilig en vrolijk aankomt.
          </p>
          <p className="mb-6">
            Heb je vragen, tips of wil je gewoon je collectie delen? <a href="mailto:info@chonkies.nl" className="text-[#FF5CA2] underline hover:text-[#3B5FFF]">Mail ons gerust</a> of stuur een DM via social media!
          </p>
          <a
            href="/shop"
            className="inline-block bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-bold py-2 px-6 rounded-lg transition-all shadow"
          >
            Bekijk onze shop
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
