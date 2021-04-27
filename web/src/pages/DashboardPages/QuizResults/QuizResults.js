import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './QuizResults.module.scss'
import Heading from '../../../components/Heading'
import { IconContext } from 'react-icons'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { likeQuiz } from '../../../redux/quiz/quizActions'

class QuizResults extends Component {
  constructor (props) {
    super(props)

    this.state = {
      liked: false
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return prevState
  }

  onToggleLiked = () => {
    this.setState(state => ({
      liked: !state.liked
    }))
  }

  render () {
    return (
      <>
        <Heading>Quiz Results</Heading>

        <div className={styles.main}>
          <Heading>Your Score:</Heading>

          <div className={styles.score}>
            {this.props.match.params.score}
            <div className={styles['score-total']}>/5</div>
          </div>

          <div className={styles['like-bar']}>
            Like this quiz?
            <IconContext.Provider value={{ color: 'inherit' }}>
                <div
                      className={styles['like-button']}
                      onClick={() => this.onToggleLiked()}>
                  {this.state.liked ? <HiOutlineHeart/> : <HiHeart/>}
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
  quizzes: state.quiz.quizzes
})

const mapDispatchToProps = (dispatch) => ({
  likeQuiz: (quizId) => dispatch(likeQuiz(quizId))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizResults)
