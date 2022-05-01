import AceEditor from 'react-ace'

import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-golang"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/theme-one_dark"

import "ace-builds/src-noconflict/ext-language_tools"
import beautify from "ace-builds/src-noconflict/ext-beautify"

import "ace-builds/src-noconflict/snippets/c_cpp"
import "ace-builds/src-noconflict/snippets/golang"
import "ace-builds/src-noconflict/snippets/java"
import "ace-builds/src-noconflict/snippets/javascript"
import "ace-builds/src-noconflict/snippets/python"
import "ace-builds/src-noconflict/snippets/typescript"

export default function Editor(props) {
  let { code, setCode, language } = props

  return (
    <AceEditor
      value={code}
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
      width="100%"
      height="100%"
      mode={getMode(language)}
      theme="one_dark"
      name="editor"
      editorProps={{ $blockScrolling: true }}
      onChange={(value) => {
        setCode(value)
      }}
      commands={beautify.commands}
    />
  )
}

const getMode = (language) => {
  switch (language) {
    case "c":
    case "cpp":
      return "c_cpp"
    case "golang":
      return "golang"
    case "java":
      return "java"
    case "javascript":
      return "javascript"
    case "python2":
    case "python3":
      return "python"
    case "typescript":
      return "typescript"
    default:
      return ""
  }
}
