import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { api } from '../services/api';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  userId?: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "João Silva",
    rating: 5,
    comment: "Comida excelente e ambiente muito agradável! O Steak estava no ponto perfeito.",
    date: "2024-03-01"
  },
  {
    id: 2,
    name: "Maria Oliveira",
    rating: 4,
    comment: "Adorei as sobremesas, especialmente o Brownie. O atendimento foi um pouco lento, mas valeu a pena.",
    date: "2024-02-28"
  },
  {
    id: 3,
    name: "Carlos Santos",
    rating: 5,
    comment: "Melhor restaurante da cidade! A carta de vinhos é espetacular.",
    date: "2024-02-25"
  }
];

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const backendReviews = await api.getReviews();
      if (Array.isArray(backendReviews) && backendReviews.length > 0) {
        // Map backend reviews to our interface if necessary
        // Assuming backend returns matching structure or we adapt
        const formattedReviews = backendReviews.map((r: any) => ({
          id: r.id,
          name: r.name || r.userId || 'Anônimo', // Fallback for name
          rating: r.rating,
          comment: r.comment,
          date: r.date
        }));
        setReviews(formattedReviews);
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      // Fallback to initialReviews is already set
    }
  };

  return (
    <section className="bg-[#0b1a39] py-16 px-8 border-t-2 border-[#ab8442]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[35px] mb-12 text-center text-[#ab8442] font-['Apple_Chancery',_cursive]">Avaliações dos Clientes</h2>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review) => (
              <div key={review.id} className="bg-[#0f244a] p-6 rounded-lg border border-[#ab8442]/30 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-[#ab8442] font-bold text-lg">{review.name}</h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}
                        size={14}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic mb-4 flex-grow">"{review.comment}"</p>
                <span className="text-sm text-gray-500 mt-auto">{new Date(review.date).toLocaleDateString('pt-BR')}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
