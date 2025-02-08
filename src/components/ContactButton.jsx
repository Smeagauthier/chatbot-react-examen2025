import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Le composant ContactButton prend en entrée les propriétés suivantes pour définir quelle icone, quel label, quel lien et si le lien est externe ou non (pour redirection vers un autre site).
const ContactButton = ({ icon, label, link, isExternal }) => {
  const handleClick = () => {
    if (isExternal) {
      window.open(link, '_blank', 'noopener,noreferrer'); //Pour ne pas transférer le contexte de la page actuelle vers la nouvelle page.
    } else {
      window.location.href = link;
    }
  };

  return (
    <>
    <div
      className="flex flex-col items-center relative cursor-pointer w-full max-w-[400px] min-w-[200px] md:max-w-[60%] lg:max-w-[60%] transform transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <label className="bg-[#2a2a2a] flex items-center p-4 rounded-lg w-full text-left text-gray-700 transition-shadow hover:shadow-lg hover:shadow-[#66D97A]/30 duration-500 ease">
        <div className="flex items-center w-full justify-between">
          <FontAwesomeIcon icon={icon} className="mr-3 text-[#333] text-lg sm:text-xl md:text-2xl" />
          <div className="border-r border-white h-4 mx-0" />
          <span
            className="bg-transparent border-none pl-3 w-full text-sm sm:text-base md:text-lg font-semibold text-white focus:outline-none hover:underline text-center whitespace-nowrap"
            title={label}
          >
            {label}
          </span>
        </div>
      </label>
    </div>
    </>
  );
};

export default ContactButton;
