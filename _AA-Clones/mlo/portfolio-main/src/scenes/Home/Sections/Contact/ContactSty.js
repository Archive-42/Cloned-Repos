import styled from 'styled-components';
import { accent, front, secondary } from '../../../../styles/themes';

const ContactSty = styled.div`
    position: relative;
    height: 570px;
    border: 1px solid ${front};
    padding: 20px;

    label {
        display: none;
    }

    .content {
        display: flex;
        justify-content: space-around;
        width: calc(100% - 40px)
        height: 100%;
    }

    .form, .info {
        padding: 20px;
        background: ${secondary};
        margin: 20px;
        width: 50%;
        height: 400px;
        max-width: 600px;
        min-width: 450px;
    }

    .info {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        min-width: 380px;
    }

    .info-info {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: 40%;
       
    }

    .links {
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: space-around;
       

        svg, .angel {
            height: 50px;
            width: 50px;
        }
        
    }

    .links svg:hover {
        path {
            color: ${accent}
        }
    }

    svg {
        margin-top: 2px;
        height: 90%;
        width: 90%;
    }

    .form button {
        font-size: .6em;
        padding: 5px;
        height: 30px;
        margin: 5px;
        width: 100px;
        align-self: flex-end;
    }

    .info button {
        width: 50%;
        align-self: center;

    }

  
    @media screen and (max-width: 875px ) {
        height: 1100px;

        .content {
            flex-flow: column;
            width: 100%;
            padding: 0px;
            
        }

        .info, .form {
            padding: 20px;
            margin: 20px auto;
           width: 100%;
           min-width: 0px;
           max-width: 700px;
          
        }
    }


   
`;

export default ContactSty;
