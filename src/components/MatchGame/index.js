import {Component} from 'react'
import './index.css'
import Tabs from '../Tabs'
import ThumbNailItem from '../ThumbNailtem'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesLists: props.imgList,
      tabsLists: props.tabs,
      topImage: props.img,
      scoreCount: 0,
      seconds: 60,
      tabActive: 'FRUIT',
      isGameFinished: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  onClickPlayAgain = () => {
    const {imagesLists} = this.state
    this.setState({
      scoreCount: 0,
      seconds: 60,
      tabActive: 'FRUIT',
      isGameFinished: false,
      topImage: imagesLists[0],
    })
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {seconds} = this.state
    if (seconds === 0) {
      clearInterval(this.timerId)
      this.setState({isGameFinished: true})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  onClickingTabBtn = tabId => {
    this.setState({tabActive: tabId})
  }

  clickingThubNailImg = thisid => {
    const {topImage, imagesLists} = this.state
    const {id} = topImage
    if (thisid === id) {
      const index = Math.ceil(Math.random() * imagesLists.length - 1)
      const randomImage = imagesLists[index]
      this.setState(prevState => ({
        scoreCount: prevState.scoreCount + 1,
        topImage: randomImage,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({
        isGameFinished: true,
      })
    }
  }

  render() {
    const {
      topImage,
      scoreCount,
      seconds,
      tabActive,
      tabsLists,
      imagesLists,
      isGameFinished,
    } = this.state
    const {imageUrl} = topImage
    const filterdList = imagesLists.filter(each => each.category === tabActive)
    return (
      <div className="bg-container">
        <div className="nav-Bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="web-logo"
          />
          <div className="timer-score-container">
            <ul className="ul-score">
              <li className="score">
                <p>Score:</p>
              </li>
              <li className="count">
                <p>{scoreCount}</p>
              </li>
            </ul>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer-image"
            />
            <p className="seconds">{seconds} sec</p>
          </div>
        </div>
        {isGameFinished ? (
          <div className="bg-result-container">
            <div className="result-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
                className="trophy"
              />
              <p className="Your-Score">YOUR SCORE</p>
              <p className="scoreCount">{scoreCount}</p>
              <button
                className="play-again-btn"
                onClick={this.onClickPlayAgain}
                type="button"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset"
                />
                <p className="paragraph-btn">PLAY AGAIN</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="bottom-container">
            <img src={imageUrl} className="top-image" alt="match" />
            <ul className="tab-ul-container">
              {tabsLists.map(eachTab => (
                <Tabs
                  eachTab={eachTab}
                  tabActive={tabActive}
                  key={eachTab.tabId}
                  onClickingTabBtn={this.onClickingTabBtn}
                />
              ))}
            </ul>
            <ul className="ul-thumbnails">
              {filterdList.map(eachImage => (
                <ThumbNailItem
                  eachImage={eachImage}
                  key={eachImage.id}
                  clickingThubNailImg={this.clickingThubNailImg}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default MatchGame
