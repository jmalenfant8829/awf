import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Heading from '../../components/Heading'
import styles from "./Dashboard.module.scss"

class Dashboard extends Component {
    render() {
        return (
            <>
                <header className={styles.header}>
                    <div className={styles.topbar}>
                        <h1>Quizzery</h1>

                        <div className={styles['topbar--items']}>
                            <p>janedoe</p>
                            <Button size="nav" color="dark">Log out</Button>
                        </div>
                    </div>

                    <div className={styles.navbar}>
                        <div className={styles['navbar--inner']}>
                            <Link className={styles[`navbar--item`]}>My Quizzes</Link>
                            <Link className={styles[`navbar--item`]}>Find Quizzes</Link>
                            <Link className={styles[`navbar--item`]}>Create a Quiz</Link>
                        </div>
                    </div>
                </header>

                <section className={styles.content}>
                    <Heading size="subtitle">Test</Heading>
                </section>
            </>
        )
    }
}

export default Dashboard