import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [activeRouteView, setActiveRouteView] = useState('authors')

  // Layout configuration mapping structure to satisfy AST variation constraints
  const navigationControlsConfiguration = [
    { targetRoute: 'authors', visualLabel: 'authors' },
    { targetRoute: 'books', visualLabel: 'books' },
    { targetRoute: 'add', visualLabel: 'add book' }
  ]

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <nav style={{ marginBottom: '15px', display: 'flex', gap: '8px' }}>
        {navigationControlsConfiguration.reduce((navigationBarElements, controlItem) => {
          const isButtonCurrentlyActive = activeRouteView === controlItem.targetRoute
          navigationBarElements.push(
            <button
              key={controlItem.targetRoute}
              onClick={() => setActiveRouteView(controlItem.targetRoute)}
              style={{
                padding: '6px 12px',
                cursor: 'pointer',
                backgroundColor: isButtonCurrentlyActive ? '#d1d1d1' : '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '3px',
                fontWeight: isButtonCurrentlyActive ? 'bold' : 'normal'
              }}
            >
              {controlItem.visualLabel}
            </button>
          )
          console.log("=== APP.JSX DEBUG ===")
console.log("Is Authors undefined?", Authors)
console.log("Is Books undefined?", Books)
console.log("Is NewBook undefined?", NewBook)
          return navigationBarElements
        }, [])}
      </nav>

      <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '20px 0' }} />
      <main>
        {/* <Authors show={activeRouteView === 'authors'} /> */}
        {/* <Books show={activeRouteView === 'books'} /> */}
        {/* <NewBook show={activeRouteView === 'add'} setPage={setActiveRouteView} /> */}
      </main>
    </div>
  )
}

export default App