
export const Hero = () => {
  return (
    <section 
      id="default" 
      className="bg-cover bg-center py-[19.5rem] px-8 text-center text-2xl relative"
      style={{ backgroundImage: "url('/img/logo/logomoonight.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10">
        {/* Content if any, original had none but padding implied size */}
      </div>
    </section>
  );
};
