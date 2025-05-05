import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
function TextEditor() {
  const [editorValue, setEditorValue] = useState('') // 編輯器內容狀態

  const handleEditorChange = (content) => {
    setEditorValue(content) // 更新編輯器內容
  }
  return (
    <div>
      <Editor
        apiKey="m5394exaazcrji55ae5ijsag4jghfp3n70gejps5jhi6o9hi"
        value={editorValue}
        onEditorChange={handleEditorChange}
        init={{
          height: 300, // 設定編輯器高度
          menubar: false, // 隱藏菜單欄
          plugins: '', // 不加載插件
          valid_elements: 'p', // 只允許使用 <p> 標籤
          forced_root_block: 'p', // 強制根元素使用 <p> 標籤
          content_style: 'p { margin: 0; }', // 自定義 <p> 標籤的樣式（如去除邊距）
        }}
      />
    </div>
  )
}

export default TextEditor
