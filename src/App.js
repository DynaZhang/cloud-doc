import React, {useState, useEffect} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

function App() {
  const [defaultFiles, setDefaultFiles] = useState([
    {
      title: 'first post',
      body: '## first',
      id: 0
    },
    {
      title: 'second post',
      id: 1,
      body: '### second'
    }
  ])
  const [editorState, setEditorState] = useState(null)
  const [activeId, setActiveId] = useState(1)

  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
  }

  const submitContent = () => {
    defaultFiles[activeId].body = editorState.toHTML()
  }

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(defaultFiles[activeId].body))
  }, [activeId])

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch onFileSearch={(value) => { console.log(value) }}/>
          <FileList files={defaultFiles} onFileClick={(id) => {console.log(id)}} onFileDelete={(id) => {console.log(id)}} onSaveEdit={(id,value) => {console.log(id,value)}}/>
          <div className="row no-gutters">
            <div className={'col'}>
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} onBtnClick={() => {}} />
            </div>
            <div className={'col'}>
              <BottomBtn text="导入" colorClass="btn-success" icon={faFileImport} onBtnClick={() => {}} />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          <TabList files={defaultFiles} activeId={activeId} unSaveIds={[1]} onTabClick={(id) => {setActiveId(id)}} onCloseTab={(id) => {console.log(id)}}/>
          <BraftEditor value={editorState} onChange={handleEditorChange} onSave={submitContent}/>
        </div>
      </div>
    </div>
  );
}

export default App;
