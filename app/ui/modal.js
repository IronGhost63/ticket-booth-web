import { useRef, useEffect } from 'react';

const Modal = ({children, className, modalState, closeHandler, actionHandler, closeLabel, actionLabel}) => {
  const ref = useRef();

  useEffect(() => {
    if (modalState) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [modalState]);
  return (
    <dialog ref={ref} className={`modal ${className || ''}`} onCancel={closeHandler}>
      <div className="modal-content">
        {children}
      </div>
      <div className="modal-control">
        {closeHandler && (
          <button className="button dismiss-button" onClick={closeHandler}>{closeLabel}</button>
        )}
        {actionHandler && (
          <button className="button action-button" onClick={actionHandler}>{actionLabel}</button>
        )}
      </div>
    </dialog>
  );
}

export default Modal;
