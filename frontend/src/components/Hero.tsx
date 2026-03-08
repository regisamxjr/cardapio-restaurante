
export const Hero = () => {
  return (
    <section 
      id="default" 
      className="h-[100dvh] w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img/logo/logomoonight.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
      </div>
    </section>
  );
};
