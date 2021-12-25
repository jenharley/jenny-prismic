import Button from '@mui/material/Button';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { DefaultLayout } from '../components';
import { Title } from './BlogHome';
import { Honeypot, NetlifyForm, Recaptcha } from 'react-netlify-forms';
import { MaxWidthContainer } from '../components/MaxWidthContainer';
import { Grid } from '@mui/material';

const Form = styled(NetlifyForm)`
    display: grid;
    margin: 0 auto;
    max-width: 480px;
    row-gap: 2rem;
`;

const Contact = props => {
    return (
        <DefaultLayout>
            <MaxWidthContainer max={480}>
                <Title style={{ paddingBottom: '3rem' }}>
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
                        <Grid container spacing={4}>
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
                            <Grid item xs={12}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    required
                                    onChange={handleChange}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    required
                                    onChange={handleChange}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="message"
                                    label="Message"
                                    multiline
                                    required
                                    onChange={handleChange}
                                    rows={4}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    disableElevation
                                    endIcon={<SendIcon />}
                                    size="large"
                                    sx={{ width: '100%' }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Form>
            </MaxWidthContainer>
        </DefaultLayout>
    );
};

export default Contact;
