import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from '../../../components/Alert'
import Button from '../../../components/Button'
import Heading from '../../../components/Heading'
import TextInput from '../../../components/TextInput'
import { createQuiz } from '../../../redux/quiz/quizActions'
import styles from './CreateQuiz.module.scss'

class CreateQuiz extends Component {
  constructor () {
    super()

    this.state = {
      questions: {},
      errors: {},
      name: ''
    }
  }

  onQuizNameChange = (e) => {
    e.stopPropagation()

    this.setState({
      name: e.target.value
    })
  }

  onAddQuestionClick = () => {
    const { questions } = this.state

    const newIndex = Object.keys(questions).length + 1

    questions[newIndex] = {
      description: '',
      answers: {}
    }

    this.setState({
      questions
    })
  }

  onQuestionClick = (e) => {
    const index = e.target.attributes.question.value

    this.setState({
      selectedQuestion: parseInt(index)
    })
  }

  onDescriptionChange = (questionIndex) => (e) => {
    this.setState((prevState) => ({
      ...prevState,
      questions: {
        ...prevState.questions,
        [questionIndex]: {
          ...prevState.questions[questionIndex],
          description: e.target.value
        }
      }
    }))
  }

  onAddAnswerClick = (questionIndex) => () => {
    const { questions } = this.state

    const question = questions[questionIndex]

    question.answers[Object.keys(question.answers).length + 1] = {
      description: '',
      isCorrect: false
    }

    this.setState((prevState) => ({
      ...prevState,
      questions: {
        ...prevState.questions,
        [questionIndex]: question
      }
    }))
  }

  onAnswerDescriptionChange = (questionIndex, answerIndex) => (e) => {
    this.setState((prevState) => ({
      ...prevState,
      questions: {
        ...prevState.questions,
        [questionIndex]: {
          ...prevState.questions[questionIndex],
          answers: {
            ...prevState.questions[questionIndex].answers,
            [answerIndex]: {
              ...prevState.questions[questionIndex].answers[answerIndex],
              description: e.target.value
            }
          }
        }
      }
    }))
  }

  onCorrectAnswerChange = (questionIndex, answerIndex) => (e) => {
    this.setState((prevState) => ({
      ...prevState,
      questions: {
        ...prevState.questions,
        [questionIndex]: {
          ...prevState.questions[questionIndex],
          answers: {
            ...prevState.questions[questionIndex].answers,
            [answerIndex]: {
              ...prevState.questions[questionIndex].answers[answerIndex],
              isCorrect: e.target.checked
            }
          }
        }
      }
    }))
  }

  onCreateQuiz = () => {
    const { questions } = this.state
    let { name } = this.state

    let errorsExist = false
    const errors = {
      questions: {}
    }

    name = name.trim()

    if (!name || name.length === 0) {
      errorsExist = true
      errors.name = 'You must enter a name for this quiz'
    }

    if (!questions || Object.keys(questions).length === 0) {
      errorsExist = true
      errors.general = 'You must create at least one question'
    } else {
      Object.keys(questions).forEach(key => {
        let correctAnswerExists = false
        const question = questions[key]

        if (!question.description) {
          errorsExist = true
          errors.questions[key] = {}
          errors.questions[key].description = 'You must provide a description'
        }

        const { answers } = question

        if (!answers || Object.keys(answers).length === 0) {
          errorsExist = true

          if (!errors.questions[key]) {
            errors.questions[key] = {}
          }
          errors.questions[key].general = `Question ${key} must have at least one possible answer`
        }

        Object.keys(answers).forEach(key => {
          if (answers[key].isCorrect) {
            correctAnswerExists = true
          }
        })

        if (!correctAnswerExists) {
          if (!errors.questions[key]) {
            errors.questions[key] = {}
            errorsExist = true
            errors.questions[key].general = `Question ${key} must have a correct answer`
          }
        }
      })
    }

    this.setState({
      errors
    })

    if (errorsExist) {
      return
    }

    const finalQuestions = []

    Object.keys(questions).forEach(key => {
      const question = questions[key]

      console.log('QUESTION', question)

      const newQuestion = {
        description: question.description,
        answers: []
      }

      Object.keys(question.answers).forEach(key2 => {
        const answer = question.answers[key2]

        newQuestion.answers.push(answer)
      })

      finalQuestions.push(newQuestion)
    })

    this.props.createQuiz({
      title: name,
      questions: finalQuestions
    })
  }

  render () {
    const { questions: questionsObj, selectedQuestion, errors } = this.state

    const questions = Object.values(questionsObj)

    const selected = questions[selectedQuestion - 1]

    if (this.props.success) {
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    }

    return (
      <>
          <Heading>Create Quiz</Heading>

          <Alert type="error" message={this.props.error} />
          <Alert type="success" message={this.props.success} />

          <div className={styles.container}>
            <TextInput
              className={styles.nameinput}
              type="text"
              name="name"
              placeholder="Quiz name"
              onChange={this.onQuizNameChange}
              error={errors.name}
            />

            <Alert type="error" message={errors.general} />

            <div className={styles.form}>
              <div className={styles.form__header}>
                Questions
              </div>
              <div className={styles.form__header}>
                { selected ? `Editing question ${selectedQuestion}` : 'Select a question to edit'}
              </div>

              <div className={styles.form__questions}>
                {questions.map((question, i) => (
                  <div className={errors.questions && errors.questions[i + 1] ? styles.error : ''} key={i} question={i + 1} onClick={this.onQuestionClick}>{`Question ${i + 1}`}</div>
                ))}

                <Button size="fullwidth" onClick={this.onAddQuestionClick}>Add Question</Button>
              </div>

              <div className={styles['form__question-edit']}>
                { selected && (
                  <>
                    <Alert type="error" message={
                      errors.questions &&
                      errors.questions[selectedQuestion]
                        ? errors.questions[selectedQuestion].general
                        : ''}
                    />

                    <TextInput
                      type="text"
                      placeholder="Question"
                      value={questionsObj[selectedQuestion].description}
                      onChange={this.onDescriptionChange(selectedQuestion)}
                      error={
                        errors.questions &&
                        errors.questions[selectedQuestion]
                          ? errors.questions[selectedQuestion].description
                          : null}
                    />

                    { Object.keys(selected.answers).length > 0 && <p>Answers</p> }

                    { Object.keys(selected.answers).map((key, index) => {
                      return <div className={styles.answerentry} key={index}>
                        <TextInput
                          type="text"
                          placeholder={`Answer ${key}`}
                          onChange={this.onAnswerDescriptionChange(selectedQuestion, key)}
                          value={questionsObj[selectedQuestion].answers[key].description}
                        />
                        <label>
                          Correct
                          <input
                            type="checkbox"
                            onChange={this.onCorrectAnswerChange(selectedQuestion, key)}
                            checked={questionsObj[selectedQuestion].answers[key].isCorrect}
                          />
                        </label>
                      </div>
                    })}

                    <Button onClick={this.onAddAnswerClick(selectedQuestion)}>Add Answer</Button>
                  </>
                ) }
              </div>
            </div>

            <Button onClick={this.onCreateQuiz}>Create Quiz</Button>
          </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  success: state.success.createquiz,
  error: state.error.createquiz
})

const mapDispatchToProps = (dispatch) => ({
  createQuiz: (data) => dispatch(createQuiz(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz)
