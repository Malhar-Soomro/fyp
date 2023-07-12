import * as React from "react"
import Navbar from "../components/Navbar"
import "../styles/global.css"
import Footer from "../components/Footer"



const IndexPage = () => {
  return (
    <>
      <Navbar />
      <div className="img-container">
        <div className="text">
          <h1 className="title">Want to get instant crypto loan?</h1>
          <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id molestiae dolorem libero natus assumenda laudantium cumque sed delectus tempore ullam, provident laborum accusantium nisi aliquid dolore a pariatur.</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default IndexPage

