import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClearButton from './ClearButton';
import MessageList from './MessageList';
import InputSection from './InputSection';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Restaurer la conversation depuis le localStorage lors du chargement
  useEffect(() => {
    const savedConversation = localStorage.getItem('conversation');
    console.log('Conversation dans localStorage:', savedConversation);
    if (savedConversation) {
      setMessages(JSON.parse(savedConversation));
    }
  }, []);

  // Sauvegarder la conversation dans le localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('conversation', JSON.stringify(messages));
    }
  }, [messages]);

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const nettoyerEntree = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const cleanedInput = nettoyerEntree(userInput);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: `Vous : ${cleanedInput}` },
    ]);

    setUserInput('');
    setIsLoading(true);

    try {
      const prompt = `Écris un poème en 6 vers sur le thème suivant : "${userInput}". N'utilise que des vers poétiques. Les vers doivent obligatoirement avoir des rimes riches entre eux et doivent avoir un sens philosophique. Je veux que tu prennes en compte la phonétique des mots. Voici un exemple pour t'inspirer :
      "Nous étions quelques gamins en quatre-vingt,
      Quatre copains en chemin,
      Construisant leur destin de délires souterrains,
      Nos mains étaient des poings et l'avenir, un tremplin."
      Maintenant, crée ton poème sur le thème "${userInput}".`;

      const response = await axios.post('https://api.deepinfra.com/v1/openai/chat/completions', {
        model: 'meta-llama/Meta-Llama-3.1-405B-Instruct',
        messages: [{ role: 'user', content: prompt }],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer LfL2T3VsHXZ6tegNML6vEOrqYBDxoBnW',
        },
      });

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
  };

  const nettoyerTextePoeme = (poem) => {
    return poem
    .replace(/[{}*/\\;]/g, '')
    .replace(/"""|return/g, '')
    .replace(/(\r\n|\n|\r)/gm, '<br>')
    .trim();  
  };

  // Fonction pour effacer la conversation
  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('conversation'); // Supprime du localStorage
    console.log('Conversation effacée.');
  };

  return (
    <>
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
    </>
  );
};

export default ChatBox;
