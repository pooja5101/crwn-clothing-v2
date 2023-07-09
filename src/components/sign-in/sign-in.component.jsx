import { Fragment, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle =async () => {
         const {user} = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

            try {
                const response = await signInAuthUserWithEmailAndPassword(email, password);
                console.log(response);
                resetFormFields();
            } catch (error) {
                switch (error.code) {
                    
                }
                console.log('An error occurred'+error.message);
            }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an Account</h2>
            <span>Sign In with email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label='Email'
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}/>

                <FormInput 
                    label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} 
                    />

                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>Sign In With Google</Button>
            </form>
        </div>
    )
};

export default SignIn;