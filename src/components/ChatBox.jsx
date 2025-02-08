import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClearButton from './ClearButton';
import MessageList from './MessageList';
import InputSection from './InputSection';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  //Le chatbot est en train d'écrire
  const [isLoading, setIsLoading] = useState(false);
  
  // Récupérer la conversation enregistrée dans localStorage lors du chargement de la page
  useEffect(() => {
    const savedConversation = localStorage.getItem('conversation');
    if (savedConversation) {
      setMessages(JSON.parse(savedConversation));
    }
  }, []);
  
  // Sauvegarder les messages dans localStorage à chaque nouveau message
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('conversation', JSON.stringify(messages));
    }
  }, [messages]);
  
  // Mettre à jour l'input
  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };
  
  // Fonction pour nettoyer l'entrée utilisateur des caractères spéciaux
  const nettoyerEntree = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };
  
  // Fonction principale pour envoyer le message et obtenir la réponse du chatbot sous forme de poème
  const sendMessage = async () => {

    // Vérifier si l'input est vide
    if (!userInput.trim()) return;
    
    // Nettoyer l'entrée
    const cleanedInput = nettoyerEntree(userInput);
    
    // Ajouter le message de l'utilisateur à la liste des messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: `Vous : ${cleanedInput}` },
    ]);
    
    setUserInput('');
    setIsLoading(true);
    
    // Vérification avec reCAPTCHA v3 avant l'envoi de la requête à l'API
    try {
      window.grecaptcha.ready(function() {
        window.grecaptcha.execute('6LeoDM8qAAAAAP1o3q1Er77H0iPz2IGavY6Ik1UJ', { action: 'submit' }).then(async function(token) {
          
          const prompt = `Écris un poème en 6 vers sur le thème suivant : "${userInput}". N'utilise que des vers poétiques. Les vers doivent obligatoirement avoir des rimes riches entre eux et doivent avoir un sens philosophique. Je veux que tu prennes en compte la phonétique des mots. Voici un exemple pour t'inspirer :
          "Nous étions quelques gamins en quatre-vingt,
          Quatre copains en chemin,
          Construisant leur destin de délires souterrains,
          Nos mains étaient des poings et l'avenir, un tremplin."
          Maintenant, crée ton poème sur le thème "${userInput}".`;
          
          // Requête à l'API pour générer un poème avec axios
          try {
            const response = await axios.post('https://api.deepinfra.com/v1/openai/chat/completions', {
              model: 'meta-llama/Meta-Llama-3.1-405B-Instruct',
              messages: [{ role: 'user', content: prompt }],
            }, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer LfL2T3VsHXZ6tegNML6vEOrqYBDxoBnW',
              },
            });
            
            // Traiter la reponse de l'API (est-ce qu'elle existe ? Si oui, on la traite, si non on affiche un message "aucun résultat" ou une erreur)
            if (response.data.choices && response.data.choices.length > 0) {
              const generatedPoem = nettoyerTextePoeme(response.data.choices[0].message.content.trim());
              setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'bot', content: `Chatbot : ${generatedPoem}` },
              ]);
            } else {
              setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'bot', content: 'Chatbot : Aucun résultat de l\'API.' },
              ]);
            }
          } catch (error) {
            console.error('Erreur lors de la génération du poème:', error);
            setMessages((prevMessages) => [
              ...prevMessages,
              { role: 'bot', content: 'Erreur lors de la génération du poème.' },
            ]);
          } finally {
            setIsLoading(false);
          }
        });
      });
    } catch (error) {
      console.error('Erreur lors de l\'exécution de reCAPTCHA:', error);
      setIsLoading(false);
    }
  };
  
  // Nettoyer le texte du poème reçu en supprimant les caractères spéciaux et en formatant les lignes
  const nettoyerTextePoeme = (poem) => {
    return poem
    .replace(/[{}*/\\;]/g, '')
    .replace(/"""|return/g, '')
    .replace(/(\r\n|\n|\r)/gm, '<br>')
    .trim();
  };
  
  // Bouton pour effacer la conversation et la supprimer de localStorage
  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('conversation');
  };
  
  return (
    <div id="chatbox">
    <div className="chatbox-header">
    <div className="clear-btn-container">
    <ClearButton 
    onClear={clearConversation}
    disabled={isLoading}
    />
    </div>
    <p className="intro">Posez votre thème et recevez des réponses en vers.</p>
    </div>
    
    <MessageList 
    messages={messages} 
    isLoading={isLoading}  
    />
    
    <InputSection
    id="inputSection"
    userInput={userInput}
    onUserInputChange={handleUserInputChange}
    sendMessage={sendMessage}
    isLoading={isLoading}
    />
    </div>
  );
};

export default ChatBox;
