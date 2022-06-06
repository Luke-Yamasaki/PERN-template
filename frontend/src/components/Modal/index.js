//Hooks
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom';

//styles
import styles from './Modal.module.css';

//actions
import { hideModal } from '../../store/modal';

export const Modal = () => {
    const dispatch = useDispatch();

    const mount = useSelector(state => state.modals.modalMount);
    const display = useSelector(state => state.modals.display);
    const Current = useSelector(state => state.modals.currentModal);

    const closeModal = (e) => {
        e.preventDefault();
        dispatch(hideModal());
    };

    return display && mount && ReactDOM.createPortal(
        <div className={styles.background} onClick={closeModal}>
            <div className={styles.field} onClick={e => e.stopPropagation()}>
                <Current />
            </div>
        </div>
    , mount)
}

export default Modal;
