import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DrinkCategory } from './components/DrinkSection';
import { Footer } from './components/Footer';
import { mainCourses, desserts, drinks } from './data/menu';

function App() {
  return (
    <div className="min-h-screen bg-[#0b1a39] font-['Apple_Chancery',_cursive] scroll-smooth">
      <Header />
      
      <main>
        <Hero />

        <section id="cardapio" className="bg-[#0b1a39] py-16 px-8">
          <MenuSection title="Pratos Principais" items={mainCourses} />
          
          <MenuSection title="Sobremesas" items={desserts} />

          <article className="bebidas">
            <DrinkCategory title="Vinhos" items={drinks.wines} />
            <DrinkCategory title="Drinks" items={drinks.cocktails} />
            <DrinkCategory title="Champagne" items={drinks.champagnes} />
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
