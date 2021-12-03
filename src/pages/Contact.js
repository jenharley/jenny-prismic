import Button from '@mui/material/Button';
import React, { useState } from 'react';
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
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const encode = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((k) => {
            formData.append(k, data[k]);
        });

        return formData;
    };

    const handleSubmit = e => {
        const data = { 'form-name': 'contact', name, email, message };

        fetch('/', {
            method: 'POST',
            body: encode(data)
        })
            .then(() => setStatus('Sent'))
            .catch(() => setStatus('Error sending, please try again.'));

        e.preventDefault();
    };

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'name') {
            return setName(value);
        }

        if (name === 'email') {
            return setEmail(value);
        }

        if (name === 'message') {
            return setMessage(value);
        }
    };

    return (
        <DefaultLayout>
            <h2>Contact</h2>
            <Form onSubmit={handleSubmit} action="/thank-you" data-netlify="true" data-netlify-recaptcha="true">
                <TextField
                    autoComplete="name"
                    id="name"
                    label="Name"
                    onChange={handleChange}
                    required
                />
                <TextField
                    autoComplete="email"
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    required
                    type="email"
                />
                <TextField
                    id="message"
                    label="Message"
                    multiline
                    onChange={handleChange}
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
            <h3>{status}</h3>
        </DefaultLayout>
    );
};

export default Contact;
