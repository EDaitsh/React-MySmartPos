
import './button.styles.scss'
import { useSelector } from 'react-redux';
import { selectCallApiIsLoading, selectCallApiActionActive } from '../../store/call-api/call-api.selector';
//import { FaSpinner } from 'react-icons/fa';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    endTransaction: 'endTransaction'
}


const Button = ({
                htmlContent, 
                buttonType,
                loadingText = 'Please wait...', 
                action,  
                ...otherProps}) => 
    {
    const isLoading = useSelector(selectCallApiIsLoading);
    const isButtonActive = useSelector(selectCallApiActionActive)[0] === action;
    return (
        <button
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            disabled={isLoading && isButtonActive}
            {...otherProps}
        >
            {isLoading && isButtonActive ? 
                (
                    <div>
                        <span>{loadingText}</span>
                        <FontAwesomeIcon icon={faSpinner} spin />
                    </div>
                ) :
                ( 
                    parse(htmlContent)
                )
            }
        </button>
    )
}

export default Button;
