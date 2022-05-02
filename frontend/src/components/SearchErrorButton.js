import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { GitHub } from '@mui/icons-material'

export default function SearchErrorButton(props) {
  let { error } = props
  let queryGithub = encodeURIComponent(error + " site:github.com")
  let queryStackOverflow = encodeURIComponent(error + " site:stackoverflow.com")
  return (
    <>
      <ListItemButton
        disabled
        onClick={() => window.open(`https://www.google.com/search?q=${queryGithub}`, "_blank")}
        target='_blank'
      >
        <ListItemIcon>
          <GitHub />
        </ListItemIcon>
        <ListItemText primary={"Search Error"} />
      </ListItemButton>
      <ListItemButton
        color="warning"
        onClick={() => window.open(`https://www.google.com/search?q=${queryStackOverflow}`, "_blank")}
        target='_blank'
      >
        <ListItemIcon>
          {/* <StackOverflow/> */}
        </ListItemIcon>
        <ListItemText primary={"Search Error"} />
      </ListItemButton>
    </>
  )
}
