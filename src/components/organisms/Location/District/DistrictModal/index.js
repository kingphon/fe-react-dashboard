import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Input from "../../../../atoms/Input";
import CheckBox from "../../../../atoms/CheckBox";
import { makeSlug } from "../../../../../commons/utils";
import ModalModule from "../../../../molecules/ModalModule";
import FormGroup from "../../../../atoms/FormGroup";
import ComboBox from "../../../../atoms/ComboBox";
import ToggleActive from "../../../../atoms/ToggleActive";

import {
  closeModal,
  doSave,
  setDistrict
} from '../../../../../redux/reducers/districtReducer';

const selectList = [
  { label: "Đà Nẵng", value: 1 },
  { label: "Đà Lạt", value: 2 }
]
const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  slugCheckBox,
  onChangeComboBox,
  onClickCheckBox,
  district: {
    id,
    name,
    slugName,
    provinceId,
    status
  },
  provinceList,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={id ? "Update District" : "Create District"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    maxWidth="md"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup row>
      {id &&
        <Input label="District Id: "
          name="id"
          width="25%"
          value={id}
          onChange={onChangeForm}
          disabled={true}
          error={formErrors.id} />
      }
      <Input
        required
        label="District Name: "
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
      label="District Slug Name: "
      name="slugName"
      value={slugName}
      onChange={onChangeForm}
      disabled={!slugCheckBox}
      error={formErrors.slugName}
    />
    <ComboBox
      required
      label="Province Name"
      name="provinceId"
      selectList={selectList}
      value={provinceId}
      onChange={onChangeComboBox}
      error={formErrors.provinceId}
    />
  </ModalModule>
);

const DistrictModal = () => {
  const selector = useSelector(
    ({
      districtReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        district,
        provinceList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      district,
      provinceList,
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
    onChangeComboBox: (event) => dispatch(setDistrict({ ...selector.district, provinceId: event.target.value })),
    onChangeForm: (_, { name, value }) =>
      !slugCheckBox && name === "name" &&
      dispatch(setDistrict({ ...selector.district, [name]: value, slugName: makeSlug(value) })) ||
      dispatch(setDistrict({ ...selector.district, [name]: value })),
    onPositive: () => dispatch(doSave(selector.district)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default DistrictModal;
