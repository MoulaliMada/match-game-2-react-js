import './index.css'

const ThumbNailItem = props => {
  const {eachImage, clickingThubNailImg} = props
  const {id, thumbnailUrl} = eachImage

  const clickthumbnail = () => {
    clickingThubNailImg(id)
  }

  return (
    <li className="thubnail-item">
      <button onClick={clickthumbnail} className="thumbnail-btn" type="button">
        <img src={thumbnailUrl} className="thumbnail-image" alt="thumbnail" />
      </button>
    </li>
  )
}
export default ThumbNailItem
