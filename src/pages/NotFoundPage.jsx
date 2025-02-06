import { Link } from "react-router-dom"; 

const NotFound = () => {
  return (
    <>
      <section id="notFound" className="bg-[#1E1E1E] mt-20 pt-5 px-8 text-center h-[80vh]">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-[3em] sm:text-[2em] md:text-[3em] lg:text-[4em] xl:text-[4em] font-semibold text-white mb-12 relative inline-block text-center">
            Page Introuvable
          </h2>
          <p>
            La page que vous recherchez n'existe pas ou plus. Veuillez vérifier l'URL ou revenir à l'
            <Link 
              to="/" 
              className="text-[#66D97A] font-semibold hover:text-[white] underline transition-all duration-200"
            >
              accueil
            </Link>.
          </p>
        </div>
      </section>
    </>
  );
};

export default NotFound;
