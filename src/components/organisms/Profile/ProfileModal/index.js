import React, { useState } from 'react'
import {
  useDispatch
} from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AvatarEditor from 'react-avatar-editor'
import 'react-image-crop/dist/ReactCrop.css';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import { Close, Check } from '@material-ui/icons';

import Button from '../../../atoms/Button';
import { storage } from '../../../../firebase'
import { changeAvatar } from '../../../../redux/reducers/rootReducer'

const ProfileModal = ({ open, onClose }) => {
  const [value, setValue] = useState(0)
  const [edit, setEdit] = useState()
  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = async () => {
    await edit.getImageScaledToCanvas().toBlob((blob) => {
      const file = new File([blob], `${new Date().getTime()}.jpg`, { type: "image/jpeg" })
      const uploadTask = storage.ref(`images/${file.name}`).put(file)
      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(url => {
              dispatch(changeAvatar({ avatar: url }))
              onClose()
            })
        }
      )
    }, 'image/jpeg')
  }
  const setEditorRef = (editor) => setEdit(editor)
  return <Dialog
    onClose={onClose}
    disableBackdropClick
    disableEscapeKeyDown
    open={open ? true : false}
  >
    <DialogTitle>{"Update Avatar"}</DialogTitle>
    <DialogContent dividers className="relative pt-3 px-4 pb-2 flex flex-col items-center" style={{ boxSizing: 'border-box' }}>
      {open &&
        <AvatarEditor
          ref={setEditorRef}
          image={URL.createObjectURL(open)}
          width={250}
          height={250}
          borderRadius={180}
          color={[255, 255, 255, 0.6]}
          scale={value * 0.015 + 1}
          rotate={0}
        />
      }
      <Slider value={value} onChange={handleChange} className="my-4 w-3/4" />

      <DialogActions
        className="py-3 px-4"
      >
        <Button
          icon={<Check />}
          type="submit"
          content={"Submit"}
          onClick={handleSubmit}
        />
        <Button
          icon={<Close />}
          color="default"
          onClick={onClose}
          content={"Cancel"}
        />
      </DialogActions>
    </DialogContent>
  </Dialog>
}

export default ProfileModal;
