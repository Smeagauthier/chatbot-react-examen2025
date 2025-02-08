import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; 
import ContactButton from './ContactButton';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <>
    <section id="contact" className="bg-[#1E1E1E] mt-20 pt-12 px-8 text-center flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl px-4">

        <motion.h2
          className="text-[2em] sm:text-[2.5em] md:text-[3em] lg:text-[3.5em] xl:text-[4em] font-semibold text-white mb-12 relative inline-block text-center font-calligraphy"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Contact
        </motion.h2>

        {/* Chaque bouton est un composant ContactButton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
          <ContactButton
            icon={faGithub}
            label="Profil GitHub"
            link="https://github.com/Smeagauthier"
            tooltipText="GitHub"
            isExternal={true}
          />
          <ContactButton
            icon={faLinkedin}
            label="Profil LinkedIn"
            link="https://www.linkedin.com/in/gauthier-rigaux-402156288/"
            tooltipText="LinkedIn"
            isExternal={true}
          />
          <ContactButton
            icon={faEnvelope}
            label="Adresse email"
            link="mailto:rigauxgauthier@gmail.com"
            tooltipText="Email"
            isExternal={false}
          />
          <ContactButton
            icon={faGlobe}
            label="Mon portfolio"
            link="https://portfolio.rigauxgauthier.com/"
            tooltipText="Portfolio"
            isExternal={true}
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;
