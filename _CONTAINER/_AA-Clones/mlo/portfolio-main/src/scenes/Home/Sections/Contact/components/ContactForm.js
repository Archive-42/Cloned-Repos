import Form from '../../../../../components/Forms/Form';
import Input from '../../../../../components/Forms/Input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

function ContactForm() {
    const { setCursor } = useContext(ThemeContext);
    const [disabled, setDisabled] = useState(false);
    const { REACT_APP_SERVICE_ID, REACT_APP_USER_ID } = process.env;

    const onSubmit = async (e) => {
        setCursor('progress');
        setDisabled(true);
        const { status } = await emailjs.sendForm(
            REACT_APP_SERVICE_ID,
            'template_a4dhi9r',
            e.target,
            REACT_APP_USER_ID
        );
        setCursor('default');
        setDisabled(false);
        if (status === 200) {
            toast.success('Email Sent!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Something went wrong! Try Again.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        return status;
    };
    return (
        <div className='form'>
            <Form disabled={disabled} onSubmit={onSubmit} submitButton>
                <Input
                    disabled={disabled}
                    required
                    name='name'
                    placeholder='Name'
                    label='Name'
                />
                <Input
                    disabled={disabled}
                    required
                    name='subject'
                    placeholder='Subject'
                    label='subject'
                />
                <Input
                    disabled={disabled}
                    required
                    name='email'
                    placeholder='Email'
                    label='Email'
                />
                <Input
                    disabled={disabled}
                    name='company'
                    placeholder='Company (optional)'
                    label='Company'
                />
                <Input
                    disabled={disabled}
                    name='phone'
                    placeholder='Phone Number (optional)'
                    label='phone'
                />

                <Input
                    required
                    disabled={disabled}
                    name='message'
                    placeholder='Write your message here...'
                    label='Message'
                    type='textarea'
                />
            </Form>
        </div>
    );
}

export default ContactForm;
