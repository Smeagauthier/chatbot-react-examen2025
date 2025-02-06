import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';

const Home = () => {
  const words = [
    "Écrire", "le", "monde", "grâce", "au", "chatbot", "poétique"
  ];

  return (
    <>
    <section className="relative w-full min-h-[80vh] mt-20 pt-5 flex items-center justify-center text-white overflow-hidden px-4 sm:px-6 lg:px-8 intro-section">
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl space-y-6 sm:space-y-8">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-calligraphy">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1, 
                duration: 1.5, 
                ease: "easeOut",
                type: "spring",
                stiffness: 70,
                damping: 15
              }}
              className="inline-block mr-5 mt-2 mb-2 font-calligraphy"
            >
              {word}{" "}
            </motion.span>
          ))}
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl">
          En manque d'<mark>inspiration</mark> ? Problème de la <mark>page blanche</mark> ? Laissez-vous guider par le <mark className="text-[#66D97A]">chatbot poétique</mark> ! Mêlant <mark>technologie</mark> et <mark>poésie</mark>, ce chatbot vous permettra de trouver des idées de sujets, de rédiger des poèmes, ou même de vous inspirer pour vos propres <mark>créations littéraires</mark>.
        </p>

        <div className="mt-6 sm:mt-8">
          <Link to="/chatbot">
            <button className="bg-[#66D97A] px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-[#038118] transition duration-300 ease-in-out font-semibold uppercase">
              Découvrir
            </button>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;
