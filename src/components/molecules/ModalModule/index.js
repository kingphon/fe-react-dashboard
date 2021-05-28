import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { FormProvider } from "react-hook-form";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '../../atoms/Button';
import { Close, Check } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ModalModule({
  title,
  children,
  modalSuccess = '',
  modalError = '',
  loading = false,
  minWidth = "30rem",
  positiveDisabled = false,
  showPositiveButton = true,
  positiveButtonLabel = "Ok",
  negativeButtonLabel = "Cancel",
  handleSubmit,
  onPositive,
  onClose,
  methods,
  onLoaded = false,
  ...rest
}) {

  const handleClose = (_, reason) => {
    if (reason !== 'backdropClick' || reason !== 'escapeKeyDown') {
      onClose()
    }
    return false
  }

  return (
    <Dialog
      TransitionComponent={Transition}
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      {...rest}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers className="relative pt-3 px-4 pb-2" style={{ boxSizing: 'border-box', minWidth }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            {children}
            <DialogActions
              className="py-3 px-4"
            >
              {showPositiveButton && <Button
                loading={loading}
                disabled={positiveDisabled}
                icon={<Check />}
                type="submit"
                content={positiveButtonLabel}
              />}
              <Button
                icon={<Close />}
                color="default"
                disabled={loading}
                onClick={handleClose}
                content={negativeButtonLabel}
              />
            </DialogActions>
          </form>
        </FormProvider>
        {modalSuccess && <ModalSuccess message={modalSuccess} />}
        {modalError && <ModalError message={modalError} />}
      </DialogContent>
    </Dialog>
  );
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