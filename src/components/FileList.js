import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from "../hooks/useKeyPress";

const FileList = (props) => {
  const {files, onFileClick, onSaveEdit, onFileDelete} = props

  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')
  const node = useRef(null)

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  useEffect(() => {
    if (enterPressed && editStatus) {
      const editItem = files.find(file => file.id === editStatus)
      onSaveEdit(editItem.id, value)
      closeEdit()
    }
    if (escPressed && editStatus) {
      closeEdit()
    }
  })

  useEffect(() => {
    if (editStatus) {
      node.current.focus()
    }
  }, [editStatus])

  const closeEdit = () => {
    setEditStatus(false)
    setValue('')
  }


  const showItem = (file) => {
    if (file.id !== editStatus) {
      return (
        <div className="row d-flex align-items-center">
          <span className="col-2">
              <FontAwesomeIcon icon={faMarkdown} size="lg" />
            </span>
          <span className="col-6 c-link" onClick={() => {onFileClick(file.id)}}>{file.title}</span>
          <button type="button" className="icon-button col-2" onClick={() => {setEditStatus(file.id); setValue(file.title)}}>
            <FontAwesomeIcon icon={faEdit} size="lg" title="编辑"/>
          </button>
          <button type="button" className="icon-button col-2" onClick={() => {onFileDelete(file.id)}}>
            <FontAwesomeIcon icon={faTrash} size="lg" title="删除"/>
          </button>
        </div>
      )
    } else {
      return (
        <div className="row d-flex align-items-center">
          <input ref={node} type="text" className="form-control col-10" value={value} onChange={(e) => {setValue(e.target.value)}}/>
          <button type="button" className="icon-button col-2" onClick={closeEdit}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )
    }
  }

  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file => (
          <li className="list-group-item bg-light file-item" key={file.id}>{showItem(file)}</li>
        ))
      }
    </ul>
  )
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onFileClick: PropTypes.func,
  onSaveEdit: PropTypes.func.isRequired,
  onFileDelete: PropTypes.func
}

FileList.defaultProps = {
  files: []
}

export default FileList
