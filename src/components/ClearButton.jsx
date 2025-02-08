import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ClearButton = ({ onClear, disabled }) => {
  return (
    <>
    <button onClick={onClear} disabled={disabled}>
        <FontAwesomeIcon icon={faTrashCan} id="clearButton" className="mr-2" title="Effacer la conversation" />
    </button>
    </>
  );
};

export default ClearButton;
