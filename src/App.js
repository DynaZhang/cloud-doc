import React, {Fragment, useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import defaultFiles from "./utils/defaultFiles"
import { flatternArr, objToArr} from './utils/helpers'

import {faFileImport, faPlus} from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from "./components/BottomBtn"
import TabList from "./components/TabList"
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {v4 as uuidv4} from 'uuid'

function App() {
  const [files, setFiles] = useState(flatternArr(defaultFiles))
  const [activeFileId, setActiveFileId] = useState('')
  const [openedFileIds, setOpenedFileIds] = useState([])
  const [unsavedFileIds, setUnsavedFileIds] = useState([])
  const [editorState, setEditorState] = useState(null)

  const filesArr = objToArr(files)

  const openedFiles = openedFileIds.map(openId => {
    return files[openId]
  })
  const activeFile = files[activeFileId]

  const handleFileClick = (fileId) => {
    if (!openedFileIds.includes(fileId)) {
      openedFileIds.push(fileId)
    }
    setActiveFileId(fileId)
  }

  const handleDeleteFiles = (fileId) => {
    // todo 删除前展示弹窗
    handleCloseTab(fileId)
    delete files[fileId]
  }

  const handleEditFileName = (fileId, title) => {
    files[fileId].title = title
  }

  const handleCloseTab = (fileId) => {
    // todo 如果关闭的文件是未保存的，则展示弹窗
    activeFile.body = editorState.toHTML()
    const newOpenedFileIds = openedFileIds.filter(id => id !== fileId)
    const openFilePosition = openedFileIds.indexOf(fileId)
    setOpenedFileIds(newOpenedFileIds)
    if (newOpenedFileIds.length === 0) {
      setActiveFileId('')
    } else if (openFilePosition === 0) {
      setActiveFileId(newOpenedFileIds[0])
    } else {
      setActiveFileId(newOpenedFileIds[openFilePosition - 1])
    }
  }

  const handleSearchFiles = (value) => {
    let newFiles = {}
    if (!value) {
      newFiles = flatternArr(filesArr)
    } else {
      newFiles = flatternArr(filesArr.filter(file => {
        if (filesArr.title.includes(value)) {
          return file
        }
      }))
    }
    setFiles(newFiles)
  }

  const handleEditorChange = (state) => {
    if (state.toHTML() !== activeFile.body && !unsavedFileIds.includes(activeFileId)) {
      unsavedFileIds.push(activeFileId)
    } else if (state.toHTML() === activeFile.body) {
      const newUnsavedFileIds = unsavedFileIds.filter(id => id !== activeFileId)
      setUnsavedFileIds(newUnsavedFileIds)
    }
    setEditorState(state)
  }

  const handleCreateFile = () => {
    const newId = uuidv4()
    const newFiles = [
      ...files,
      {
        id: newId,
        title: 'untitled',
        body: '',
        createdAt: new Date().getTime()
      }
    ]
    setFiles(newFiles)
    const newOpenedFileIds = [
      ...openedFileIds,
      newId
    ]
    setOpenedFileIds(newOpenedFileIds)
    setActiveFileId(newId)
  }

  const submitContent = () => {
    activeFile.body = editorState.toHTML()
  }

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(activeFile.body || ''))
  }, [activeFileId, files])

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch onFileSearch={(value) => { handleSearchFiles(value) }}/>
          <FileList files={filesArr} onFileClick={(id) => {handleFileClick(id)}} onFileDelete={(id) => {handleDeleteFiles(id)}} onSaveEdit={(id, title) => {handleEditFileName(id, title)}}/>
          <div className="row no-gutters">
            <div className={'col'}>
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} onBtnClick={handleCreateFile} />
            </div>
            <div className={'col'}>
              <BottomBtn text="导入" colorClass="btn-success" icon={faFileImport} onBtnClick={() => {}} />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {
            !activeFileId &&
              <div className={"start-page"}>
                选择或者创建新的 Markdown 文档
              </div>
          }
          {
            activeFileId &&
            <Fragment>
              <TabList files={openedFiles} activeId={activeFileId} unSaveIds={unsavedFileIds} onTabClick={(id) => {setActiveFileId(id)}} onCloseTab={(id) => {handleCloseTab(id)}}/>
              <BraftEditor value={editorState} onChange={handleEditorChange} onSave={submitContent}/>
            </Fragment>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
