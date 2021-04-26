import React, { Component } from 'react'
import { connect } from 'react-redux'
import Heading from '../../../components/Heading'
import { getAllQuizzes } from '../../../redux/quiz/quizActions'
import styles from './FindQuizzes.module.scss'

class FindQuizzes extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    if (!nextProps.quizzes) {
      nextProps.getAllQuizzes()
    }

    return prevState
  }

  onQuizTakeClick = (quizId) => () => {
    this.props.history.push(`/dashboard/quiz/respond/${quizId}`)
  }

  render () {
    const { quizzes } = this.props

    if (!quizzes) {
      return <h1>Loading...</h1>
    }

    return (
      <>
        <Heading>Viewing Quizzes</Heading>

        <div className={styles['quiz-list']}>
          {quizzes.map((quiz, i) => (
            <>
              <div key={`q-${i}`} className={styles['quiz-list__item']}>
                <h1>{quiz.title}</h1>
              </div>
              <div key={`qbb-${i}`} className={styles['quiz-list__button-box']}>
                <button onClick={this.onQuizTakeClick(quiz._id)}>Take Quiz</button>
                <p>{quiz.likers.length} Likes</p>
              </div>
            </>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  quizzes: state.quiz.quizzes
})

const mapDispatchToProps = (dispatch) => ({
  getAllQuizzes: () => dispatch(getAllQuizzes())
})

export default connect(mapStateToProps, mapDispatchToProps)(FindQuizzes)
