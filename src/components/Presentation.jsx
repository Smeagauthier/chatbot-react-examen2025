import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Presentation = () => {
  return (
    <>
    <section id="presentation" className="bg-[#1E1E1E] pt-12 mt-20 px-8 text-center flex flex-col justify-center">
      <div className="max-w-screen-lg mx-auto">

        <motion.h2
          className="text-[2em] sm:text-[2.5em] md:text-[3em] lg:text-[3.5em] xl:text-[4em] font-semibold text-white mb-12 relative inline-block text-center font-calligraphy"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Résumé
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-between text-gray-300">
          <div className="md:w-1/2 md:pr-6 mb-8 md:mb-0 text-justify">
            <p>
              Le <Link to="/chatbot" className="text-[#66D97A] font-extrabold hover:text-[#038118] duration-300 ease">chatbot poétique</Link> fonctionne en utilisant <mark>l’API d'OpenAI fournie par <Link to="https://deepinfra.com/google/codegemma-7b-it/api?example=http" target="_blank" rel="noreferrer" className="font-extrabold duration-300 ease hover:underline">DeepInfra</Link></mark>, configurée dans le code pour générer des réponses sous forme de poèmes. Lorsqu’un utilisateur entre un thème ou une question, une fonction dédiée <mark>nettoie d'abord</mark> son message pour éviter toute <mark>injection</mark> de code. Ensuite, le message est envoyé à l’API, qui retourne une <mark>réponse</mark> sous forme de <mark>poème</mark> en six vers. Cette réponse est créée à partir d'un <mark>prompt prédéfini</mark> et ajustée en fonction du message de l'utilisateur.
            </p>
          </div>

          <div className="md:w-1/2 md:pl-6 text-justify">
            <p>
              L'application, conçue avec <mark><Link to="https://react.dev/" target="_blank" rel="noreferrer" className="font-extrabold duration-300 ease hover:underline">React</Link></mark> pour garantir une gestion optimale des états et une <mark>fluidité</mark> d'utilisation, s’appuie également sur <mark><Link to="https://tailwindcss.com/" target="_blank" rel="noreferrer" className="font-extrabold duration-300 ease hover:underline">Tailwind</Link></mark> pour la mise en forme de l’interface. Cela permet de proposer une expérience visuelle <mark>ergonomique</mark> et <mark>adaptative</mark>. Chaque <mark>interaction</mark> avec le chatbot est <mark>rapide</mark> grâce à une architecture <mark>structurée</mark> et une gestion efficace des états qui assurent la fluidité des <mark>transitions</mark> et des <mark>réponses</mark>.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Presentation;
