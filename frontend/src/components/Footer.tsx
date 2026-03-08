import { FaEnvelope, FaPhone } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer id="contato" className="bg-[#0b1a39] text-[#ab8442] p-4 text-center border-t-2 border-[#ab8442] font-['Apple_Chancery',_cursive]">
      <h2 className="text-2xl mb-4 text-[#ab8442]">Contato:</h2>
      <p className="text-lg mb-2 text-white flex justify-center items-center gap-2">
        <FaEnvelope className="text-[#ab8442]" /> 
        <a href="mailto:contato@moonight.com" className="text-white font-bold hover:text-[#4d3c1e] transition-colors">contato@moonight.com</a>
      </p>
      <p className="text-lg mb-2 text-white flex justify-center items-center gap-2">
        <FaPhone className="text-[#ab8442]" />
        (55) 1234-5678
      </p>
    </footer>
  );
};
