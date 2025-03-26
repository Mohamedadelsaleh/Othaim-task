// components/ConfirmationDialog/ConfirmationDialog.tsx
import React from 'react';
import styles from './ConfirmationDialog.module.scss';

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ 
  message, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className={styles.dialogBackdrop}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;