import React, { useState, useEffect } from 'react'
import {
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Avatar from '@material-ui/core/Avatar';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import IconButton from "@material-ui/core/IconButton";

import Header from '../../organisms/Header'
import ProfileModal from '../../organisms/Profile/ProfileModal'
import ProfileForm from '../../organisms/Profile/ProfileForm'
import {
  fetchAllProvince,
} from '../../../redux/reducers/location/districtReducer';

const Render = ({
  profile,
  file,
  setFile,
}) =>
(<div className="w-full h-full">
  <Header
    headerName={"Profile"}
    headerLogo={<AccountCircleRoundedIcon />}
  />
  <div className="m-4 bg-white flex">
    <div className="p-8" style={{ width: "384px" }}>
      <div className="border-b-2 border-gray-300 mb-4 pb-4 relative">
        <Avatar src={profile.avatar} className="w-full h-full border-gray-300 border-4" />
        <input accept="image/*" id="icon-button-file" className="hidden" type="file" onChange={(e) => setFile(e.target.files[0])} />
        <label htmlFor="icon-button-file">
          <IconButton style={{ right: "1.5rem", bottom: "1.5rem" }} className="absolute bg-gray-300" aria-label="upload picture" component="span">
            <PhotoCameraRoundedIcon className="text-3xl" />
          </IconButton>
        </label>
      </div>
      <div className="text-center text-gray-500">
        <p>{`Created In ${profile.createDate}`}</p>
        <p>{`Updated In ${profile.updateDate}`}</p>
      </div>
    </div>
    <ProfileForm data={profile} />
  </div>
  <ProfileModal open={file} onClose={() => setFile(null)} />
</div>)

const Profile = () => {
  const selector = useSelector(({
    rootReducer: {
      profile,
    }
  }) => ({
    profile,
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProvince())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [file, setFile] = useState(null)

  const renderProps = {
    ...selector,
    file,
    setFile,
  }

  return <Render {...renderProps} />
}
export default Profile