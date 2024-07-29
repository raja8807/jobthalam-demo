const { Modal } = require("react-bootstrap");
const { X } = require("react-bootstrap-icons");
import CustomButton from "../../custom_button/custom_button";
import styles from "./confirm_popup.module.scss";

const ConfirmPopup = ({
  show,
  setShow,
  onConfirm = () => {},
  message,
  head,
  hasCancel = true,
  confirmButtonText = "Ok",
}) => {
  return (
    <Modal
      show={show}
      centered
      onHide={() => {
        setShow(false);
      }}
      className={styles.ConfirmPopup}
    >
      <Modal.Body className={styles.modal}>
        {/* <X
          onClick={() => {
            setShow(false);
          }}
          className={styles.x}
        /> */}
        <div className={styles.body}>
          {head && <h2>{head}</h2>}
          <p>{message}</p>
        </div>
        <br />
        <div className={styles.btns}>
          <CustomButton onClick={onConfirm}>{confirmButtonText}</CustomButton>
          {hasCancel && <CustomButton variant={2}>Cancel</CustomButton>}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmPopup;
