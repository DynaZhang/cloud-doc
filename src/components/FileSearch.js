import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from "../hooks/useKeyPress";

const FileSearch = (props) => {
  const {title, onFileSearch} = props
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  let node = useRef(null)

  const closeSearch = (e) => {
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    if (enterPressed && inputActive) {
      onFileSearch(value)
    }
    if (escPressed && inputActive) {
      closeSearch()
    }
  })

  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive])

  return (
    <div className="alert alert-primary mb-0">
      { !inputActive &&
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => {setInputActive(true)}}>
            <FontAwesomeIcon title="搜索" icon={faSearch} />
          </button>
        </div>
      }
      {
        inputActive &&
        <div className="d-flex justify-content-between align-items-center">
          <input ref={node} type="text" className="form-control col-10" value={value} onChange={(e) => {setValue(e.target.value)}}/>
          <button type="button" className="icon-button col-2" onClick={closeSearch}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      }
    </div>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string.isRequired,
  onFileSearch: PropTypes.func.isRequired
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch
