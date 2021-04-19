import React, { Component } from 'react'
import { connect } from 'react-redux'
import Heading from '../../../../components/Heading'

class FindQuizzes extends Component {
  render () {
    return (
            <>
                <Heading>Find Quizzes</Heading>
            </>
    )
  }
}

export default connect(null, null)(FindQuizzes)
