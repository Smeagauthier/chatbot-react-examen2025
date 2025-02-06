import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClearButton from './ClearButton';
import MessageList from './MessageList';
import InputSection from './InputSection';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedConversation = localStorage.getItem('conversation');
    if (savedConversation) {
      setMessages(JSON.parse(savedConversation));
    }
  }, []);

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

    // reCAPTCHA v3 verification
    try {
      window.grecaptcha.ready(function() {
        window.grecaptcha.execute('6LeoDM8qAAAAAP1o3q1Er77H0iPz2IGavY6Ik1UJ', { action: 'submit' }).then(async function(token) {
          // Continue avec la logique d'envoi après avoir obtenu le token
          const prompt = `Écris un poème en 6 vers sur le thème suivant : "${userInput}".`;
          
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

  const nettoyerTextePoeme = (poem) => {
    return poem
      .replace(/[{}*/\\;]/g, '')
      .replace(/"""|return/g, '')
      .replace(/(\r\n|\n|\r)/gm, '<br>')
      .trim();
  };

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
