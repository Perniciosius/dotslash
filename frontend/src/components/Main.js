import { Grid } from '@mui/material'
import Editor from './Editor'
import Console from './Console'
import RunStopButton from './RunStopButton'
// import SearchErrorButtons from './SearchErrorButtons'


export default function Main(props) {
  let { code, setCode, language, ws, connectWebsocket, setError } = props


  return (
    <>
      <Grid container padding={1} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={6}>
          <Editor language={language} code={code} setCode={setCode} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ backgroundColor: 'black' }}>
          <Console ws={ws} setError={setError} />
        </Grid>
      </Grid>
      {/* <Box position='fixed' right="20px" bottom="20px" display='flex' alignItems='center' flexDirection='column'> */}
      {/* <SearchErrorButtons error={error} /> */}
      <RunStopButton
        connectWebsocket={connectWebsocket}
        ws={ws}
        sx={{ position: 'fixed', right: '20px', bottom: '20px' }}
      />
      {/* </Box> */}
    </>
  )
}
