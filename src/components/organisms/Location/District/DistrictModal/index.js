import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { makeSlug } from "../../../../../commons/utils";
import CheckBox from "../../../../atoms/CheckBox";
import ComboBox from "../../../../atoms/ComboBox";
import FormGroup from "../../../../atoms/FormGroup";
import Input from "../../../../atoms/Input";
import ToggleActive from "../../../../atoms/ToggleActive";
import ModalModule from "../../../../molecules/ModalModule";

import {
  closeModal,
  doSave,
  setDistrict
} from '../../../../../redux/reducers/location/districtReducer';

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
      className="w-full my-2"
      required
      label="Province Name"
      name="provinceId"
      selectList={provinceList}
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
    onChangeComboBox: (event) => dispatch(setDistrict({ ...selector.district, [event.target.name]: event.target.value })),
    onChangeForm: (_, { name, value }) => {
      if (!slugCheckBox && name === "name") {
        dispatch(setDistrict({ ...selector.district, [name]: value, slugName: makeSlug(value) }))
      } else {
        dispatch(setDistrict({ ...selector.district, [name]: value }))
      }
    },
    onPositive: () => dispatch(doSave(selector.district)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default DistrictModal;
