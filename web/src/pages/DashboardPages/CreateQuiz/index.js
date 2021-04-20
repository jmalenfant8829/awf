import React, { Component } from 'react'
import { connect } from 'react-redux'
import Heading from '../../../components/Heading'

class CreateQuiz extends Component {
  render () {
    return (
            <>
                <Heading>Create Quit</Heading>
            </>
    )
  }
}

export default connect(null, null)(CreateQuiz)
