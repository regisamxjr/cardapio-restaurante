
interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

const MenuItem = ({ name, description, price, image }: MenuItemProps) => (
  <div className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[10px] bg-[#0b1a39] w-full text-left mb-8 text-[1.2rem] border-b-2 border-[#ab8442]">
    <div className="flex-1">
      <h3 className="text-[1.8rem] mb-4 text-[#ddd] font-['Apple_Chancery',_cursive]">{name}</h3>
      <p className="mb-4 text-[1.1rem] text-[#ddd] font-['Apple_Chancery',_cursive]">{description}</p>
      <p className="text-4xl font-bold text-[#ab8442] font-['Apple_Chancery',_cursive]">R$ {price}</p>
    </div>
    <img src={image} alt={name} className="w-full md:w-[30%] h-auto rounded-lg md:ml-8 mt-4 md:mt-0 self-center md:self-end object-cover" />
  </div>
);

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
  id?: string;
}

export const MenuSection = ({ title, items, id }: MenuSectionProps) => {
  return (
    <article className="mb-12 max-w-[1200px] mx-auto" id={id}>
      <h2 className="text-[35px] mb-4 text-center text-[#ab8442] font-['Apple_Chancery',_cursive]">{title}</h2>
      <div className="block">
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </article>
  );
};
