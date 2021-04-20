import React from 'react'
import styled from './BackgroundGradient.module.scss'

const BackgroundGradient = (props) => (
    <div className={styled['bg-gradient']}>
        {props.children}
    </div>
)

export default BackgroundGradient
