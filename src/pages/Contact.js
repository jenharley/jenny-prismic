import React, { useState } from 'react';
import { DefaultLayout } from '../components';

const Contact = props => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const encode = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((k)=>{
            formData.append(k,data[k])
        });

        return formData;
    }

    const handleSubmit = e => {
        const data = { 'form-name': 'contact', name, email, message }
        
        fetch('/', {
            method: 'POST',
            body: encode(data)
        })
        .then(() => setStatus('Form Submission Successful!!'))
        .catch(error => setStatus('Form Submission Failed!'));

        e.preventDefault();
    };

    const handleChange = e => {
        const {name, value} = e.target
        if (name === 'name' ){
            return setName(value)
        }

        if (name === 'email' ){
            return setEmail(value)
        }

        if (name === 'message' ){
            return setMessage(value)
        }
    }

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit} action="/thank-you">
                <input type="hidden" name="form-name" value="contact" />
                <label>
                    Your Name: <input type="text" name="name" value={name} onChange={handleChange} />
                </label>
                <label>
                    Your Email: <input type="email" name="email" value={email} onChange={handleChange} />
                </label>
                <label>
                    Message: <textarea name="message" value={message} onChange={handleChange} />
                </label>
                <button type="submit">Send</button>
            </form>
            <h3>{status}</h3>
        </DefaultLayout>
    );
};

export default Contact;