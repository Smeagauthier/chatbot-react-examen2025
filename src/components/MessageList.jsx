
const MessageList = ({ messages, isLoading }) => {
  return (
    <>
    <div id="messages">
      {messages.map((message, index) => (
        <p key={index} className={message.role === 'user' ? 'user-message' : 'bot-message'}>
          <span dangerouslySetInnerHTML={{ __html: message.content }} />
        </p>
      ))}
      {isLoading && <p className="bot-message loading">Chatbot : Génération en cours...</p>}
    </div>
    </>
  );
};

export default MessageList;
