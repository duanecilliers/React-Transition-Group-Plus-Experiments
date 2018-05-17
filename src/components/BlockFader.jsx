import React, { Component, Fragment } from 'react'
import TranstitionGroup from 'react-transition-group-plus'
import Fade from './Fade'

const Block = ({ text, onClick, color }) => (
    <div onClick={onClick} style={{
        display: 'block',
        width: '200px',
        height: '200px',
        lineHeight: '200px',
        fontSize: '3rem',
        color: 'white',
        background: color,
        textAlign: 'center',
        margin: '5px'
    }}>
        {text}
    </div>

)

class BlockFader extends Component {
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
            blocks: [this.createNewBlock()]
        }

        this.createNewBlock = this.createNewBlock.bind(this)
        this.getRandomNumber = this.getRandomNumber.bind(this)
        this.getRandomColor = this.getRandomColor.bind(this)
        this.addBlock = this.addBlock.bind(this)
        this.removeBlock = this.removeBlock.bind(this)
    }

    createNewBlock() {
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

    addBlock() {
        const { blocks } = this.state
        this.setState({ blocks: [...blocks, this.createNewBlock()]})
    }

    removeBlock(el) {
        this.setState({ blocks: this.state.blocks.filter(b => b !== el) })
    }

    render() {
        const { blocks } = this.state

        return (
            <Fragment>
                <button onClick={this.addBlock}>Add Block</button>
                <button onClick={this.removeBlock.bind(null, blocks[blocks.length - 1])}>Remove Block</button>
                <TranstitionGroup transitionMode='in-out' component='div' style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {
                        blocks.map((b, i) => (
                            <Fade key={i} enterDuration={0.8} leaveDuration={0.4}>
                                <Block text={b.text} color={this.colors[b.color]} />
                            </Fade>
                        ))
                    }
                </TranstitionGroup>
            </Fragment>
        )
    }
}

export default BlockFader
