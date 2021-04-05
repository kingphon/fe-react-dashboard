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
  setTypeGroup
} from '../../../../../redux/reducers/classification/typeGroupReducer';

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  slugCheckBox,
  onChangeComboBox,
  onClickCheckBox,
  typeGroup: {
    id,
    name,
    slugName,
    categoryId,
    status
  },
  categoryList,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={id ? "Update Type Group" : "Create Type Group"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    maxWidth="md"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup row>
      {id &&
        <Input label="Type Group Id: "
          name="id"
          width="25%"
          value={id}
          onChange={onChangeForm}
          disabled={true}
          error={formErrors.id} />
      }
      <Input
        required
        label="Type Group Name: "
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
      label="Type Group Slug Name: "
      name="slugName"
      value={slugName}
      onChange={onChangeForm}
      disabled={!slugCheckBox}
      error={formErrors.slugName}
    />
    <ComboBox
      className="w-full my-2"
      required
      label="Category Name"
      name="categoryId"
      selectList={categoryList}
      value={categoryId}
      onChange={onChangeComboBox}
      error={formErrors.categoryId}
    />
  </ModalModule>
);

const TypeGroupModal = () => {
  const selector = useSelector(
    ({
      typeGroupReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        typeGroup,
        categoryList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      typeGroup,
      categoryList,
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
    onChangeComboBox: (event) => dispatch(setTypeGroup({ ...selector.typeGroup, [event.target.name]: event.target.value })),
    onChangeForm: (_, { name, value }) => {
      if (!slugCheckBox && name === "name") {
        dispatch(setTypeGroup({ ...selector.typeGroup, [name]: value, slugName: makeSlug(value) }))
      } else {
        dispatch(setTypeGroup({ ...selector.typeGroup, [name]: value }))
      }
    },
    onPositive: () => dispatch(doSave(selector.typeGroup)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default TypeGroupModal;
