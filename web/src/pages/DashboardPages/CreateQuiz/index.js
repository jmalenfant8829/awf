import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import Heading from '../../../components/Heading'
import TextInput from '../../../components/TextInput'
import styles from './CreateQuiz.module.scss'

class CreateQuiz extends Component {
  constructor () {
    super()

    this.state = {
      questions: {}
    }
  }

  onQuizNameChange = (e) => {
    this.setState((prevState) => ({
      name: e.target.value
    }))
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
    console.log('Question ', questionIndex, ': ', e.target.value)

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

  render () {
    const { questions: questionsObj, selectedQuestion } = this.state

    const questions = Object.values(questionsObj)

    const selected = questions[selectedQuestion - 1]

    console.log(questionsObj)

    return (
      <>
          <Heading>Create Quiz</Heading>

          <div className={styles.container}>
            <TextInput
              className={styles.nameinput}
              type="text"
              name="name"
              placeholder="Quiz name"
              onChange={this.onQuizNameChange}
            />

            <div className={styles.form}>
              <div className={styles.form__header}>
                Questions
              </div>
              <div className={styles.form__header}>
                { selected ? `Editing question ${selectedQuestion}` : 'Select a question to edit'}
              </div>

              <div className={styles.form__questions}>
                {questions.map((question, i) => (
                  <div key={i} question={i + 1} onClick={this.onQuestionClick}>{`Question ${i + 1}`}</div>
                ))}

                <Button size="fullwidth" onClick={this.onAddQuestionClick}>Add Question</Button>
              </div>

              <div className={styles['form__question-edit']}>
                { selected && (
                  <>
                    <TextInput
                      type="text"
                      placeholder="Question"
                      value={questionsObj[selectedQuestion].description}
                      onChange={this.onDescriptionChange(selectedQuestion)}
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
          </div>
      </>
    )
  }
}

export default connect(null, null)(CreateQuiz)
