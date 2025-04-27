import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  timerId = null // Initialize timerId

  state = {
    isStarted: false,
    timeInSeconds: 1500,
  }

  componentWillUnmount() {
    clearInterval(this.timerId) // Clear interval on unmount
  }

  handleStartPause = () => {
    this.setState(prevState => {
      const {isStarted} = prevState
      if (isStarted) {
        // If pausing, clear the existing interval
        clearInterval(this.timerId)
        this.timerId = null // Reset timerId
      } else {
        // If starting, ensure no existing interval before setting a new one
        clearInterval(this.timerId) // Safety: clear any stale interval
        this.timerId = setInterval(this.tick, 1000)
      }
      return {isStarted: !isStarted}
    })
  }

  tick = () => {
    this.setState(prevState => {
      const {timeInSeconds} = prevState
      if (timeInSeconds <= 0) {
        // Stop timer when reaching 0
        clearInterval(this.timerId)
        this.timerId = null // Reset timerId
        return {timeInSeconds: 0, isStarted: false}
      }
      return {timeInSeconds: timeInSeconds - 1}
    })
  }

  formatTime = sec => {
    const timeInMinutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0')
    const timeInSec = (sec % 60).toString().padStart(2, '0')
    return `${timeInMinutes}:${timeInSec}`
  }

  resetTimer = () => {
    clearInterval(this.timerId) // Clear interval on reset
    this.timerId = null // Reset timerId
    this.setState({timeInSeconds: 1500, isStarted: false})
  }

  increaseTimer = () => {
    this.setState(prevState => {
      const {timeInSeconds, isStarted} = prevState
      if (!isStarted) {
        return {timeInSeconds: timeInSeconds + 60}
      }
      return null
    })
  }

  decreaseTimer = () => {
    this.setState(prevState => {
      const {timeInSeconds, isStarted} = prevState
      if (!isStarted && timeInSeconds > 60) {
        return {timeInSeconds: timeInSeconds - 60}
      }
      return null
    })
  }

  render() {
    const {isStarted, timeInSeconds} = this.state
    const res = this.formatTime(timeInSeconds)
    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="main-heading">Digital Timer</h1>
          <div className="clock">
            <div className="timer">
              <div className="time">
                <h1 className="time-value">{res}</h1>
                <p className="label">{isStarted ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="contents">
              <div className="buttons">
                <button
                  type="button"
                  onClick={this.handleStartPause}
                  aria-label={isStarted ? 'Pause timer' : 'Start timer'}
                >
                  <img
                    src={`https://assets.ccbp.in/frontend/react-js/${
                      isStarted ? 'pause' : 'play'
                    }-icon-img.png`}
                    className="btn-icon"
                    alt={isStarted ? 'pause icon' : 'play icon'}
                  />
                  {isStarted ? 'Pause' : 'Start'}
                </button>
                <button
                  type="button"
                  onClick={this.resetTimer}
                  aria-label="Reset timer"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="btn-icon"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
              <p className="timer-label">Set Timer limit</p>
              <div className="timer-controls">
                <button
                  type="button"
                  onClick={this.decreaseTimer}
                  data-testid="decrease-timer"
                >
                  -
                </button>
                <p>{`${Math.floor(timeInSeconds / 60)}:00`}</p>
                <button
                  type="button"
                  onClick={this.increaseTimer}
                  data-testid="increase-timer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
