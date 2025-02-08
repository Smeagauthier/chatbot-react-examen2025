import ChatBox from '../components/ChatBox';

const Chatbot = () => {
  return (
    <>
    <div className="relative h-screen w-screen overflow-x-hidden ">
      <div className="h-[5vh]"></div> 
      <ChatBox />
    </div>    
    </>
  );
};

export default Chatbot;
