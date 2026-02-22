import { useRef, useEffect } from 'react';

const Modal = ({children, className, modalState, closeHandler}) => {
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
        <button className="button" onClick={closeHandler}>OK</button>
      </div>
    </dialog>
  );
}

export default Modal;
