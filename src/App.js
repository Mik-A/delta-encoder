import React, { useContext, useEffect, useState } from "react";
// import isColor from 'is-color'
import axios from "axios";
import "./App.css";

// Below is only for front end tests in case node env can't be fetched
const sheetId = process.env.REACT_APP_SHEET_ID
const sheetKey = process.env.REACT_APP_SHEET_API_KEY
const sheetApiGetRows =  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Styles&majorDimension=ROWS&key=${sheetKey}`

const App = () => {

  const defaultTheme = {
    "--color-solid": 'black',
    "--color-surface": "white",
    "--color-primary": "teal"
  };
  
  const darkTheme = {
    "--color-solid": "white",
    "--color-surface": "black",
    "--color-primary": "purple"
  };
  
  const [currentTheme, setTheme] = useState('default'); // initial
  const [currentDefault, setMainColors] = useState(defaultTheme)
  const [msg, setMsg] = useState({ loading: false, msg: 'Here comes the sun' })


  const applyTheme = (nextTheme, cb) => {
    const theme = nextTheme === 'default' ? currentDefault : darkTheme;
    Object.keys(theme).map(key => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
    cb();
  };

  const onToggleColors = () => {
    fetch(sheetApiGetRows)
    .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    const colorsFromSheet = Object.fromEntries(myJson.valueRanges[0].values);
    setMainColors(colorsFromSheet)
  });

  const nextTheme = currentTheme === 'default' ? "dark" : 'default';
    setTheme(nextTheme);
    applyTheme(nextTheme, () => setTheme(nextTheme));
  };

  const handleApiCall = api => e => {
    e.preventDefault()
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => setMsg({ loading: false, msg: json.msg }))
  }
  const handleApiCallStore = api => e => {
    e.preventDefault()
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => setMainColors(json.var))
  }
  useEffect(() => {
  })
  return (
    <div className="App">
      <h1>{currentTheme === 'default' ? "Light theme" : "Dark theme"}</h1>
      <button onClick={onToggleColors}>Toggle theme</button>
      <button onClick={handleApiCallStore("update-variable-store")}>{msg.loading ? "Loading..." : "Call me"}</button>      
      <button onClick={handleApiCall("modified-time")}>{msg.loading ? "Loading..." : "Call me"}</button>
        <p>{msg.msg}</p>
    </div>
  );
};

export default App;


// import React, { Component } from "react"
// import logo from "./logo.svg"
// import "./App.css"

// class LambdaDemo extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { loading: false, msg: null }
//   }

//   handleClick = api => e => {
//     e.preventDefault()

//     this.setState({ loading: true })
//     fetch("/.netlify/functions/" + api)
//       .then(response => response.json())
//       .then(json => this.setState({ loading: false, msg: json.msg }))
//   }

//   render() {
//     const { loading, msg } = this.state

//     return (
//       <p>
//         <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
//         <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
//         <button onClick={this.handleClick("modified-time")}>{loading ? "Loading..." : "show time"}</button>
//         <br />
//         <span>{msg}</span>
//       </p>
//     )
//   }
// }

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <LambdaDemo />
//         </header>
//       </div>
//     )
//   }
// }

// export default App
