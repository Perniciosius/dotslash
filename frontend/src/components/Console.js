
import { FitAddon } from 'xterm-addon-fit'
import { useEffect } from 'react'
import ResizeObserver from 'react-resize-observer'
import { Terminal } from 'xterm';
import "xterm/css/xterm.css"


let input = ''
let fitAddon = new FitAddon()

export default function Console(props) {
  let { ws } = props

  useEffect(() => {
    const xterm = new Terminal()
    xterm.open(document.getElementById("terminal"))
    xterm.loadAddon(fitAddon)
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
        console.log(data)
        if (data.error !== "")
          xterm.write(`\u001b[31m${data.error.replaceAll(/\n/g, "\r\n")}`)
        else if (data.server_error !== "")
          xterm.write(`\u001b[33m${data.server_error.replaceAll(/\n/g, "\r\n")}`)
        else
          xterm.write(data.output.replaceAll(/\n/g, "\r\n"))
      }
    }
    fitAddon.fit()
    return () => {
      xterm.dispose()
    }
  })

  return (
    <>
      <div id='terminal' style={{ width: "100%", height: "100%" }} />
      <ResizeObserver onResize={() => fitAddon.fit()} />
    </>
  )
}
