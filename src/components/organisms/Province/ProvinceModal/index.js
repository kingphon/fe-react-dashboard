import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Input from "../../../atoms/Input";
import CheckBox from "../../../atoms/CheckBox";
import { makeSlug } from "../../../../commons/utils";
import {
  closeModal,
  doSave,
  setProvince
} from '../../../../redux/reducers/provinceReducer';
import ModalModule from "../../../molecules/ModalModule";
const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  slugCheckBox,
  onClickCheckBox,
  province: {
    provinceId,
    provinceName,
    provinceSlugName,
  },
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={provinceId ? "Update Province" : "Create Province"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    maxWidth="md"
    onPositive={onPositive}
    onClose={onClose}
  >
    <Input
      required
      label="Province Name: "
      name="provinceName"
      value={provinceName}
      onChange={onChangeForm}
      disabled={!!provinceId}
      error={formErrors.provinceName}
    />
    <CheckBox
      label="Customize Slug"
      checked={slugCheckBox}
      onClick={onClickCheckBox}
    />
    <Input
      required
      label="Province Slug Name: "
      name="provinceSlugName"
      value={provinceSlugName}
      onChange={onChangeForm}
      disabled={!slugCheckBox}
      error={formErrors.provinceSlugName}
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
      !slugCheckBox && name === "provinceName" &&
      dispatch(setProvince({ ...selector.province, [name]: value, provinceSlugName: makeSlug(value) })) ||
      dispatch(setProvince({ ...selector.province, [name]: value })),
    onPositive: () => dispatch(doSave(selector.province)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProvinceModal;
