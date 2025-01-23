import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
        <div className="bg-[#1E1E1E] text-white min-h-screen">

        <Navbar />
        
        <section id="presentation" className="py-16 px-8 text-center">
            <h2 className="text-4xl font-bold text-[#66D97A] mb-6">Bienvenue dans Mon Chatbot</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Découvrez une expérience de conversation en vers poétiques. Notre chatbot unique génère des poèmes philosophiques
            sur mesure, en fonction des thèmes que vous lui donnez. Que vous soyez inspiré par la nature, l'amour ou la philosophie, 
            laissez notre bot vous surprendre avec des réponses en rimes riches et poétiques.
            </p>
        </section>

        <section id="contact" className="bg-gray-800 py-16 px-8 text-center">
            <h2 className="text-3xl font-bold text-[#66D97A] mb-6">Contactez-nous</h2>
            <p className="max-w-xl mx-auto text-gray-400">
            Pour toute question, suggestion ou retour, vous pouvez nous contacter via nos réseaux sociaux ou simplement apprécier 
            la poésie générée par notre bot !
            </p>
        </section>

        <Footer />
        </div>
    </>
  );
};

export default Home;
