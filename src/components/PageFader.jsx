import React, { Component } from 'react'
import TranstitionGroup from 'react-transition-group-plus'
import Fade from './Fade'
import './PageFader.css'

const Page = ({ text, onClick, color }) => (
    <div onClick={onClick} className='PageFader-Page' style={{ background: color }}>
        {text}
    </div>
)

class PageFader extends Component {
    constructor(props) {
        super(props)
        this.colors = [
            'plum',
            'lightsalmon',
            'mediumpurple',
            'lightseagreen',
            'khaki'
        ]

        this.state = {
            pages: [this.createNewPage(), this.createNewPage(), this.createNewPage()],
            currentPage: 0
        }

        this.createNewPage = this.createNewPage.bind(this)
        this.getRandomNumber = this.getRandomNumber.bind(this)
        this.getRandomColor = this.getRandomColor.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
    }

    createNewPage() {
        return {
            text: this.getRandomNumber(),
            color: this.getRandomColor()
        }
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 100)
    }

    getRandomColor() {
        return Math.floor(Math.random() * Math.floor(this.colors.length))
    }

    nextPage() {
        const { pages } = this.state
        const nextPage = pages[this.state.currentPage + 1] !== undefined
            ? this.state.currentPage + 1 : 0
        this.setState({ currentPage: nextPage })
    }

    previousPage() {
        const { pages } = this.state
        const previousPage = pages[this.state.currentPage - 1] !== undefined
            ? this.state.currentPage - 1 : pages.length - 1
        this.setState({ currentPage: previousPage })
    }

    render() {
        const { pages, currentPage } = this.state

        return (
            <div className='PageFader'>
                <button onClick={this.previousPage}>Previous Page</button>
                <TranstitionGroup transitionMode='simultaneous' component='div'>
                    {
                        pages.map((b, i) => currentPage === i && (
                            <Fade key={i} enterDuration={0.8} leaveDuration={0.4}>
                                <Page text={b.text} color={this.colors[b.color]} />
                            </Fade>
                        ))
                    }
                </TranstitionGroup>
                <button onClick={this.nextPage}>Next Page</button>
            </div>
        )
    }
}

export default PageFader
