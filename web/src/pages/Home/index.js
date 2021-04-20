import React, { Component } from 'react'
import Button from '../../components/Button'
import BackgroundGradient from '../../components/BackgroundGradient'
import Heading from '../../components/Heading'
import styles from "./Home.module.scss"
import { connect } from 'react-redux'

class Home extends Component {
    redirect = (to) => () => {
        this.props.history.push(to)
    }

    render() {
        const { self } = this.props;

        const isAuthenticated = self && self.isAuthenticated

        return (
            <BackgroundGradient>
                <div className={styles.header}>
                    <Heading size="main-title">Quizzery</Heading>
                    <div className={styles[`header--btn-box`]}>
                        { !isAuthenticated ? (
                            <>
                                <Button size="large" color="primary" onClick={this.redirect('/signup')}>Sign up</Button>
                                <Button size="large" color="primary" onClick={this.redirect('/login')}>Log in</Button>
                            </>
                        ) : (
                            <Button size="fullwidth" color="primary" onClick={this.redirect('/dashboard')}>Go to Dashboard</Button>
                        )}
                    </div>
                </div>
            </BackgroundGradient>
        )
    }
}

const mapStateToProps = (state) => ({
    self: state.user.self,
})

export default connect(mapStateToProps)(Home);