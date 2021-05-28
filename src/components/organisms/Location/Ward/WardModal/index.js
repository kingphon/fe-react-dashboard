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
  fetchAllDistrict
} from '../../../../../redux/reducers/location/wardReducer';

const Render = ({
  openModal,
  formLoading,
  methods,
  handleSubmit,
  watchCustomizeSlug,
  watchProvinceId,
  ward: {
    id
  },
  provinceList,
  districtList,
  onPositive,
  onClose
}) => (
  <ModalModule
    title={id ? "Update Ward" : "Create Ward"}
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
          label="Ward Id: "
          name="id"
          width="25%"
          disabled={true}
        />
      }
      <RHFInput
        label="Ward Name: *"
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
        label="Ward Slug Name: "
        name="slugName"
      />
    }
    <FormGroup row>
      <RHFComboBox
        className="w-1/2 my-2 -mx-1"
        label="Province Name: *"
        name="provinceId"
        selectList={provinceList}
      />
      <RHFComboBox
        className="w-1/2 my-2 -mx-1"
        disabled={!watchProvinceId}
        label="District Name"
        name="districtId"
        selectList={districtList}
      />
    </FormGroup>
  </ModalModule>
);

const WardModal = () => {
  const selector = useSelector(
    ({
      wardReducer: {
        openModal,
        formLoading,
        ward,
        provinceList,
        districtList,
      }
    }) => ({
      openModal,
      formLoading,
      ward,
      provinceList,
      districtList,
    }),
    shallowEqual
  );

  const methods = useForm({
    defaultValues: selector.ward,
    resolver: yupResolver(schema),
  })

  const { handleSubmit, watch, setValue, clearErrors } = methods
  const watchCustomizeSlug = watch("customizeSlug");
  const watchProvinceId = watch("provinceId");

  useEffect(() => {
    for (const key in selector.ward) {
      if (Object.hasOwnProperty.call(selector.ward, key)) {
        const element = selector.ward[key];
        setValue(key, element)
      }
    }
    clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.ward])

  useEffect(() => {
    if (watchProvinceId) {
      dispatch(fetchAllDistrict(watchProvinceId.value))
    }
    setValue("districtId", "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchProvinceId])

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    methods,
    handleSubmit,
    watchCustomizeSlug,
    watchProvinceId,
    onPositive: (data) => dispatch(doSave(data)),
    onClose: () => dispatch(closeModal())
  };

  return <Render {...renderProps} />;
};

export default WardModal;
