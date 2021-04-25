import React from 'react';
import DialogActionsMUI from '@material-ui/core/DialogActions';
import Button from '../../atoms/Button';
import { Close, Check } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

export default function DialogActions({
  loading = false,
  positiveDisabled = false,
  showPositiveButton = true,
  positiveButtonLabel = "Ok",
  negativeButtonLabel = "Cancel",
  onPositive,
  onClose,
}) {

  const handleClose = (_, reason) => {
    if (reason !== 'backdropClick' || reason !== 'escapeKeyDown') {
      onClose()
    }
    return false
  }

  return (
    <DialogActionsMUI
      className="py-3 px-4"
    >
      {showPositiveButton && <Button
        loading={loading}
        disabled={positiveDisabled}
        icon={<Check />}
        // onClick={onPositive}
        content={positiveButtonLabel}
      />}
      <Button
        icon={<Close />}
        color="default"
        disabled={loading}
        onClick={handleClose}
        content={negativeButtonLabel}
      />
    </DialogActionsMUI>
  )
}

const ModalSuccess = ({ message }) => (
  <Alert severity="success">
    {message}
  </Alert>
)

const ModalError = ({ message }) => (
  <Alert severity="error">
    {message}
  </Alert>
)