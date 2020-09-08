import React, { useState, useEffect } from 'react';
import Input from "./Input";
import * as yup from 'yup';
import axios from 'axios';

function Form() {
    //State for form
    const defaultState = {
        name: '',
        email: '',
        userPassword: '',
        terms: false
    };

    //Various States
    const [formData, setFormData] = useState(defaultState);
    const [errorState, setErrorState] = useState({...defaultState, terms: ''});
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [addUserList, setAddUserList] = useState([]);

    //formstate Schema
    const formSchema = yup.object().shape({
        name: yup.string().required("Enter name please."),
        email: yup
            .string()
            .required("Enter your email please.")
            .email("Not a valid email."),
        userPassword: yup
            .string()
            .required("Please enter password"),
        terms: yup
            .boolean()
            .oneOf([false], "Please agree to terms and conditions")
    });

    //effect
    useEffect(() => {
        if (formData.terms) {
            setButtonDisabled(!formData.terms);
        }
    }, [formData]);

    //onSubmit function
    const submitForm = e => {
        e.preventDefault();
        console.log("form submitted!");
        axios 
            .post("https://reqres.in/api/users", formData)
            .then(resp=> {
                setAddUserList(addUserList.concat(resp.data));
            })
            .catch(err=>console.log(err));
    };

    //does yup validation equal schema
    const validateChange = e => {
        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then( valid =>{
            setErrorState({
                ...errorState,
                [e.target.name]: ''
            });
        })
        .catch(err=>{
            console.log(err.errors);
            setErrorState({
                ...errorState,
                [e.target.name]: err.errors[0]
            });
        });
    };

    //handling change within the form
    const inputChange = e => {
        //determine the form value
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
        validateChange(e);
    };

    return (
        <form onSubmit={submitForm}>
            <Input 
                type='text'
                name='name'
                onChange={inputChange}
                value={formData.name}
                label='name'
                errors={errorState}
            />
            <Input 
            type='email'
            name='email'
            onChange={inputChange}
            value={formData.email}
            label='email'
            errors={errorState}
            />
            <Input
            type='password'
            name='userPassword'
            onChange={inputChange}
            value={formData.userPassword}
            label='userPassword'
            errors={errorState}
            />
            <label className='terms' htmlFor='terms'>
                <input name='terms' type='checkbox' onChange={inputChange} />
                Terms and Conditions!
            </label>
            <button disabled={buttonDisabled}>Submit Here!</button>
        </form>
    );
}

export default Form;