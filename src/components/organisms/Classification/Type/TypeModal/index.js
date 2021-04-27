import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useForm, } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "./yupSchema";

import RHFCheckBox from "../../../../atoms/RHFCheckBox";
import RHFComboBox from "../../../../atoms/RHFComboBox";
import FormGroup from "../../../../atoms/FormGroup";
import RHFInput from "../../../../atoms/RHFInput";
import RHFToggleActive from "../../../../atoms/RHFToggleActive";
import ModalModule from "../../../../molecules/ModalModule";

import {
  closeModal,
  doSave,
  fetchAllTypeGroup
} from '../../../../../redux/reducers/classification/typeReducer';

const Render = ({
  openModal,
  formLoading,
  methods,
  handleSubmit,
  watchCustomizeSlug,
  watchCategoryId,
  type: {
    id
  },
  categoryList,
  typeGroupList,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={id ? "Update Type" : "Create Type"}
    open={openModal}
    loading={formLoading}
    maxWidth="md"
    handleSubmit={handleSubmit(data => onPositive(data))}
    onClose={onClose}
    methods={methods}
  >
    <FormGroup row>
      {id &&
        <RHFInput
          label="Type Id: "
          name="id"
          width="25%"
          disabled={true}
        />
      }
      <RHFInput
        label="Type Name: *"
        name="name"
        width={id ? "70%" : "100%"}
      />
    </FormGroup>
    <FormGroup row>
      <RHFCheckBox
        name="customizeSlug"
        label="Customize Slug"
      />
      <RHFToggleActive />
    </FormGroup>
    {watchCustomizeSlug &&
      <RHFInput
        label="Type Slug Name: "
        name="slugName"
      />
    }
    <FormGroup row>
      <RHFComboBox
        className="w-1/2 my-2 -mx-1"
        label="Category Name: *"
        name="categoryId"
        selectList={categoryList}
      />
      <RHFComboBox
        className="w-1/2 my-2 -mx-1"
        disabled={!watchCategoryId}
        label="Type Group Name"
        name="typeGroupId"
        selectList={typeGroupList}
      />
    </FormGroup>
  </ModalModule>
);

const TypeModal = () => {
  const selector = useSelector(
    ({
      typeReducer: {
        openModal,
        formLoading,
        type,
        categoryList,
        typeGroupList,
      }
    }) => ({
      openModal,
      formLoading,
      type,
      categoryList,
      typeGroupList,
    }),
    shallowEqual
  );

  const methods = useForm({
    defaultValues: selector.type,
    resolver: yupResolver(schema),
  })

  const { handleSubmit, watch, setValue, clearErrors } = methods
  const watchCustomizeSlug = watch("customizeSlug");
  const watchCategoryId = watch("categoryId");

  useEffect(() => {
    for (const key in selector.type) {
      if (Object.hasOwnProperty.call(selector.type, key)) {
        const element = selector.type[key];
        setValue(key, element)
      }
    }
    clearErrors()
  }, [selector.type])

  useEffect(() => {
    if (watchCategoryId) {
      dispatch(fetchAllTypeGroup(watchCategoryId.value))
    }
    setValue("typeGroupId", "")
  }, [watchCategoryId])

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    methods,
    dispatch,
    handleSubmit,
    watchCustomizeSlug,
    watchCategoryId,
    onPositive: (data) => dispatch(doSave(data)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default TypeModal;
