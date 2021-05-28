import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useForm, } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "./yupSchema";

import RHFCheckBox from "../../../../atoms/RHFCheckBox";
import FormGroup from "../../../../atoms/FormGroup";
import RHFInput from "../../../../atoms/RHFInput";
import RHFToggleActive from "../../../../atoms/RHFToggleActive";
import ModalModule from "../../../../molecules/ModalModule";

import {
  closeModal,
  doSave
} from '../../../../../redux/reducers/location/provinceReducer';

const Render = ({
  openModal,
  formLoading,
  methods,
  handleSubmit,
  watchCustomizeSlug,
  province: {
    id
  },
  onPositive,
  onClose
}) => (
  <ModalModule
    title={id ? "Update Province" : "Create Province"}
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
          label="Province Id: "
          name="id"
          width="25%"
          disabled={true}
        />
      }
      <RHFInput
        label="Province Name: *"
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
        label="Province Slug Name: "
        name="slugName"
      />
    }
  </ModalModule>
);

const ProvinceModal = () => {
  const selector = useSelector(
    ({
      provinceReducer: {
        openModal,
        formLoading,
        province,
      }
    }) => ({
      openModal,
      formLoading,
      province,
    }),
    shallowEqual
  );

  const methods = useForm({
    defaultValues: selector.province,
    resolver: yupResolver(schema),
  })

  const { handleSubmit, watch, setValue, clearErrors } = methods
  const watchCustomizeSlug = watch("customizeSlug"); // you can supply default value as second argument

  useEffect(() => {
    for (const key in selector.province) {
      if (Object.hasOwnProperty.call(selector.province, key)) {
        const element = selector.province[key];
        setValue(key, element)
      }
    }
    clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.province])

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    methods,
    handleSubmit,
    watchCustomizeSlug,
    onPositive: (data) => dispatch(doSave(data)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default ProvinceModal;
