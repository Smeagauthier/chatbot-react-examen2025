import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const InputSection = ({ userInput, onUserInputChange, sendMessage, isLoading }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (userInput.trim()) sendMessage();
        }
    };
    
    return (
        <>
        <div id="inputSection">
            <div className="input-with-button">
                <textarea
                    id="userInput"
                    value={userInput}
                    onChange={onUserInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Tapez votre message..."
                    disabled={isLoading}
                />
                <button onClick={sendMessage} disabled={!userInput.trim() || isLoading}             id="sendButton">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
        </>
    );
};

export default InputSection;
