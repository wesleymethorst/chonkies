import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      {/* Hero sectie */}
      <section className="bg-[#FFF275] flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl sm:text-6xl font-luckiest-guy text-[#FF5CA2] leading-tight mb-4">
          ONTDEK DE WERELD VAN <br /> CHONKIES
        </h1>
        <p className="max-w-xl mx-auto text-lg sm:text-xl text-[#3B5FFF] font-poppins mb-6">
          De leukste, dikste en meest unieke <b>Funko Pops</b> van Nederland! Verzamel ze allemaal of geef ze cadeau.
        </p>
        <Link href="/shop">
          <button className="mt-2 bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white text-lg sm:text-xl font-poppins font-bold py-3 px-6 rounded-lg transition-all">
            ONTDEK NU
          </button>
        </Link>
      </section>

      {/* USP's */}
      <section className="bg-[#F8F8F8] py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            {/* Gratis verzending */}
            <div className="flex justify-center mb-2">
              <span className="inline-flex items-center justify-center rounded-full bg-[#FFF275] w-20 h-20">
                <Image src="/svg/truck.svg" alt="Gratis verzending" width={48} height={48} />
              </span>
            </div>
            <h3 className="font-bold text-[#3B5FFF] mb-1">Gratis verzending</h3>
            <p className="text-gray-600 text-sm">Bij bestellingen vanaf €40</p>
          </div>
          <div>
            {/* Unieke collectie */}
            <div className="flex justify-center mb-2">
              <span className="inline-flex items-center justify-center rounded-full bg-[#FF5CA2] w-20 h-20">
                <Image src="/svg/star.svg" alt="Unieke collectie" width={48} height={48} />
              </span>
            </div>
            <h3 className="font-bold text-[#FF5CA2] mb-1">Unieke collectie</h3>
            <p className="text-gray-600 text-sm">Alleen bij Chonkies verkrijgbaar</p>
          </div>
          <div>
            {/* Snelle levering */}
            <div className="flex justify-center mb-2">
              <span className="inline-flex items-center justify-center rounded-full bg-[#3B5FFF] w-20 h-20">
                <Image src="/svg/clock.svg" alt="Snelle levering" width={48} height={48} />
              </span>
            </div>
            <h3 className="font-bold text-[#1E1E1E] mb-1">Snelle levering</h3>
            <p className="text-gray-600 text-sm">Vandaag besteld, morgen in huis</p>
          </div>
        </div>
      </section>

      {/* Uitgelichte producten */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-luckiest-guy text-center text-[#3B5FFF] mb-10">Onze favorieten</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Captain America */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 text-center border-2 border-[#FFF275] hover:shadow-2xl transition">
            <div className="w-full flex justify-center mb-4">
              <div className="bg-[#F8F8F8] rounded-xl p-4 flex items-center justify-center shadow-inner">
                <Image src="/products/marvel/captain-america-1.png" alt="Captain America" width={160} height={160} className="object-contain" />
              </div>
            </div>
            <h3 className="font-luckiest-guy text-2xl text-[#3B5FFF] mb-1">Captain America</h3>
            <p className="text-gray-600 text-sm mb-4">De heldhaftige Captain America als Funko Pop.</p>
            <Link href="/shop">
              <button className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-2 px-6 rounded-lg transition-all shadow">
                Bekijk
              </button>
            </Link>
          </div>
          {/* Terrifier */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 text-center border-2 border-[#FFF275] hover:shadow-2xl transition">
            <div className="w-full flex justify-center mb-4">
              <div className="bg-[#F8F8F8] rounded-xl p-4 flex items-center justify-center shadow-inner">
                <Image src="/products/horror/art-the-clown-bloody-1.png" alt="Terrifier" width={160} height={160} className="object-contain" />
              </div>
            </div>
            <h3 className="font-luckiest-guy text-2xl text-[#3B5FFF] mb-1">Terrifier</h3>
            <p className="text-gray-600 text-sm mb-4">Voor wie durft! Stoer en uniek als Funko Pop.</p>
            <Link href="/shop">
              <button className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-2 px-6 rounded-lg transition-all shadow">
                Bekijk
              </button>
            </Link>
          </div>
          {/* Belle */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 text-center border-2 border-[#FFF275] hover:shadow-2xl transition">
            <div className="w-full flex justify-center mb-4">
              <div className="bg-[#F8F8F8] rounded-xl p-4 flex items-center justify-center shadow-inner">
                <Image src="/products/disney/belle-1.png" alt="Belle" width={160} height={160} className="object-contain" />
              </div>
            </div>
            <h3 className="font-luckiest-guy text-2xl text-[#3B5FFF] mb-1">Belle</h3>
            <p className="text-gray-600 text-sm mb-4">Onze schattigste Funko Pop, altijd vrolijk!</p>
            <Link href="/shop">
              <button className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-2 px-6 rounded-lg transition-all shadow">
                Bekijk
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Over Chonkies */}
      <section className="bg-[#FFF275] py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <Image src="/images/art-the-clown-bloody-1.png" alt="Over Chonkies" width={200} height={200} className="mb-6 md:mb-0" />
          <div>
            <h2 className="text-2xl font-luckiest-guy text-[#FF5CA2] mb-2">Over Chonkies</h2>
            <p className="text-[#3B5FFF] font-poppins mb-4">
              Chonkies is dé plek voor unieke, dikke <b>Funko Pops</b> met karakter. Elk ontwerp is met liefde gekozen en brengt een glimlach op je gezicht. Of je nu jong bent of jong van hart, bij ons vind je altijd een Funko Pop die bij je past!
            </p>
            <Link href="/about">
              <button className="bg-[#1E1E1E] hover:bg-[#333] text-white font-poppins font-bold py-2 px-4 rounded-lg">
                Meer over ons
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
