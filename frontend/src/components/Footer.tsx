import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import { ReviewForm } from './ReviewForm';

interface FooterProps {
  showReviewForm?: boolean;
}

export const Footer = ({ showReviewForm = true }: FooterProps) => {
  return (
    <footer id="contato" className="bg-[#0b1a39] text-[#ab8442] p-8 text-center border-t-2 border-[#ab8442] font-['Apple_Chancery',_cursive]">
      {showReviewForm && <ReviewForm />}
      
      <div className="mt-8 pt-8 border-t border-[#ab8442]/30">
        <h2 className="text-2xl mb-4 text-[#ab8442]">Contato</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <p className="text-lg text-white flex justify-center items-center gap-2">
            <Mail className="text-[#ab8442]" size={20} /> 
            <a href="mailto:contato@moonight.com" className="text-white font-bold hover:text-[#4d3c1e] transition-colors">contato@moonight.com</a>
          </p>
          <p className="text-lg text-white flex justify-center items-center gap-2">
            <Phone className="text-[#ab8442]" size={20} />
            (55) 1234-5678
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#ab8442] hover:text-[#c4a05f] transition-colors transform hover:scale-110">
            <Instagram size={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#ab8442] hover:text-[#c4a05f] transition-colors transform hover:scale-110">
            <Facebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#ab8442] hover:text-[#c4a05f] transition-colors transform hover:scale-110">
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};
