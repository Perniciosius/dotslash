import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { TextFields, TerminalRounded } from '@mui/icons-material'
import { useState } from 'react'
import Editor from './Editor'
import Console from './Console'
import RunStopButton from './RunStopButton'

export default function MobileMain(props) {
  let { code, setCode, language, ws, connectWebsocket, setError } = props
  let [value, setValue] = useState(0)
  return (
    <Box>

      <Box sx={{ flexGrow: 1 }} width='88vw' height='82vh'>
        {(value === 0) ?
          <Editor language={language} code={code} setCode={setCode} />
          :
          <Console ws={ws} setError={setError} />}
      </Box>
      <RunStopButton
        connectWebsocket={() => {
          setValue(1)
          connectWebsocket()
        }}
        ws={ws}
        sx={{ position: 'fixed', right: '20px', bottom: '66px' }}
      />


      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} width='100vw' elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Editor" icon={<TextFields />} />
          <BottomNavigationAction label="Console" icon={<TerminalRounded />} />
        </BottomNavigation>
      </Paper>
    </Box >
  )
}
