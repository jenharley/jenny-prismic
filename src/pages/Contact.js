import Button from '@mui/material/Button';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { DefaultLayout } from '../components';
import { Title } from './BlogHome';
import { Honeypot, NetlifyForm, Recaptcha } from 'react-netlify-forms';

const Form = styled(NetlifyForm)`
    display: grid;
    margin: 0 auto;
    max-width: 480px;
    row-gap: 2rem;
`;

const Contact = props => {
    return (
        <DefaultLayout>
            <Title>
                Contact
            </Title>
            <Form
                name='contact'
                action='/thanks'
                honeypotName='bot-field'
                enableRecaptcha
                onSuccess={(response, context) => {
                    console.log('Successfully sent form data to Netlify Server');
                    context.formRef.current.reset();
                }}
            >
                {({ handleChange, success, error }) => (
                    <>
                        <Honeypot />
                        <Recaptcha siteKey={'6LegXXcdAAAAACtakT-rVDrxVVTHKRhs9mE4jHKE'} invisible />
                        {success && (
                            <p sx={{ variant: 'alerts.success', p: 3 }}>
                            Thanks for contacting us!
                            </p>
                        )}
                        {error && (
                            <p sx={{ variant: 'alerts.muted', p: 3 }}>
                            Sorry, we could not reach servers. Because it only works on Netlify,
                            our GitHub demo does not provide a response.
                            </p>
                        )}
                        <div>
                            <TextField
                                id="name"
                                label="Name"
                                required
                            />
                        </div>
                        <div sx={{ pt: 2 }}>
                            <TextField
                                id="message"
                                label="Message"
                                multiline
                                required
                                rows={4}
                            />
                        </div>
                        <div sx={{ pt: 3 }}>
                            <Button
                                disableElevation
                                endIcon={<SendIcon />}
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Send
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </DefaultLayout>
    );
};

export default Contact;
