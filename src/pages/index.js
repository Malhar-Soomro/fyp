import * as React from "react"

import Navbar from "../components/Navbar"
import "../styles/global.css"
import Footer from "../components/Footer"
import { AuthContext } from "../context/AuthContext"
import { TransactionContext } from "../context/TransactionContext"


const IndexPage = () => {

  const { connectWallet } = React.useContext(TransactionContext);

  // connectWallet()

  return (

    <>
      <Navbar />
      <div className="img-container">
        <div className="text">
          <h1 className="title">Want to get instant crypto loan?</h1>
          <p className="description">Unlock Financial Freedom with Blockchain Loans! Our platform ensures trust, security, and efficiency in every loan transaction. Say goodbye to lengthy approval processes and hello to lightning-fast, hassle-free borrowing.</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default IndexPage

