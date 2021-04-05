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
  fetchAllTypeGroup,
  setTypeItem
} from '../../../../../redux/reducers/classification/typeReducer';

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  slugCheckBox,
  onChangeComboBox,
  onClickCheckBox,
  typeItem: {
    id,
    name,
    slugName,
    typeGroupId,
    status
  },
  categoryId,
  categoryList,
  typeGroupList,
  errors: { formErrors },
  onChangeForm,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={id ? "Update Type" : "Create Type"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    maxWidth="md"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup row>
      {id &&
        <Input label="Type Id: "
          name="id"
          width="25%"
          value={id}
          onChange={onChangeForm}
          disabled={true}
          error={formErrors.id} />
      }
      <Input
        required
        label="Type Name: "
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
      label="Type Slug Name: "
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
        label="Category Name"
        name="categoryId"
        selectList={categoryList}
        value={categoryId}
        onChange={onChangeComboBox}
        error={formErrors.categoryId}
      />
      <ComboBox
        className="w-1/2 my-2 -mx-1"
        required
        disabled={!categoryId}
        label="Type Group Name"
        name="typeGroupId"
        selectList={typeGroupList}
        value={typeGroupId}
        onChange={onChangeComboBox}
        error={formErrors.typeGroupId}
      />
    </FormGroup>
  </ModalModule>
);

const TypeModal = () => {
  const selector = useSelector(
    ({
      typeReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        typeItem,
        categoryList,
        typeGroupList,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      typeItem,
      categoryList,
      typeGroupList,
      errors
    }),
    shallowEqual
  );

  const [categoryId, setCategoryId] = useState("")

  const [slugCheckBox, setSlugCheckBox] = useState(false)

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    categoryId,
    slugCheckBox,
    onClickCheckBox: () => setSlugCheckBox(!slugCheckBox),
    onChangeComboBox: (event) => {
      if (event.target.name === "categoryId") {
        setCategoryId(event.target.value)
        dispatch(fetchAllTypeGroup(event.target.value))
      } else {
        dispatch(setTypeItem({ ...selector.typeItem, [event.target.name]: event.target.value }))
      }
    },
    onChangeForm: (_, { name, value }) => {
      if (!slugCheckBox && name === "name") {
        dispatch(setTypeItem({ ...selector.typeItem, [name]: value, slugName: makeSlug(value) }))
      } else {
        dispatch(setTypeItem({ ...selector.typeItem, [name]: value }))
      }
    },
    onPositive: () => dispatch(doSave(selector.typeItem)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default TypeModal;
