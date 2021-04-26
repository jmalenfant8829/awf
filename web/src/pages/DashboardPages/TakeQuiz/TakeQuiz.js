import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import Heading from '../../../components/Heading'
import { getAllQuizzes, submitResponse } from '../../../redux/quiz/quizActions'
import styles from './TakeQuiz.module.scss'
import Alert from '../../../components/Alert'

class TakeQuiz extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quiz: null,
      answers: {},
      errors: {},
      submitted: false
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

  onSubmitClicked = () => {
    const { answers, quiz } = this.state

    const errors = {}
    let errorsExist = false

    quiz.questions.forEach(question => {
      if (!answers[question._id]) {
        errors[question._id] = 'Please select an aswer'
        errorsExist = true
      }
    })

    this.setState((prevState) => ({
      ...prevState,
      errors: errors
    }))

    if (errorsExist) {
      return
    }

    console.log(this.props.self.username)

    this.props.submitResponse(quiz._id, this.props.self.username, { selectedAnswers: Object.values(answers) })
  }

  render () {
    const { quiz, errors, submitted } = this.state

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
        <Alert type="error" message={this.props.error} />
        <Alert type="success" message={this.props.success} />

        <div className={styles.questions}>
          {questions.map((question, i) => (
            <div key={`q-${i}`} className={styles.question}>
              <div className={styles.question__heading}>
                {i + 1}. {question.description}
              </div>
              <div className={styles.question__answers}>
                {question.answers.map((answer, i) => (
                  <>
                    <label className={`${styles.answer} ${submitted && answer.isCorrect ? styles.correct : ''}`}>
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

              <div className={styles.error}>{errors[question._id]}</div>
            </div>
          ))}
        </div>

        <Button onClick={this.onSubmitClicked}>Submit Response</Button>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  self: state.user.self,
  quizzes: state.quiz.quizzes,
  error: state.error.response,
  success: state.success.response
})

const mapDispatchToProps = (dispatch) => ({
  getAllQuizzes: () => dispatch(getAllQuizzes()),
  submitResponse: (quizId, username, answers) => dispatch(submitResponse(quizId, username, answers))
})

export default connect(mapStateToProps, mapDispatchToProps)(TakeQuiz)
