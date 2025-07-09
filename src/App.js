
import './App.css';
import LoadingBar from "react-top-loading-bar";
import React, { Component } from 'react'
import { Navbar } from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
pageSize=10;
state={
  progress:0,
}
setProgress=(progress)=>{
  this.setState({progress:progress})
}
  render() {
    return (
      <Router> 
        <Navbar />
        <div>
          <LoadingBar
        color="#f11946"
        height={3}
        progress={this.state.progress} />
          <Routes>
          <Route path="/" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} country="us" category="politics" />}></Route>
            <Route path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />}></Route>
            <Route path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={this.pageSize} country="us" category="business" />}></Route>
            <Route path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={this.pageSize} country="us" category="general" />}></Route>
            <Route path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={this.pageSize} country="us" category="health" />}></Route>
            <Route path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={this.pageSize} country="us" category="science" />}></Route>
            <Route path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={this.pageSize} country="us" category="sports" />}></Route>
            <Route path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={this.pageSize} country="us" category="technology" />}></Route>


          </Routes>

        </div>
      </Router>
    )
  }
}

