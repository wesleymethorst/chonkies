import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-[#FFF275] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-4xl sm:text-6xl font-luckiest-guy text-[#FF5CA2] leading-tight">
        ONTDEK DE WERELD VAN <br /> CHONKIES
      </h1>
      <button className="mt-2 bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white text-lg sm:text-xl font-poppins font-bold py-3 px-6 rounded-lg transition-all">
        ONTDEK NU
      </button>
      </div>
      <div className="bg-[#F8F8F8] py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shop Chonkies */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 text-center">
          <h2 className="text-[#3B5FFF] font-luckiest-guy text-2xl mb-4">SHOP CHONKIES</h2>
          <Image src="/images/stitch.png" alt="Shop Chonkies" width={200} height={200} />
          <button className="mt-6 bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-2 px-4 rounded-lg">
            SHOP NU
          </button>
        </div>

        {/* Over Chonkies */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 text-center">
          <h2 className="text-[#1E1E1E] font-luckiest-guy text-2xl mb-4">OVER CHONKIES</h2>
          <Image src="/images/moonknight.png" alt="Over Chonkies" width={200} height={200} />
          <button className="mt-6 bg-[#1E1E1E] hover:bg-[#333] text-white font-poppins font-bold py-2 px-4 rounded-lg">
            LEES MEER
          </button>
        </div>

        {/* Uitverkoop */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 text-center">
          <h2 className="text-[#FF5CA2] font-luckiest-guy text-2xl mb-4">UITVERKOOP</h2>
          <Image src="/images/yubaba.png" alt="Uitverkoop" width={200} height={200} />
          <button className="mt-6 bg-[#FF5CA2] hover:bg-[#e94b91] text-white font-poppins font-bold py-2 px-4 rounded-lg">
            SCOOR DEALS
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
