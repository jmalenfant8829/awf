import React, { Component } from 'react'
import { connect } from 'react-redux'
import Heading from '../../../components/Heading'
import styles from './MyQuizzes.module.scss'

class MyQuizzes extends Component {
  render () {
    return (
      <>
        <Heading>My Quizzes</Heading>

        <div className={styles['quiz-list']}>
          <div className={styles['quiz-list__item']}>
            <h1>Quiz 1</h1>
          </div>
          <div className={styles['quiz-list__button-box']}>
            <button>Edit</button>
            <button>Delete</button>
            <p>0 Likes</p>
          </div>
          <div className={styles['quiz-list__item']}>
            <h1>Quiz 2</h1>
          </div>
          <div className={styles['quiz-list__button-box']}>
            <button>Edit</button>
            <button>Delete</button>
            <p>0 Likes</p>
          </div>
          <div className={styles['quiz-list__item']}>
            <h1>Quiz 3</h1>
          </div>
          <div className={styles['quiz-list__button-box']}>
            <button>Edit</button>
            <button>Delete</button>
            <p>0 Likes</p>
          </div>
        </div>
      </>
    )
  }
}

export default connect(null, null)(MyQuizzes)
