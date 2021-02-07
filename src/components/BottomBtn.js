import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BottomBtn = (props) => {
  const {text, colorClass, icon, onBtnClick} = props
  return (
    <button type="button" className={`btn btn-block no-border ${colorClass}`} onClick={onBtnClick}>
      <span>{icon && (<FontAwesomeIcon className="mr-2" icon={icon} size="lg" />)}</span>
      <span>{text}</span>
    </button>
  )
}

BottomBtn.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string,
  icon: PropTypes.object,
  onBtnClick: PropTypes.func
}

export default BottomBtn
