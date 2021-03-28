import Title from '../../../../components/Title';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import ContactSty from './ContactSty';

function Contact() {
    return (
        <ContactSty>
            <Title title={'Contact Me'} id={'contact'} />
            <div className='content'>
                <ContactInfo />
                <ContactForm className='form' />
            </div>
        </ContactSty>
    );
}

export default Contact;
