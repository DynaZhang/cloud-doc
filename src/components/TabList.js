import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './TabList.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const TabList = (props) => {
  const {files, activeId, unSaveIds, onTabClick, onCloseTab} = props

  return (
    <ul className="nav nav-pills tablist-component">
      {
        files.map(file => {
          const withUnsaveMark = unSaveIds.includes(file.id)
          const fileClassName = classnames({
            'nav-link': true,
            'active': file.id === activeId,
            'withUnsaved': withUnsaveMark
          })
          return (
            <li className="nav-item" key={file.id}>
              <a href="javascript:void(0)" className={fileClassName} onClick={(e) => {e.preventDefault(); onTabClick(file.id)}}>
                <span>{file.title}</span>
                <span className="ml-2 close-icon" onClick={(e) => {e.stopPropagation(); onCloseTab(file.id)}}>
                  <FontAwesomeIcon icon={faTimes} title="关闭"/>
                </span>
                {
                  withUnsaveMark && <span className="rounded-circle ml-2 unsaved-icon"/>
                }
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
}

TabList.defaultProps = {
  unsaveIds: []
}

export default TabList
