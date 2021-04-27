import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './QuizResults.module.scss'
import Heading from '../../../components/Heading'
import { IconContext } from 'react-icons'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { getQuizScore, likeQuiz, getQuiz } from '../../../redux/quiz/quizActions'
import { setSuccess } from '../../../redux/success/successActions'

class QuizResults extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    props.clearSuccess('quiz')
    props.clearSuccess('score')
    props.clearSuccess('like')
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log(nextProps.quiz)
    if (!nextProps.quiz) {
      nextProps.getQuiz(nextProps.match.params.id)
    }

    if (!nextProps.score) {
      nextProps.getQuizScore(nextProps.match.params.id, nextProps.self.username)
    }

    return prevState
  }

  onToggleLiked = () => {
    this.props.likeQuiz(this.props.match.params.id, this.props.self._id)
  }

  render () {
    return (
      <>
        <Heading>Quiz Results</Heading>

        <div className={styles.main}>
          <Heading>Your Score:</Heading>

          <div className={styles.score}>
            {this.props.score?.totalCorrect}
            <div className={styles['score-total']}>/{this.props.score?.totalQuestions}</div>
          </div>

          <div className={styles['like-bar']}>
            Like this quiz?
            <IconContext.Provider value={{ color: 'inherit' }}>
                <div
                      className={styles['like-button']}
                      onClick={() => this.onToggleLiked()}>
                  {this.props.liked ? <HiHeart/> : <HiOutlineHeart/>}
                </div>
            </IconContext.Provider>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  self: state.user.self,
  quiz: state.success.quiz,
  score: state.success.score,
  liked: typeof (state.success.like) !== 'undefined'
    ? state.success.like
    : state.success.quiz?.likers?.indexOf(state.user.self._id) > -1
})

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (quizId) => dispatch(getQuiz(quizId)),
  likeQuiz: (quizId, userId) => dispatch(likeQuiz(quizId, userId)),
  getQuizScore: (quizId, username) => dispatch(getQuizScore(quizId, username)),
  clearSuccess: (pname) => dispatch(setSuccess(pname, undefined))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizResults)
