import React from "react";



const Footer = () => {
  return (

    <div className=" bg-[#2E7D32]  ">
      <div className="flex flex-col sm:flex-row  md:py-[110px]  items-center justify-center ">
        <div className="flex flex-col items-start gap-[16px] h-[180px] w-[400px]  sm:pl-[0px] pl-[48px] ">
          <div className=" flex flex-row gap-[12px]">
              <img src="assets/webp/Logo.webp" alt="EcoMate Logo" className="w-[48px] h-[48px]" />
              <h5 className="text-white text-[26px] font-bold">EcoMate</h5>          
          </div>

          <p className="text-white text-left text-[18px] pr-[16px] ">
            Jl. Ahmad Dahlan no.23, Kebumen, Jawa Tengah 54311 
          </p>
          <div className="flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="bg-white p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <img src="assets/png/whatsapp.png" alt="Whatsapp" className="w-[24px] h-[24px]" />
              </div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="bg-white p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <img src="assets/png/tiktok.png" alt="Tiktok" className="w-[24px] h-[24px]" />
              </div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="bg-white p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <img src="assets/png/instagram.png" alt="Instagram" className="w-[24px] h-[24px]" />
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-cop items-start  sm:flex-row gap-[40px] sm:gap-[62px] w-full sm:w-auto sm:pl-[364px]  ">
          <div className="flex flex-col  items-start text-left gap-[12px]">
            <h2 className="text-white text-lg font-semibold text-[24px]">Kategori</h2>
            <div className="flex flex-col gap-[12px] ">
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Baju</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Sepatu</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Sandal</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Perabotan</a>
            </div>
          </div>

          <div className="flex flex-col items-start text-left gap-[12px] px-[61px]">
            <h2 className="text-white text-lg font-semibold text-[24px]  ">Tantangan</h2>
            <div className="flex flex-col gap-[12px] ">
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Energy Saver</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Plastic Free</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Green Communate</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Tree Challenge</a>
            </div>
          </div>
        </div>
            <div className="flex flex-col text-left gap-[12px] pr-[292px] sm:pr-[0px] pl-[48px] pb-[48px] sm:pb-[0px] ">
              <h2 className="text-white text-lg font-semibold text-[24px]">Ecomate</h2>
              <div className="flex flex-col gap-[12px] ">
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Beranda</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Tentang</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Belanja</a>
              <a href="#" className="text-white text-[18px] hover:text-gray-200">Tantangan</a>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Footer;