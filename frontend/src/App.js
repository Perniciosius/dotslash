import './App.css';
import React, { useState } from 'react';
import MainWithDrawer from './components/MainWithDrawer'
import { ThemeProvider, createTheme } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})


function App() {
  let [language, setLanguage] = useState("c")
  let [code, setCode] = useState("")
  let [error, setError] = useState("")
  let url = `ws://localhost:8080/ws/${language}`
  let [ws, setWs] = useState(null)

  const connectWebsocket = () => {
    let ws = new WebSocket(url)
    ws.onopen = () => {
      ws.send(JSON.stringify({ code: code }))
    }

    ws.onclose = () => {
      setWs(null)
    }

    setWs(ws)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App" style={{ height: "100vh" }}>
        <MainWithDrawer
          code={code}
          setCode={setCode}
          language={language}
          connectWebsocket={connectWebsocket}
          error={error}
          setError={setError}
          ws={ws}
          setLanguage={setLanguage}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
