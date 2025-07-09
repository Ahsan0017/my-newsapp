
import './App.css';
import LoadingBar from "react-top-loading-bar";
import React, {useState } from 'react'
import Navbar2 from './Function Component/Navbar2';
import News2 from './Function Component/News2';
import {  BrowserRouter as Router,  Routes,  Route,} from "react-router-dom";


const AppFunctionBase = () => {
    const [progress, setProgress] = useState(0);
const pageSize=10;

    return (
      <Router> 
        <Navbar2 />
        <div>
          <LoadingBar
        color="#f11946"
        height={3}
        progress={progress}
       
      />
          <Routes>
          <Route path="/" element={<News2 setProgress={setProgress}  key="entertainment" pageSize={pageSize} country="us" category="politics" />}></Route>
            <Route path="/entertainment" element={<News2 setProgress={setProgress}  key="entertainment" pageSize={pageSize} country="us" category="entertainment" />}></Route>
            <Route path="/business" element={<News2 setProgress={setProgress}  key="business" pageSize={pageSize} country="us" category="business" />}></Route>
            <Route path="/general" element={<News2 setProgress={setProgress}  key="general" pageSize={pageSize} country="us" category="general" />}></Route>
            <Route path="/health" element={<News2 setProgress={setProgress}  key="health" pageSize={pageSize} country="us" category="health" />}></Route>
            <Route path="/science" element={<News2 setProgress={setProgress}  key="science" pageSize={pageSize} country="us" category="science" />}></Route>
            <Route path="/sports" element={<News2 setProgress={setProgress}  key="sports" pageSize={pageSize} country="us" category="sports" />}></Route>
            <Route path="/technology" element={<News2 setProgress={setProgress}  key="technology" pageSize={pageSize} country="us" category="technology" />}></Route>
        
          </Routes>

        </div>
      </Router>
    )
  }
    export default AppFunctionBase