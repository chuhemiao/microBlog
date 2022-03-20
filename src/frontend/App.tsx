import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { About } from "./About"
import { Intro } from "./Intro"

function App() {
  return (
    <Router>
      <div className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/posts">
            <About />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
