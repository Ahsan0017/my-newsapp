import React, { Component } from 'react'
import loading from'../image/Rotating rings.gif'
export default class Spiner extends Component {
  render() {
    return (
  
    <div className="container d-flex  justify-content-center align-items-center" >
       <img src={loading} className="rounded my-3" alt="loading"></img>
    </div>
    )
  }
}
