import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { api } from '../services/api';
import { Modal } from './Modal';

export const ReviewForm = () => {
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    setIsLoading(true);
    try {
      const reviewData = {
        userId: newReview.name,
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString()
      };

      await api.createReview(reviewData);
      
      setNewReview({ name: '', comment: '', rating: 5 });
      setModalState({
        isOpen: true,
        title: 'Sucesso!',
        message: 'Avaliação enviada com sucesso! Obrigado pelo feedback.',
        type: 'success'
      });
      
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      setModalState({
        isOpen: true,
        title: 'Erro',
        message: 'Erro ao enviar avaliação. Tente novamente mais tarde.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
      <div className="max-w-lg mx-auto bg-[#0f244a]/80 backdrop-blur-sm p-6 rounded-xl border border-[#ab8442] mb-4 font-sans text-left">
        <h3 className="text-xl text-[#ab8442] mb-4 text-center font-['Apple_Chancery',_cursive]">Deixe sua Avaliação</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="footer-name" className="block text-[#ab8442] mb-1 font-bold text-xs uppercase tracking-wide">Seu Nome</label>
            <input
              type="text"
              id="footer-name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="w-full p-2 bg-[#0b1a39] border border-[#ab8442] rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#ab8442] placeholder-gray-500"
              placeholder="Como você quer ser chamado?"
              required
            />
          </div>
          
          <div>
            <label className="block text-[#ab8442] mb-1 font-bold text-xs uppercase tracking-wide">Sua Nota</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                >
                  <Star
                    className={(hoverRating || newReview.rating) >= star ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}
                    size={20}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="footer-comment" className="block text-[#ab8442] mb-1 font-bold text-xs uppercase tracking-wide">Seu Comentário</label>
            <textarea
              id="footer-comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full p-2 bg-[#0b1a39] border border-[#ab8442] rounded text-white text-sm h-20 resize-none focus:outline-none focus:ring-1 focus:ring-[#ab8442] placeholder-gray-500"
              placeholder="Conte-nos como foi sua experiência..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 bg-[#ab8442] text-[#0b1a39] font-bold py-2 px-6 rounded hover:bg-[#c59d5f] transition-colors uppercase tracking-wider text-sm w-full md:w-auto self-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Enviando...' : 'Enviar Avaliação'}
          </button>
        </form>
      </div>
    </>
  );
};
