import Image from "next/image";

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 dark:border-gray-700 font-poppins">
    {/* Top Bar */}
    <div className="bg-[#3B5FFF] flex justify-between items-center px-6 py-4">
      <div className="text-[#FF5CA2] font-extrabold text-2xl font-luckiest-guy">CHONKIES</div>
      <div className="flex gap-4">
        <a href="#" aria-label="X">
          {/* X (Twitter) SVG */}
          <svg width="32" height="32" className="text-[#FF5CA2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.857 10.612 22 2h-1.884l-6.01 7.198L9.025 2H2.5l7.5 11.096L2 22h1.884l6.387-7.639L15.116 22H21.5l-6.643-11.388zM11.824 13.5l-.739-1.12L4.351 3.5h3.854l5.04 7.641.739 1.12L19.659 20.5h-3.854l-3.981-7z"/>
          </svg>
        </a>
        <a href="#" aria-label="Facebook">
          {/* Facebook SVG */}
          <svg width="32" height="32" className="text-[#FF5CA2]" viewBox="0 0 24 24" fill="none">
            <path fill="currentColor" d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 17 22 12"/>
          </svg>
        </a>
        <a href="#" aria-label="Instagram">
          {/* Instagram SVG */}
          <svg width="32" height="32" className="text-[#FF5CA2]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm10 2c1.1 0 2 .9 2 2v1h-2V4zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z"/>
          </svg>
        </a>
      </div>
    </div>

    {/* Bottom Info */}
    <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 text-black text-sm font-semibold">
      <p className="text-left">©{new Date().getFullYear()} Chonkies. All Rights Reserved.</p>
      <div className="flex gap-6 mt-2 sm:mt-0">
        <a href="#">Contact</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
    </div>
  </footer>
)

export default Footer;
