import './index.css'

const Tabs = props => {
  const {eachTab, tabActive, onClickingTabBtn} = props
  const {tabId, displayText} = eachTab
  const onClickTab = () => {
    onClickingTabBtn(tabId)
  }
  return (
    <li>
      <button
        className={tabActive === tabId ? 'active-Tab' : 'in-active-Tab'}
        onClick={onClickTab}
        type="button"
      >
        {displayText}
      </button>
    </li>
  )
}
export default Tabs
