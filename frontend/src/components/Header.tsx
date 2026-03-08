import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent text-white px-8 py-6 flex flex-col items-center justify-center gap-6 font-['Apple_Chancery',_cursive] transition-all duration-300">
      
      <button 
        className="md:hidden text-[#ab8442] hover:text-[#c4a05f] transition-colors p-2 rounded-full hover:bg-black/30"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <nav className={`${isOpen ? 'flex animate-in fade-in slide-in-from-top-4' : 'hidden'} md:flex flex-col md:flex-row items-center gap-8 mt-2 md:mt-0 transition-all w-full md:w-auto justify-center bg-black/80 md:bg-transparent p-6 md:p-0 rounded-xl md:rounded-none border md:border-none border-[#ab8442]/30`}>
        {isHome ? (
          <>
            <a href="#default" className="text-lg text-gray-200 hover:text-[#ab8442] transition-colors duration-300 font-bold tracking-wider uppercase text-sm md:text-base relative group">
              Início
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ab8442] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#cardapio" className="text-lg text-gray-200 hover:text-[#ab8442] transition-colors duration-300 font-bold tracking-wider uppercase text-sm md:text-base relative group">
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ab8442] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contato" className="text-lg text-gray-200 hover:text-[#ab8442] transition-colors duration-300 font-bold tracking-wider uppercase text-sm md:text-base relative group">
              Contato
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ab8442] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </>
        ) : (
          <Link to="/" className="text-lg text-gray-200 hover:text-[#ab8442] transition-colors duration-300 font-bold tracking-wider uppercase text-sm md:text-base relative group">
            Voltar ao Início
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ab8442] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        )}
        
        <Link to="/reserva" className="text-lg text-gray-200 hover:text-[#ab8442] transition-colors duration-300 font-bold tracking-wider uppercase text-sm md:text-base relative group">
          Fazer Reserva
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ab8442] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>
    </header>
  );
};
