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
} from '../../../../../redux/reducers/classification/typeGroupReducer';

const Render = ({
  openModal,
  formLoading,
  methods,
  watchCustomizeSlug,
  handleSubmit,
  typeGroup: {
    id
  },
  categoryList,
  onPositive,
  onClose
}) => {

  return (
    <ModalModule
      title={id ? "Update Type Group" : "Create Type Group"}
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
            label="Type Group Id: "
            name="id"
            width="25%"
            disabled={true}
          />
        }
        <RHFInput
          label="Type Group Name: *"
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
          label="Type Group Slug Name: "
          name="slugName"
        />
      }
      <RHFComboBox
        className="w-full my-2"
        label="Category Name: *"
        name="categoryId"
        selectList={categoryList}
      />
    </ModalModule>
  )
};

const TypeGroupModal = () => {
  const selector = useSelector(
    ({
      typeGroupReducer: {
        openModal,
        formLoading,
        typeGroup,
        categoryList,
      }
    }) => ({
      openModal,
      formLoading,
      typeGroup,
      categoryList,
    }),
    shallowEqual
  );

  const methods = useForm({
    defaultValues: selector.typeGroup,
    resolver: yupResolver(schema),
  })

  const { handleSubmit, watch, setValue, clearErrors } = methods
  const watchCustomizeSlug = watch("customizeSlug");

  useEffect(() => {
    for (const key in selector.typeGroup) {
      if (Object.hasOwnProperty.call(selector.typeGroup, key)) {
        const element = selector.typeGroup[key];
        setValue(key, element)
      }
    }
    clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.typeGroup])

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    methods,
    watchCustomizeSlug,
    handleSubmit,
    onPositive: (data) => dispatch(doSave(data)),
    onClose: () => dispatch(closeModal())
  };
  return <Render {...renderProps} />;
};

export default TypeGroupModal;
