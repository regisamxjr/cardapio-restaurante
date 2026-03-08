import  { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent text-white px-8 py-6 flex flex-col items-center justify-center gap-4 font-['Apple_Chancery',_cursive]">
      
      <button 
        className="md:hidden text-[#ab8442] text-2xl mt-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      <nav className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-6 mt-2 md:mt-4 transition-all w-full md:w-auto justify-center`}>
        <a href="#default" className="bg-black/30 hover:bg-[#4d3c1e]/80 text-white border border-[#ab8442] rounded-[10px] px-6 py-2 text-center text-lg no-underline transition-all duration-300 w-full md:w-auto backdrop-blur-sm">Início</a>
        <a href="#cardapio" className="bg-black/30 hover:bg-[#4d3c1e]/80 text-white border border-[#ab8442] rounded-[10px] px-6 py-2 text-center text-lg no-underline transition-all duration-300 w-full md:w-auto backdrop-blur-sm">Menu</a>
        <a href="#contato" className="bg-black/30 hover:bg-[#4d3c1e]/80 text-white border border-[#ab8442] rounded-[10px] px-6 py-2 text-center text-lg no-underline transition-all duration-300 w-full md:w-auto backdrop-blur-sm">Contato</a>
      </nav>
    </header>
  );
};
