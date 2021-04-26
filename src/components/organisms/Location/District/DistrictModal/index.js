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
} from '../../../../../redux/reducers/location/districtReducer';

const Render = ({
  openModal,
  formLoading,
  methods,
  watchCustomizeSlug,
  handleSubmit,
  district: {
    id
  },
  provinceList,
  onPositive,
  onClose
}) => {

  return (
    <ModalModule
      title={id ? "Update District" : "Create District"}
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
            label="District Id: "
            name="id"
            width="25%"
            disabled={true}
          />
        }
        <RHFInput
          label="District Name: *"
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
          label="District Slug Name: "
          name="slugName"
        />
      }
      <RHFComboBox
        className="w-full my-2"
        label="Province Name: *"
        name="provinceId"
        selectList={provinceList}
      />
    </ModalModule>
  )
};

const DistrictModal = () => {
  const selector = useSelector(
    ({
      districtReducer: {
        openModal,
        formLoading,
        district,
        provinceList,
      }
    }) => ({
      openModal,
      formLoading,
      district,
      provinceList,
    }),
    shallowEqual
  );

  const methods = useForm({
    defaultValues: selector.district,
    resolver: yupResolver(schema),
  })

  const { handleSubmit, watch, setValue, clearErrors } = methods
  const watchCustomizeSlug = watch("customizeSlug");

  useEffect(() => {
    for (const key in selector.district) {
      if (Object.hasOwnProperty.call(selector.district, key)) {
        const element = selector.district[key];
        setValue(key, element)
      }
    }
    clearErrors()
  }, [selector.district])

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

export default DistrictModal;
