import React, { useState } from 'react'
import {
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { schema } from "./yupSchema";
import RHFInput from "../../../atoms/RHFInput";
import FormGroup from "../../../atoms/FormGroup";
import Button from '../../../atoms/Button';
import { FormProvider } from "react-hook-form";
import { Check } from '@material-ui/icons';

import {
  doLogin
} from '../../../../redux/reducers/rootReducer';


const Render = ({
  formLoading,
  methods,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleSubmit,
  onSubmit
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white w-1/3 h-80 flex flex-col items-center p-4 justify-around rounded-md shadow">
        <h2>Login</h2>
        <FormProvider {...methods}>
          <form className="w-full contents" onSubmit={handleSubmit(data => onSubmit(data))}>

            <FormGroup className="w-full">
              <RHFInput
                label="Phone: "
                name="phone"
              />
              <RHFInput
                label="Password: "
                name="password"
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
            </FormGroup>
            <Button
              loading={formLoading}
              icon={<Check />}
              type="submit"
              content="Log in"
            />
          </form>
        </FormProvider>
        <p>Forget your password?</p>
      </div>
    </div>
  )
}

const Login = () => {
  const selector = useSelector(({
    rootReducer: {
      formLoading,
      loginForm
    }
  }) => ({
    formLoading,
    loginForm
  }), shallowEqual)

  const methods = useForm({
    defaultValues: selector.loginForm,
    resolver: yupResolver(schema),
  })

  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit } = methods

  const dispatch = useDispatch()

  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/home" } }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const renderProps = {
    ...selector,
    methods,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    onSubmit: (data) => dispatch(doLogin(data, () => history.replace(from))),
  }

  return <Render {...renderProps} />
}
export default Login