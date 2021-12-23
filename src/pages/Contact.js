import Button from '@mui/material/Button';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { DefaultLayout } from '../components';

const Form = styled.form`
    display: grid;
    margin: 0 auto;
    max-width: 480px;
    row-gap: 2rem;
`;

const Contact = props => {
    return (
        <DefaultLayout>
            <h2>Contact</h2>
            <Form method="POST" data-netlify="true" data-netlify-recaptcha="true" name="contact">
                <TextField
                    autoComplete="name"
                    id="name"
                    label="Name"
                    required
                />
                <TextField
                    autoComplete="email"
                    id="email"
                    label="Email"
                    required
                    type="email"
                />
                <TextField
                    id="message"
                    label="Message"
                    multiline
                    required
                    rows={4}
                />
                <Button
                    disableElevation
                    endIcon={<SendIcon />}
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Send
                </Button>
            </Form>
        </DefaultLayout>
    );
};

export default Contact;
