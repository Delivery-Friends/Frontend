import { useCallback, useEffect, useState } from 'react';
import classes from './modal.module.scss';
import ReactDOM from 'react-dom';

import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
}

interface ModalOverlayProps {
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

interface BackDropProps {
  onClose: () => void;
}

const BackDrop = ({ onClose }: BackDropProps) => {
  return <div onClick={onClose} className={classes.backdrop} />;
};

const ModalOverlay = ({ onClose, title, body, footer }: ModalOverlayProps) => {
  return (
    <div className={classes.modalcard}>
      <h3>{title}</h3>
      <div>{body}</div>
      <div>{footer}</div>
      <button onClick={onClose}>
        <IoMdClose size={30} />
      </button>
    </div>
  );
};

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}: ModalProps) => {
  const [isModal, setIsModal] = useState(false);
  const closeModalHandler = useCallback(() => {
    if (disabled) {
      return;
    }
    setIsModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsModal(true);
    }
  }, [isOpen]);

  return isModal ? (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClose={closeModalHandler} />,
        document.getElementById('backdrop-root') as Element
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          body={body}
          footer={footer}
          onClose={closeModalHandler}
        />,
        document.getElementById('overlay-root') as Element
      )}
    </>
  ) : null;
};

export default Modal;
