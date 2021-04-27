import React, { Component } from 'react'
import { connect } from 'react-redux'
import Heading from '../../../components/Heading'
import { getAllQuizzes } from '../../../redux/quiz/quizActions'
import styles from './FindQuizzes.module.scss'
import TextInput from '../../../components/TextInput/index'
import Button from '../../../components/Button/index'

class FindQuizzes extends Component {
  constructor () {
    super()
    this.state = {
      search: null
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log(nextProps, prevState)
    if (!nextProps.quizzes || prevState.update_quizzes) {
      nextProps.getAllQuizzes(prevState.search)
      prevState.update_quizzes = false
    }

    return prevState
  }

  onQuizTakeClick = (quizId) => () => {
    this.props.history.push(`/dashboard/quiz/respond/${quizId}`)
  }

  onQuizNewClick = () => () => {
    this.props.history.push('/dashboard/quiz/create')
  }

  onQuizSearchClick = () => () => {
    this.setState((prevState) => ({
      search: prevState['search-text'],
      update_quizzes: true
    }))
  }

  onChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  render () {
    const { quizzes } = this.props

    if (!quizzes) {
      return <h1>Loading...</h1>
    }

    return (
      <>
        <Heading>Viewing Quizzes</Heading>

        <div className={styles['quiz-list-search-bar']}>
          <Button
                onClick={this.onQuizNewClick()}
                key='qs-1'>
            Create New Quiz!
          </Button>

          <div
                className={styles['quiz-list-search-gap']}
                key='qs-2'/>

          <TextInput
                className={styles['quiz-list-search']}
                type="text"
                name="search-text"
                placeholder="Search"
                onChange={this.onChange}
                error={null}
                key='qs-3'
              />

          <Button
              onClick={this.onQuizSearchClick()}
              key='qs-4'>
            Search
          </Button>
        </div>

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
  getAllQuizzes: (search) => dispatch(getAllQuizzes(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(FindQuizzes)
