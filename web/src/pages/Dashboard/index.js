import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import Button from '../../components/Button'
import { destroyToken } from '../../utils/tokenUtils'
import CreateQuiz from '../DashboardPages/CreateQuiz'
import MyQuizzes from '../DashboardPages/MyQuizzes'
import FindQuizzes from '../DashboardPages/FindQuizzes'
import styles from './Dashboard.module.scss'
import TakeQuiz from '../DashboardPages/TakeQuiz/TakeQuiz'

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
                            <Link to="/dashboard/quizzes" className={styles['navbar--item']}>Find Quizzes</Link>
                            <Link to="/dashboard/quiz/create" className={styles['navbar--item']}>Create a Quiz</Link>
                        </div>
                    </div>
                </header>

                <section className={styles.content}>
                    <Switch>
                        <Route exact path="/dashboard" component={MyQuizzes} />
                        <Route exact path="/dashboard/quiz/create" component={CreateQuiz} />
                        <Route exact path="/dashboard/quizzes" component={FindQuizzes} />
                        <Route exact path="/dashboard/quiz/respond/:id" component={TakeQuiz} />
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
