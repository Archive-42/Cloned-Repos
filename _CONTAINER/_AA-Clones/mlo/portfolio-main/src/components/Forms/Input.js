import { useEffect } from 'react';
import styled from 'styled-components';
import { accent } from '../../styles/themes';

const StyledInput = styled.input`
    margin: 5px;
    height: 35px;
    font-size: 0.7em;
    font-family: 'Rubik', sans-serif;

    :focus {
        outline: none;
        border: ${accent} 3px solid;
    }
`;

const StyledTextArea = styled.textarea`
    margin: 5px;
    height: 100px;
    font-size: 0.7em;
    font-family: 'Rubik', sans-serif;

    :focus {
        outline: none;
        border: ${accent} 3px solid;
    }
`;

export default function Input({
    name,
    placeholder,
    initValue,
    type = 'text',
    label,
    required = false,
    setFormFields,
    formFields,
    disabled,
}) {
    useEffect(() => {
        initValue &&
            setFormFields((state) => {
                return {
                    ...state,
                    [name]: initValue,
                };
            });
    }, [initValue, name, setFormFields]);

    const onChange = (e) => {
        setFormFields((state) => {
            return {
                ...state,
                [e.target.name]: e.target.value,
            };
        });
    };

    const props = {
        disabled,
        required,
        onChange,
        id: `${name}Input`,
        name,
        value: formFields[name] || '',
        placeholder,
        type,
    };

    return (
        <>
            {label && <label htmlFor={`${name}Input`}>{label}</label>}

            {type === 'textarea' ? (
                <StyledTextArea {...props} />
            ) : (
                <StyledInput {...props} />
            )}
        </>
    );
}
