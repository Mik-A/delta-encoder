import React, { Fragment } from 'react'
// import Header from './components/Header'
// import Footer from './components/Footer'
import FrontPage from './pages/FrontPage'

const Header = () => <div>Header</div>

const Footer = () => <div>Footer</div>

const App = () => (
  <Fragment>
    <Header />
    <FrontPage />
    <Footer />
  </Fragment>
)

export default App
