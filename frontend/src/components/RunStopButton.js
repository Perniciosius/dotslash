import { Fab, Box } from '@mui/material'
import { PlayArrowRounded, StopRounded } from '@mui/icons-material'
import { useState } from 'react'

export default function RunStopButton(props) {
  let { connectWebsocket, isWebsocketOpen, terminateWebsocket, ...other } = props

  let [variant, setVariant] = useState('circular')
  let display = variant === 'circular' ? 'none' : 'block`'

  if (!isWebsocketOpen) {
    return (
      <Fab
        color='primary'
        variant={variant}
        onMouseOver={() => setVariant('extended')}
        onMouseOut={() => setVariant('circular')}
        onClick={connectWebsocket}
        {...other}
      >
        <PlayArrowRounded />
        <Box sx={{ display: display }}>Run</Box>
      </Fab>
    )
  } else {
    return (
      <Fab
        color='error'
        variant={variant}
        onMouseOver={() => setVariant('extended')}
        onMouseOut={() => setVariant('circular')}
        onClick={terminateWebsocket}
        {...other}
      >
        <StopRounded />
        <Box sx={{ display: display }}>Stop</Box>
      </Fab>
    )
  }
}
