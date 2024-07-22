import { Toast, ToastContainer } from 'react-bootstrap';

type Props = {
  show: boolean;
  message: string;
  onClose: () => void;
};

const ToastComponent: React.FC<Props> = ({ show, message, onClose }) => {

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={5000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
