import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Input from "../../../../atoms/Input";
import CheckBox from "../../../../atoms/CheckBox";
import { makeSlug } from "../../../../../commons/utils";
import ModalModule from "../../../../molecules/ModalModule";
import FormGroup from "../../../../atoms/FormGroup";
import ToggleActive from "../../../../atoms/ToggleActive";

import {
  closeModal,
  doSave,
  setCategory
} from '../../../../../redux/reducers/classification/categoryReducer';

const Render = ({
  openModal,
  formLoading,
  modalFormSuccessMessage,
  slugCheckBox,
  onClickCheckBox,
  category: {
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
    title={id ? "Update Category" : "Create Category"}
    open={openModal}
    loading={formLoading}
    modalSuccess={modalFormSuccessMessage}
    maxWidth="md"
    onPositive={onPositive}
    onClose={onClose}
  >
    <FormGroup row>
      {id &&
        <Input label="Category Id: "
          name="id"
          width="25%"
          value={id}
          onChange={onChangeForm}
          disabled={true}
          error={formErrors.id} />
      }
      <Input
        required
        label="Category Name: "
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
      label="Category Slug Name: "
      name="slugName"
      value={slugName}
      onChange={onChangeForm}
      disabled={!slugCheckBox}
      error={formErrors.slugName}
    />
  </ModalModule>
);

const CategoryModal = () => {
  const selector = useSelector(
    ({
      categoryReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        category,
        errors
      }
    }) => ({
      openModal,
      modalFormSuccessMessage,
      formLoading,
      category,
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
    onChangeForm: (_, { name, value }) => {
      if (!slugCheckBox && name === "name") {
        dispatch(setCategory({ ...selector.category, [name]: value, slugName: makeSlug(value) }))
      } else {
        dispatch(setCategory({ ...selector.category, [name]: value }))
      }
    },
    onPositive: () => dispatch(doSave(selector.category)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default CategoryModal;
