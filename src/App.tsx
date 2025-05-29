import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <KanbanBoard />
        </main>
      </div>
    </div>
  )
}

export default App
