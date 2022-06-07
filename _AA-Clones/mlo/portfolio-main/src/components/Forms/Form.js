import { useState, cloneElement } from 'react';
import styled from 'styled-components';
import Input from './Input';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export default function Form({
    id,
    children,
    onSubmit,
    style = {},
    disabled,
    submitButton,
}) {
    const [formFields, setFormFields] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSubmit) {
            const status = await onSubmit(e);
            if (status === 200) {
                setFormFields({});
            }
        } else {
            console.log(
                "Please add an onSubmit to your Form... This is your form's current state:"
            );
            console.log(formFields);
        }
    };

    return (
        <StyledForm id={id} style={style} onSubmit={handleSubmit}>
            {Array.isArray(children)
                ? children.map((child, i) =>
                      child.type === Input
                          ? cloneElement(child, {
                                formFields,
                                setFormFields,
                                key: i,
                            })
                          : child
                  )
                : cloneElement(children, { formFields, setFormFields })}
            {submitButton && (
                <button disabled={disabled} type='submit'>
                    Submit
                </button>
            )}
        </StyledForm>
    );
}
