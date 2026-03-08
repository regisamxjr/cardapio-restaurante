import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
}

export const Modal = ({ isOpen, onClose, title, message, type = 'success' }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#0f244a] border-2 border-[#ab8442] rounded-xl w-full max-w-md shadow-[0_0_30px_rgba(171,132,66,0.3)] transform transition-all animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-4 border-b border-[#ab8442]/30">
          <h3 className="text-xl font-bold text-[#ab8442] font-['Apple_Chancery',_cursive]">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center text-center">
          {type === 'success' ? (
            <CheckCircle size={64} className="text-green-500 mb-6" />
          ) : (
            <AlertCircle size={64} className="text-red-500 mb-6" />
          )}
          
          <p className="text-white text-lg mb-8">{message}</p>

          <button
            onClick={onClose}
            className="bg-[#ab8442] text-[#0b1a39] font-bold py-3 px-8 rounded hover:bg-[#c59d5f] transition-colors w-full uppercase tracking-wider"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
