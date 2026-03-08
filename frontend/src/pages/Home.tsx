import { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { MenuSection } from '../components/MenuSection';
import { DrinkCategory } from '../components/DrinkSection';
import { Footer } from '../components/Footer';
import { ReviewsSection } from '../components/ReviewsSection';
import { mainCourses, desserts, drinks } from '../data/menu';

export function Home() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'main' | 'dessert' | 'drinks'>('all');

  const filterButtonClass = (category: string) => `
    px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-all duration-300 border border-[#ab8442]
    ${activeCategory === category 
      ? 'bg-[#ab8442] text-[#0b1a39] shadow-[0_0_15px_rgba(171,132,66,0.4)]' 
      : 'bg-transparent text-[#ab8442] hover:bg-[#ab8442]/10 hover:text-[#c4a05f]'}
  `;

  return (
    <div className="min-h-screen bg-[#0b1a39] font-['Apple_Chancery',_cursive] scroll-smooth">
      <Header />
      
      <main>
        <Hero />

        <div className="bg-[#0b1a39] py-8 px-4 flex justify-center gap-4 flex-wrap">
           <button onClick={() => setActiveCategory('all')} className={filterButtonClass('all')}>Todos</button>
           <button onClick={() => setActiveCategory('main')} className={filterButtonClass('main')}>Pratos Principais</button>
           <button onClick={() => setActiveCategory('dessert')} className={filterButtonClass('dessert')}>Sobremesas</button>
           <button onClick={() => setActiveCategory('drinks')} className={filterButtonClass('drinks')}>Bebidas</button>
        </div>

        <section id="cardapio" className="bg-[#0b1a39] py-16 px-8 min-h-[50vh]">
          {(activeCategory === 'all' || activeCategory === 'main') && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MenuSection title="Pratos Principais" items={mainCourses} />
            </div>
          )}
          
          {(activeCategory === 'all' || activeCategory === 'dessert') && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MenuSection title="Sobremesas" items={desserts} />
            </div>
          )}

          {(activeCategory === 'all' || activeCategory === 'drinks') && (
            <article className="bebidas animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DrinkCategory title="Vinhos" items={drinks.wines} />
              <DrinkCategory title="Drinks" items={drinks.cocktails} />
              <DrinkCategory title="Champagne" items={drinks.champagnes} />
            </article>
          )}
        </section>

        <ReviewsSection />
      </main>

      <Footer />
    </div>
  );
}
