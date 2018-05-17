import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { TimelineMax, TweenMax, Linear, Sine } from 'gsap'

const animationStates = {
    beforeEnter: { y: 100, scale: 1.6, opacity: 0 },
    idle: { y: 0, scale: 1, opacity: 1 },
    afterLeave: { y: -100, scale: 0.7, opacity: 0 },
}

class Fade extends Component {
    componentDidMount() {
        this.el = findDOMNode(this)
        this.timeline = new TimelineMax()
            .pause()
            .add(TweenMax.to(this.el, 1, Object.assign({}, animationStates.beforeEnter, { ease: Linear.easeNone })))
            .add('beforeEnter')
            .add(TweenMax.to(this.el, 1, Object.assign({}, animationStates.idle, { ease: Linear.easeNone })))
            .add('idle')
            .add(TweenMax.to(this.el, 1, Object.assign({}, animationStates.afterLeave, { ease: Linear.easeNone })))
            .add('afterLeave')

        this.timeline.seek('beforeEnter');
    }

    componentWillAppear(callback) {
        this.timeline.seek('idle');
        callback();
    }

    componentWillEnter(callback) {
        this.timeline.seek('beforeEnter');
        TweenMax.killTweensOf(this.timeline);
        TweenMax.to(this.timeline, this.props.enterDuration, { time: this.timeline.getLabelTime('idle'), onComplete: callback, ease: Sine.easeOut });
    }

    componentWillLeave(callback) {
        this.timeline.pause();
        TweenMax.killTweensOf(this.timeline);
        TweenMax.to(this.timeline, this.props.leaveDuration, { time: this.timeline.getLabelTime('afterLeave'), onComplete: callback, ease: Sine.easeIn });
    }

    render() {
        return <div className='animates'>
            {this.props.children}
        </div>
    }
}

export default Fade
