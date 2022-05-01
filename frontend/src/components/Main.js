import { Grid } from '@mui/material'
import Editor from './Editor'
import Console from './Console'
import RunStopButton from './RunStopButton'


export default function Main(props) {
  let { code, setCode, language, ws, connectWebsocket } = props
  let isWebsocketOpen = ws && ws.readyState === ws.OPEN

  const terminateWebsocket = () => {
    if (isWebsocketOpen) {
      ws.send(JSON.stringify({ interrupt: true }))
    }
  }

  return (
    <>
      <Grid container padding={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={6}>
          <Editor language={language} code={code} setCode={setCode} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Console ws={ws} />
        </Grid>
      </Grid>
      <RunStopButton
        connectWebsocket={connectWebsocket}
        isWebsocketOpen={isWebsocketOpen}
        terminateWebsocket={terminateWebsocket}
        sx={{ position: 'fixed', right: '20px', bottom: '20px' }}
      />
    </>
  )
}
