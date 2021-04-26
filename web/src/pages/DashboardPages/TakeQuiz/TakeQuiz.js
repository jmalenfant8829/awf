import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import Heading from '../../../components/Heading'
import { getAllQuizzes } from '../../../redux/quiz/quizActions'
import styles from './TakeQuiz.module.scss'

class TakeQuiz extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quiz: null
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const id = nextProps.match.params.id

    if (!id) {
      prevState.quiz = false
      return prevState
    }

    const { quizzes } = nextProps

    if (!quizzes) {
      nextProps.getAllQuizzes()
      return prevState
    }

    let quiz = quizzes.filter(quiz => quiz._id === id)

    if (!Array.isArray(quiz) || quiz.length === 0) {
      prevState.quiz = false
      return prevState
    }

    quiz = quiz[0]

    prevState.quiz = quiz

    return prevState
  }

  onAnswerChange = (questionId) => (e) => {
    this.setState((prevState) => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [e.target.name]: e.target.value
      }
    }))
  }

  render () {
    const { quiz } = this.state

    console.log(this.state)

    if (quiz === false) {
      return <>
        <Heading>Quiz not found</Heading>
      </>
    } else if (!quiz) {
      return <>
        <Heading>Loading...</Heading>
      </>
    }

    const { questions } = quiz

    return (
      <>
        <Heading>Taking Quiz: {quiz.title}</Heading>

        <div className={styles.questions}>
          {questions.map((question, i) => (
            <div key={`q-${i}`} className={styles.question}>
              <div className={styles.question__heading}>
                {i + 1}. {question.description}
              </div>
              <div className={styles.question__answers}>
                {question.answers.map((answer, i) => (
                  <>
                    <label className={styles.answer}>
                      <input
                        name={question._id}
                        value={answer._id}
                        type="radio"
                        onChange={this.onAnswerChange(question._id)}
                      />
                      {answer.description}
                    </label>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button>Submit Response</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TakeQuiz)
