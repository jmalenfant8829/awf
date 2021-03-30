import React, { Component } from 'react'
import Button from '../../components/Button';
import BackgroundGradient from '../../components/BackgroundGradient';
import Heading from '../../components/Heading';
import FullscreenForm from '../../components/FullscreenForm';
import TextInput from '../../components/TextInput';
import styles from "./Login.module.scss";

class Login extends Component {
    render() {
        return (
            <BackgroundGradient>
                <FullscreenForm heading="LOG IN">
                    <TextInput type="email" name="email" placeholder="Email" />
                    <TextInput type="password" name="password" placeholder="Password" />
                    
                    <Button size="fullwidth" color="primary">Log in</Button>
                </FullscreenForm>
            </BackgroundGradient>
        )
    }
}

export default Login;