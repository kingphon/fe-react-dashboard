import React, { useState, useEffect } from 'react'
import {
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useHistory } from 'react-router-dom'

import Input from "../../../atoms/Input";
import FormGroup from "../../../atoms/FormGroup";
import Button from '../../../atoms/Button';
import { resetSystemErrors } from '../../../../redux/reducers/rootReducer';
import {
  doLogin,
  setLoginForm,
  getCreateAction,
  setSearchKeywords
} from '../../../../redux/reducers/rootReducer';


const Render = ({
  loginForm: {
    phone,
    password
  },
  formLoading,
  errors: { formErrors },
  onChangeForm,
  onSubmit
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white w-1/3 h-80 flex flex-col items-center p-4 justify-around rounded-md shadow">
        <h2>Login</h2>
        <FormGroup className="w-full">
          <Input label="Phone: "
            name="phone"
            loading={formLoading}
            value={phone}
            onChange={onChangeForm}
            error={formErrors.phone}
          />
          <Input label="Password: "
            name="password"
            type="password"
            loading={formLoading}
            value={password}
            onChange={onChangeForm}
            error={formErrors.password}
          />
        </FormGroup>
        <Button
          loading={formLoading}
          onClick={onSubmit}
          content={"Login"}
        />
        <p>Forget your password?</p>
      </div>
      <ToastContainer />
    </div>
  )
}

const Login = () => {
  const selector = useSelector(({
    rootReducer: {
      formLoading,
      errors,
      loginForm
    }
  }) => ({
    formLoading,
    errors,
    loginForm
  }), shallowEqual)

  const dispatch = useDispatch()



  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderProps = {
    ...selector,
    onChangeForm: (_, { name, value }) => dispatch(setLoginForm({ ...selector.loginForm, [name]: value })),
    onSubmit: () => dispatch(doLogin(selector.loginForm, () => history.replace(from))),
    // onOpenCreate: () => dispatch(getCreateAction()),
    // onChangeSearchKeywords: (searchKeywords) => dispatch(setSearchKeywords(searchKeywords)),
  }

  return <Render {...renderProps} />
}
export default Login