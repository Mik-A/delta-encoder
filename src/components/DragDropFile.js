import React, { useState } from 'react'
/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
const DragDropFile = (props) => {
  // const [file, getFile] = useState(null)
  const suppress = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
  }
  const onDrop = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    const files = evt.dataTransfer.files
    if (files && files[0]) props.handleFile(files[0])
  }
  const onChangeHandler = async (event) => {
    var file = event.target.files[0]
    console.log(file)
    let text = await file.text()
    // getFile(text) // not really needed to use state
    props.fileUploadHandler(text)
  }
  return (
    <div
      className='logic'
      onDrop={onDrop}
      onDragEnter={suppress}
      onDragOver={suppress}
    >
      <form method='post' action='#' id='#'>
        <div className=''>
          <label>Upload Your File </label>
          <input
            type='file'
            name='file'
            className='form-control'
            onChange={onChangeHandler}
          />
        </div>
      </form>
    </div>
  )
}

export default DragDropFile
