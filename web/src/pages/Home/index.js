import React, { Component } from 'react'
import Button from '../../components/Button'
import BackgroundGradient from '../../components/Button/BackgroundGradient'
import Heading from '../../components/Button/Heading'
import styles from "./Home.module.scss"

class Home extends Component {
    redirect = (to) => () => {
        this.props.history.push(to)
    }

    render() {
        return (
            <BackgroundGradient>
                <div className={styles.header}>
                    <Heading size="main-title">Quizzery</Heading>
                    <div className={styles[`header--btn-box`]}>
                        <Button size="large" color="primary" onClick={this.redirect('/signup')}>Sign up</Button>
                        <Button size="large" color="primary" onClick={this.redirect('/login')}>Log in</Button>
                    </div>
                </div>
            </BackgroundGradient>
        )
    }
}

export default Home;