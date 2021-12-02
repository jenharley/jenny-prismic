import React, { useState } from 'react';
import { DefaultLayout } from '../components';

export const Contact = props => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const handleSubmit = (event) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", email, name, message })
        })
        .then(() => console.log("Success!"))
        .catch(error => console.warn(error));

        event.preventDefault();
    };


    return (
        <>
            <DefaultLayout seoTitle={"Contact"}>
                Contact
                <form>
                    <label>
                        Your Name: <input type="text" name="name" onChange={e => setName({name: e.target.value})} />
                    </label>
                    <label>
                        Your Email: <input type="email" name="email" onChange={e => setEmail({email: e.target.value})} />
                    </label>
                    <label>
                        Message: <textarea name="message" onChange={e => setMessage({message: e.target.value})} />
                    </label>
                    <button type="submit" onClick={handleSubmit}>Send</button>
                </form>
            </DefaultLayout>
        </>
    )
};

export default Contact;