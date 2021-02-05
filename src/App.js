import React, {useState, useEffect} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from "./components/BottomBtn";

function App() {
  const [files, setFiles] = useState([])

  useEffect(() => {
    setFiles([
      {
        title: 'first post',
        id: 1
      },
      {
        title: 'second post',
        id: 2
      }
    ])
  }, [])

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-6 bg-light left-panel">
          <FileSearch onFileSearch={(value) => { console.log(value) }}/>
          <FileList files={files} onFileClick={(id) => {console.log(id)}} onFileDelete={(id) => {console.log(id)}} onSaveEdit={(id,value) => {console.log(id,value)}}/>
          <div className="row no-gutters">
            <div className={'col'}>
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} onBtnClick={() => {}} />
            </div>
            <div className={'col'}>
              <BottomBtn text="导入" colorClass="btn-success" icon={faFileImport} onBtnClick={() => {}} />
            </div>
          </div>
        </div>
        <div className="col-6 bg-primary right-panel">
          this is the right
        </div>
      </div>
    </div>
  );
}

export default App;
