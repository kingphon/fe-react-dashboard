import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Input from "../../../atoms/Input";
import CheckBox from "../../../atoms/CheckBox";
import { makeSlug } from "../../../../commons/utils";
import ModalModule from "../../../molecules/ModalModule";
import FormGroup from "../../../atoms/FormGroup";
import ToggleActive from "../../../atoms/ToggleActive";

import {
  closeModal,
  doSave,
  setProvince
} from '../../../../redux/reducers/provinceReducer';
const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  slugCheckBox,
  onClickCheckBox,
  province: {
    id,
    name,
    slugName,
    status
  },
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={id ? "Update Province" : "Create Province"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    maxWidth="md"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup row>
      {id &&
        <Input label="Province Id: "
          name="id"
          width="25%"
          value={id}
          onChange={onChangeForm}
          disabled={true}
          error={formErrors.id} />
      }
      <Input
        required
        label="Province Name: "
        name="name"
        width={id && "70%"}
        value={name}
        onChange={onChangeForm}
        error={formErrors.name}
      />
    </FormGroup>

    <FormGroup row>
      <CheckBox
        label="Customize Slug"
        checked={slugCheckBox}
        onClick={onClickCheckBox}
      />
      <ToggleActive
        checked={status}
        onChange={onChangeForm}
      />
    </FormGroup>
    <Input
      required
      label="Province Slug Name: "
      name="slugName"
      value={slugName}
      onChange={onChangeForm}
      disabled={!slugCheckBox}
      error={formErrors.slugName}
    />
  </ModalModule>
);

const ProvinceModal = () => {
  const selector = useSelector(
    ({
      provinceReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        province,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      province,
      errors
    }),
    shallowEqual
  );

  const [slugCheckBox, setSlugCheckBox] = useState(false)

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    slugCheckBox,
    onClickCheckBox: () => setSlugCheckBox(!slugCheckBox),
    onChangeForm: (_, { name, value }) =>
      !slugCheckBox && name === "name" &&
      dispatch(setProvince({ ...selector.province, [name]: value, slugName: makeSlug(value) })) ||
      dispatch(setProvince({ ...selector.province, [name]: value })),
    onPositive: () => dispatch(doSave(selector.province)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProvinceModal;
