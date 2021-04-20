import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import Button from '../../components/Button'
import Heading from '../../components/Heading'
import { destroyToken } from '../../utils/tokenUtils'
import MyQuizzes from '../DashboardPages/MyQuizzes'
import styles from './Dashboard.module.scss'

class Dashboard extends Component {
    onLogOutClick = () => {
      destroyToken()

      window.location.href = '/'
    }

    render () {
      const { user } = this.props

      if (!user) {
        return <h1>Loading...</h1>
      }

      return (
            <>
                <header className={styles.header}>
                    <div className={styles.topbar}>
                        <h1>Quizzery</h1>

                        <div className={styles['topbar--items']}>
                            <p>{user.username}</p>
                            <Button size="nav" color="dark" onClick={this.onLogOutClick}>Log out</Button>
                        </div>
                    </div>

                    <div className={styles.navbar}>
                        <div className={styles['navbar--inner']}>
                            <Link to="/dashboard" className={styles['navbar--item']}>My Quizzes</Link>
                            <Link to="/dashboard/find" className={styles['navbar--item']}>Find Quizzes</Link>
                            <Link to="/dashboard/create" className={styles['navbar--item']}>Create a Quiz</Link>
                        </div>
                    </div>
                </header>

                <section className={styles.content}>
                    <Switch>
                        <Route exact path="/dashboard" component={MyQuizzes} />
                    </Switch>
                </section>
            </>
      )
    }
}

const mapStateToProps = (state) => ({
  user: state.user.self
})

export default connect(mapStateToProps)(Dashboard)
