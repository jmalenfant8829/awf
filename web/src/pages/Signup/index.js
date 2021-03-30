import React, { Component } from 'react'
import Button from '../../components/Button';
import BackgroundGradient from '../../components/BackgroundGradient';
import Heading from '../../components/Heading';
import FullscreenForm from '../../components/FullscreenForm';
import TextInput from '../../components/TextInput';
import styles from "./Signup.module.scss";

class Signup extends Component {
    render() {
        return (
            <BackgroundGradient>
                <FullscreenForm heading="SIGN UP">
                    <TextInput type="text" name="username" placeholder="Username" />
                    <TextInput type="email" name="email" placeholder="Email" />
                    <TextInput type="password" name="password" placeholder="Password" />
                    <TextInput type="password" name="passwordConfirm" placeholder="Confirm Password" />
                    
                    <Button size="fullwidth" color="primary">Sign up</Button>
                </FullscreenForm>
            </BackgroundGradient>
        )
    }
}

export default Signup;