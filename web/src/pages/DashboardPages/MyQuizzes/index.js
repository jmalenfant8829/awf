import React, { Component } from 'react'
import { connect } from 'react-redux'
import Heading from '../../../components/Heading'
import { getAllQuizzes, deleteQuiz } from '../../../redux/quiz/quizActions'
import styles from './MyQuizzes.module.scss'

class MyQuizzes extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    props.getAllQuizzes()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!nextProps.quizzes) {
      nextProps.getAllQuizzes()
    }

    return prevState
  }

  onQuizDeleteClick = (quizId) => () => {
    this.props.deleteQuiz(quizId)
  }

  render () {
    const { quizzes } = this.props

    if (!quizzes) {
      return <h1>Loading...</h1>
    }

    console.log('Quizzes', quizzes)

    return (
      <>
        <Heading>My Quizzes</Heading>

        <div className={styles['quiz-list']}>
          {quizzes.map((quiz, i) => (
            <>
              <div key={`q-${i}`} className={styles['quiz-list__item']}>
                <h1>{quiz.title}</h1>
              </div>
              <div key={`qbb-${i}`} className={styles['quiz-list__button-box']}>
                <button onClick={this.onQuizDeleteClick(quiz._id)}>Delete</button>
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
  getAllQuizzes: () => dispatch(getAllQuizzes()),
  deleteQuiz: (quizId) => dispatch(deleteQuiz(quizId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyQuizzes)
