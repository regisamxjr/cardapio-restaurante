
interface DrinkItemProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

const DrinkItem = ({ name, description, price, image }: DrinkItemProps) => (
  <div className="flex flex-col items-center p-4 bg-[#0b1a39] rounded-[10px] w-full md:w-[45%] text-center mb-8 text-[1.1rem] border-b-2 border-[#ab8442]">
    <h3 className="text-[1.5rem] text-[#ddd] mb-2 font-['Apple_Chancery',_cursive]">{name}</h3>
    <p className="text-[1rem] text-[#ddd] mb-4 font-['Apple_Chancery',_cursive]">{description}</p>
    <p className="text-[1.3rem] font-bold text-[#ab8442] font-['Apple_Chancery',_cursive]">R$ {price.toFixed(2).replace('.', ',')}</p>
    <img src={image} alt={name} className="w-full h-[200px] object-cover rounded-lg mt-4" />
  </div>
);

interface DrinkCategoryProps {
  title: string;
  items: DrinkItemProps[];
}

export const DrinkCategory = ({ title, items }: DrinkCategoryProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-[2rem] text-[#ab8442] text-center mb-4 font-['Apple_Chancery',_cursive]">{title}</h2>
      <div className="flex flex-wrap justify-evenly max-w-[1200px] mx-auto gap-4">
        {items.map((item, index) => (
          <DrinkItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
