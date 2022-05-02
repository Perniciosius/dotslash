
import { FitAddon } from 'xterm-addon-fit'
import { useEffect, memo } from 'react'
import ResizeObserver from 'react-resize-observer'
import { Terminal } from 'xterm';
import "xterm/css/xterm.css"


let input = ''
let fitAddon = new FitAddon()
let xterm

export default memo(function Console(props) {
  let { ws, setError } = props

  useEffect(() => {
    xterm = new Terminal()
    xterm.open(document.getElementById("terminal"))
    xterm.loadAddon(fitAddon)
    fitAddon.fit()

    return () => {
      xterm.dispose()
    }
  }, [])

  useEffect(() => {
    if (xterm) {
      xterm.onKey(e => {
        if (ws && ws.readyState === ws.OPEN) {
          if (e.domEvent.keyCode === 13) {
            ws.send(JSON.stringify({ input: input }))
            xterm.write("\r\n")
            input = ""
          } else if (e.domEvent.keyCode === 8) {
            if (input.length > 0) {
              input = input.slice(0, -1)
            }
            xterm.write("\b \b")
          } else {
            input += e.key
            xterm.write(e.key)
          }
        }
      })


      if (ws) {
        ws.onmessage = (event) => {
          let data = JSON.parse(event.data)
          if (data.error !== "") {
            setError(data.error)
            xterm.write(`\u001b[31m${data.error.replaceAll(/\n/g, "\r\n")}`)
          }
          else if (data.server_error !== "")
            xterm.write(`\u001b[33m${data.server_error.replaceAll(/\n/g, "\r\n")}`)
          else
            xterm.write(data.output.replaceAll(/\n/g, "\r\n"))
        }
      }
    }
  }, [ws, setError])

  return (
    <>
      <div id='terminal' style={{ width: "100%", height: "100%" }} />
      <ResizeObserver onResize={() => fitAddon.fit()} />
    </>
  )
})
