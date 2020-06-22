import React, { Component } from 'react'
import './App.css'
import ThemedContent from './components/ThemedContent'
import ThemeProvider from './context/ThemeProvider'

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <ThemedContent />
      </ThemeProvider>
    )
  }
}

export default App
