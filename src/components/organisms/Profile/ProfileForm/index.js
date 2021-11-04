
import React, {
  useEffect,
  useState
} from 'react'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormProvider } from "react-hook-form";
import { Close, Check } from '@material-ui/icons';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import RHFInput from "../../../atoms/RHFInput";
import RHFComboBox from "../../../atoms/RHFComboBox";
import ProfileFormEntity from "../../../molecules/ProfileFormEntity";
import Button from '../../../atoms/Button';
import { schema } from "./yupSchema";
import { changePassword } from '../../../../redux/reducers/rootReducer'
// eslint-disable-next-line
const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const Render = ({
  methods,
  handleSubmit,
  provinceList,
  districtList,
  wardList,
  onEdit,
  showPassword,
  watchNewPassword,
  onChangePassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  onClickEdit,
  showData: {
    name,
    phone,
    email,
    address,
    provinceName,
    districtName,
    wardName
  }
}) => (
  /* eslint-disable */
  <div className="w-full p-8 border-l-2 border-gray-300">
    <h1 className="font-bold text-2xl border-b-2 mb-4 border-gray-300 pb-8">Update Profile</h1>
    <div style={{ width: "750px" }}>
      <FormProvider {...methods}>
        {onEdit.name ?
          (
            <form className='p-3 m-3 bg-gray-200' onSubmit={handleSubmit(data => console.log(data))}>
              <span className='p-2'>Name</span>
              <div className=' flex flex-col items-center'>
                <RHFInput
                  className="w-1/2 my-2"
                  label="First Name: "
                  name="firstName"
                  required={true}
                />
                <RHFInput
                  className="w-1/2 my-2"
                  label="Last Name: "
                  name="lastName"
                  required={true}
                />
                <div className='flex mt-4 w-1/2'>
                  <Button
                    className="mr-6"
                    // loading={loading}
                    icon={<Check />}
                    type="submit"
                    content={"Submit"}
                  />
                  <Button
                    icon={<Close />}
                    color="default"
                    // disabled={loading}
                    onClick={() => onClickEdit('name')}
                    content='Cancel'
                  />
                </div>
              </div>
            </form>
          ) :
          (
            <ProfileFormEntity
              onClickEdit={name => onClickEdit(name)}
              label='Name'
              name='name'
              value={name}
            />
          )
        }
        <ProfileFormEntity
          onClickEdit={name => onClickEdit(name)}
          label='Phone'
          name='phone'
          value={phone}
          canEdit={false}
        >
          {onEdit.phone &&
            (
              <div className='p-3 m-3 bg-gray-200'>
                <p>You can't change your phone number</p>
              </div>
            )
          }
        </ProfileFormEntity>
        {onEdit.email ?
          (
            <form className='p-3 m-3 bg-gray-200' onSubmit={handleSubmit(data => console.log(data))}>
              <span className='p-2'>Email</span>
              <div className=' flex flex-col items-center'>
                <RHFInput
                  className='w-1/2'
                  label="Email: "
                  name="email"
                  required={true}
                />
                <div className='flex mt-4 w-1/2'>
                  <Button
                    className="mr-6"
                    // loading={loading}
                    icon={<Check />}
                    type="submit"
                    content={"Submit"}
                  />
                  <Button
                    icon={<Close />}
                    color="default"
                    // disabled={loading}
                    onClick={() => onClickEdit('email')}
                    content='Cancel'
                  />
                </div>
              </div>
            </form>
          ) :
          (
            <ProfileFormEntity
              onClickEdit={name => onClickEdit(name)}
              label='Email'
              name='email'
              value={email}
            />
          )
        }
        {onEdit.address ?
          (
            <form className='p-3 m-3 bg-gray-200' onSubmit={handleSubmit(data => console.log(data))}>
              <span className='p-2'>Address</span>
              <div className=' flex flex-col items-center'>
                <RHFInput
                  className="w-1/2 my-2"
                  label="Address: "
                  name="address"
                  required={true}
                />
                <RHFComboBox
                  className="w-1/2 my-2"
                  label="Province Name: *"
                  name="provinceId"
                  selectList={provinceList}
                />
                <RHFComboBox
                  className="w-1/2 my-2"
                  label="District Name: *"
                  name="districtId"
                  selectList={districtList}
                />
                <RHFComboBox
                  className="w-1/2 my-2"
                  label="Ward Name: *"
                  name="wardId"
                  selectList={wardList}
                />
                <div className='flex mt-4 w-1/2'>
                  <Button
                    className="mr-6"
                    // loading={loading}
                    icon={<Check />}
                    type="submit"
                    content={"Submit"}
                  />
                  <Button
                    icon={<Close />}
                    color="default"
                    // disabled={loading}
                    onClick={() => onClickEdit('address')}
                    content='Cancel'
                  />
                </div>
              </div>
            </form>
          ) :
          (
            <ProfileFormEntity
              onClickEdit={name => onClickEdit(name)}
              label='Address'
              name='address'
              value={`${address}, ${wardName}, ${districtName}, ${provinceName}`}
            />
          )
        }
        {onEdit.password ?
          (
            <form className='p-3 m-3 bg-gray-200' onSubmit={handleSubmit(data => onChangePassword(data))}>
              <span className='p-2'>Name</span>
              <div className=' flex flex-col items-center'>
                <RHFInput
                  className="w-1/2 my-2"
                  label="Current Password: "
                  name="currentPassword"
                  required={true}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment:
                      <IconButton
                        className="p-0"
                        // aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  }}
                />
                <RHFInput
                  className="w-1/2 my-2"
                  label="New Password: "
                  name="newPassword"
                  required={true}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment:
                      <IconButton
                        className="p-0"
                        // aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  }}
                />
                <div className="w-1/2 my-2 bg-gray-200 p-2 border border-white border-solid flex flex-col items-center">
                  <div className="flex w-full justify-around py-2">
                    <p className={watchNewPassword.length >= 8 ? "text-green-500" : "text-red-500"}>
                      {watchNewPassword.length >= 8 ? <Check /> : <Close />}
                     8 Characters</p>
                    <p className={/\d/.test(watchNewPassword) ? "text-green-500" : "text-red-500"}>
                      {/\d/.test(watchNewPassword) ? <Check /> : <Close />}
                     One Number</p>
                  </div>
                  <div className="flex w-full justify-around py-2">
                    <p className={watchNewPassword == watchNewPassword.toLowerCase() ? "text-red-500" : "text-green-500"}>
                      {watchNewPassword == watchNewPassword.toLowerCase() ? <Close /> : <Check />}
                      One Uppercase</p>
                    <p className={watchNewPassword == watchNewPassword.toUpperCase() ? "text-red-500" : "text-green-500"}>
                      {watchNewPassword == watchNewPassword.toUpperCase() ? <Close /> : <Check />}
                    One Lowercase</p>
                  </div>
                  <p className={format.test(watchNewPassword) ? "text-green-500 py-2" : "text-red-500 py-2"}>
                    {format.test(watchNewPassword) ? <Check /> : <Close />}
                  One Special Case Character</p>
                </div>
                <RHFInput
                  className="w-1/2 my-2"
                  label="Re-Type New Password: "
                  name="reTypeNewPassword"
                  required={true}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment:
                      <IconButton
                        className="p-0"
                        // aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  }}
                />
                <div className='flex mt-4 w-1/2'>
                  <Button
                    className="mr-6"
                    // loading={loading}
                    icon={<Check />}
                    type="submit"
                    content={"Submit"}
                  />
                  <Button
                    icon={<Close />}
                    color="default"
                    // disabled={loading}
                    onClick={() => onClickEdit('password')}
                    content='Cancel'
                  />
                </div>
              </div>
            </form>
          ) :
          (
            <ProfileFormEntity
              onClickEdit={name => onClickEdit(name)}
              label='Password'
              name='password'
            />
          )
        }
      </FormProvider>
    </div>
  </div>
  /* eslint-enable */
)

