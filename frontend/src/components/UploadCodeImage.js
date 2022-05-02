import { ListItemButton } from '@mui/material'
import Tesseract from 'tesseract.js'

export default function UploadCodeImage(props) {
  let { setCode } = props

  const onChangeHandler = (event) => {
    let file = event.target.files[0]
    Tesseract.recognize(file, 'eng').then(({ data }) => {
      setCode(data.text)
    })

  }

  return (
    <ListItemButton
      variant="text"
      component="label"
    >
      Upload Code Image
      <input
        accept='image/jpg, image/jpeg, image/png, image/bmp, image/pbm'
        onChange={onChangeHandler}
        type="file"
        hidden
      />
    </ListItemButton>
  )
}
