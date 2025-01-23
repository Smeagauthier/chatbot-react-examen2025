import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import InputSection from './InputSection';
import Footer from './Footer';

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
  }, []); // Cette useEffect s'exécute une seule fois lors du premier rendu.

  // Sauvegarder la conversation dans le localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('conversation', JSON.stringify(messages));
    }
  }, [messages]); // Cette useEffect s'exécute chaque fois que `messages` change.

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Nettoyer les entrées utilisateur pour éviter les caractères spéciaux
  const nettoyerEntree = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const cleanedInput = nettoyerEntree(userInput);

    // Ajouter le message de l'utilisateur
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: `Vous : ${cleanedInput}` },
    ]);

    setUserInput(''); // Réinitialiser l'input de l'utilisateur
    setIsLoading(true);

    try {
      const prompt = `Écris un poème en 6 vers sur le thème suivant : "${userInput}". N'utilise que des vers poétiques. Les vers doivent obligatoirement avoir des rimes riches entre eux et doivent avoir un sens philosophique. Je veux que tu prennes en compte la phonétique des mots. Voici un exemple pour t'inspirer :
      "Nous étions quelques gamins en quatre-vingt,
      Quatre copains en chemin,
      Construisant leur destin de délires souterrains,
      Nos mains étaient des poings et l'avenir, un tremplin."
      Maintenant, crée ton poème sur le thème "${userInput}".`;

      const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer q1q1hnYUxBDk2gYnoLOjTsBJ4kXai8a0',
        },
        body: JSON.stringify({
          model: 'meta-llama/Meta-Llama-3.1-405B-Instruct',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const generatedPoem = nettoyerTextePoeme(data.choices[0].message.content.trim());
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

  // Fonction pour nettoyer le texte du poème (réponse du chatbot), retirer les caractères spéciaux
  const nettoyerTextePoeme = (poem) => {
    return poem
    .replace(/[{}*/\\;]/g, '') // Pas besoin d'échapper `/` ou `*` ici
    .replace(/"""|return/g, '')
    .replace(/(\r\n|\n|\r)/gm, '<br>')
    .trim();  
  };

  return (
    <>
    <div id="chatbox">
      <h2>Bienvenue sur Chatbot poétique !</h2>
      <p className="intro">Posez votre thème et recevez des réponses en vers.</p>
      <MessageList 
        messages={messages} 
        isLoading={isLoading}  
      />
      <InputSection
        id = "inputSection"
        userInput={userInput}
        onUserInputChange={handleUserInputChange}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
    <Footer />
    </>
  );
};

export default ChatBox;
