import { ListItemButton, ListItemText } from '@mui/material'
import Tesseract from 'tesseract.js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function UploadCodeImage(props) {
  let { setCode } = props

  let Alert = withReactContent(Swal)

  const onChangeHandler = (event) => {
    let file = event.target.files[0]
    Alert.fire({
      title: "Processing File",
      html: '<div style="width: 200px; height: 200px; margin: auto"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
        ' style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n' +
        '<circle cx="50" cy="50" r="32" stroke-width="8" stroke="#fe718d" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">\n' +
        '  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>\n' +
        '</circle>\n' +
        '</svg></div>',
      showConfirmButton: false
    })
    Tesseract.recognize(file, 'eng').then(({ data }) => {
      setCode(data.text)
      Alert.fire({
        title: "Processing Completed",
        icon: 'success',
      })
    }).catch(() => {
      Alert.fire({
        title: "Error",
        icon: 'error'
      })
    })
  }

  return (
    <ListItemButton
      variant="text"
      component="label"
    >
      <ListItemText primary="Upload Code Image" secondary="(Not 100% accurate)" />

      <input
        accept='image/jpg, image/jpeg, image/png, image/bmp, image/pbm'
        onChange={onChangeHandler}
        onClick={(event) => event.target.value = null}
        type="file"
        hidden
      />
    </ListItemButton>
  )
}
