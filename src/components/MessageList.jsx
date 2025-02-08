
//Affiche les messages de l'utilisateur et du chatbot
const MessageList = ({ messages, isLoading }) => {
  return (
    <>
    <div id="messages">
      {/* Chaque message est parcouru, la clé étant l'index dans le tableau. Le style du message va varier selon le role de celui qui l'a écrit. Le message est interpreté en code HTML (pour les <br>, je peux faire ca parce qu'il est nettoyé au préalable*/}
      {messages.map((message, index) => (
        <p key={index} className={message.role === 'user' ? 'user-message' : 'bot-message'}>
          <span dangerouslySetInnerHTML={{ __html: message.content }} />
        </p>
      ))}
      {/* Si le chatbot est en train d'écrire, message affiché. */}
      {isLoading && <p className="bot-message loading">Chatbot : Génération en cours...</p>}
    </div>
    </>
  );
};

export default MessageList;