const ProfileForm = ({ data }) => {
  const selector = useSelector(
    ({
      rootReducer: {
        provinceList,
        districtList,
        wardList,
      }
    }) => ({
      provinceList,
      districtList,
      wardList,
    }),
    shallowEqual
  );

  const methods = useForm({
    defaultValues: data,
    resolver: yupResolver(schema),
  })

  const [showData, setShowData] = useState({})
  const [onEdit, setOnEdit] = useState({
    name: false,
    phone: false,
    email: false,
    address: false,
    password: false,
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleSubmit, setValue, clearErrors, watch } = methods
  const watchNewPassword = watch("newPassword");

  useEffect(() => {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        setValue(key, element)
      }
    }
    setValue("newPassword", "")
    setValue("currentPassword", "")
    setValue("reTypeNewPassword", "")
    setShowData({
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      email: data.email,
      address: data.address,
      provinceName: data.provinceName,
      districtName: data.districtName,
      wardName: data.wardName,
    })
    clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    methods,
    onEdit,
    showPassword,
    watchNewPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    onClickEdit: (data) => {
      setOnEdit({
        name: false,
        phone: false,
        email: false,
        address: false,
        password: false,
        [data]: !onEdit[data]
      })
    },
    showData,
    handleSubmit,
    onChangePassword: (data) => dispatch(changePassword({
      passwords: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }
    })),
  };

  return <Render {...renderProps} />;
};

export default ProfileForm;
