import React, { useState, useEffect } from "react";
import FormInput from "../FormInput";
import Slug from "../Slug";
import { makeSlug } from "../../../commons/utils";
import './style.css'

const FormInputSlug = ({
    defaultValue,
    defaultSlugValue,
    valueError = '',
    slugValueError = '',
    onChange,
    onChangeSlugValue,
    ...rest
}) => {
    const [state, setState] = useState({
        tempSlugValue: "",
        slugValue: defaultSlugValue,
        valueError: valueError,
        slugValueError: slugValueError,
        edit: false
    });

    useEffect(() => {
        setState({ ...state, valueError, slugValueError })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueError, slugValueError])

    const handleChangeValue = (e, input, error) => {
        const slugValue = makeSlug(input.value);
        if (!state.tempSlugValue) {
            setState({ ...state, slugValue, valueError: "", slugValueError: "" });
        }
        state.tempSlugValue ? onChange(e, input, error) : onChange(e, input, slugValue, error);
        
    };

    const handleChangeSlugValue = (_, input, error) => {
        const tempSlugValue = makeSlug(input.value);
        setState({ ...state, tempSlugValue, slugValueError: "" });
        onChangeSlugValue(tempSlugValue, error);
    };

    const handleCancel = () => {
        onChangeSlugValue(state.slugValue);
        setState({ ...state, edit: false });
    }

    const ButtonLink = props => (
        <button {...props}>
            {props.children}
        </button>
    );

    const handleClickOk = () => {
        setState({ ...state, slugValue: state.tempSlugValue, edit: false });
    };
    
    return (
        <div className="input-slug">
            <FormInput
                defaultValue={defaultValue}
                error={state.valueError}
                onChange={handleChangeValue}
                {...rest}
            />
            {state.edit ? (
                <div className="edit-area">
                    <FormInput
                        label="Slug: "
                        defaultValue={state.slugValue}
                        error={state.slugValueError}
                        onChange={handleChangeSlugValue}
                    />
                    <p>
                        <ButtonLink onClick={handleClickOk}>Ok</ButtonLink>
                        &nbsp;&nbsp;
                        <ButtonLink onClick={handleCancel}>Cancel</ButtonLink>
                    </p>
                </div>
            ) : state.slugValue ? (
                <>
                    <p
                        className={`slug-input--display ${
                        state.slugValueError ? "error" : ""
                        }`}
                    >
                        <Slug>{state.tempSlugValue}</Slug>
                        <ButtonLink
                            onClick={_ =>
                                setState({
                                ...state,
                                tempSlugValue: state.slugValue,
                                edit: true
                                })
                            }
                        >
                        Edit
                        </ButtonLink>
                        {state.slugValueError ? (
                        <span className="slug-input--error">{state.slugValueError}</span>
                        ) : null}
                    </p>
                </>
            ) : null}
        </div>
    );
}

export default FormInputSlug;
