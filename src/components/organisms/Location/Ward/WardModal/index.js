import React, { useState } from "react";
import {
  shallowEqual,
  useDispatch,
  useSelector
} from "react-redux";

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
  fetchAllDistrict, setWard
} from '../../../../../redux/reducers/location/wardReducer';

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  slugCheckBox,
  onChangeComboBox,
  onClickCheckBox,
  ward: {
    id,
    name,
    slugName,
    districtId,
    status
  },
  provinceId,
  provinceList,
  districtList,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={id ? "Update Ward" : "Create Ward"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    maxWidth="md"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup row>
      {id &&
        <Input label="Ward Id: "
          name="id"
          width="25%"
          value={id}
          onChange={onChangeForm}
          disabled={true}
          error={formErrors.id} />
      }
      <Input
        required
        label="Ward Name: "
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
      label="Ward Slug Name: "
      name="slugName"
      value={slugName}
      onChange={onChangeForm}
      disabled={!slugCheckBox}
      error={formErrors.slugName}
    />
    <FormGroup row>
      <ComboBox
        className="w-1/2 my-2 -mx-1"
        required
        label="Province Name"
        name="provinceId"
        selectList={provinceList}
        value={provinceId}
        onChange={onChangeComboBox}
        error={formErrors.provinceId}
      />
      <ComboBox
        className="w-1/2 my-2 -mx-1"
        required
        disabled={!provinceId}
        label="District Name"
        name="districtId"
        selectList={districtList}
        value={districtId}
        onChange={onChangeComboBox}
        error={formErrors.districtId}
      />
    </FormGroup>
  </ModalModule>
);

const WardModal = () => {
  const selector = useSelector(
    ({
      wardReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        ward,
        provinceList,
        districtList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      ward,
      provinceList,
      districtList,
      errors
    }),
    shallowEqual
  );

  const [provinceId, setProvinceId] = useState("")

  const [slugCheckBox, setSlugCheckBox] = useState(false)

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    provinceId,
    slugCheckBox,
    onClickCheckBox: () => setSlugCheckBox(!slugCheckBox),
    onChangeComboBox: (event) => {
      if (event.target.name === "provinceId") {
        setProvinceId(event.target.value)
        dispatch(fetchAllDistrict(event.target.value))
      } else {
        dispatch(setWard({ ...selector.ward, [event.target.name]: event.target.value }))
      }
    },
    onChangeForm: (_, { name, value }) => {
      if (!slugCheckBox && name === "name") {
        dispatch(setWard({ ...selector.ward, [name]: value, slugName: makeSlug(value) }))
      } else {
        dispatch(setWard({ ...selector.ward, [name]: value }))
      }
    },
    onPositive: () => dispatch(doSave(selector.ward)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default WardModal;
