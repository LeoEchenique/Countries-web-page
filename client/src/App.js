import React from "react";
import './App.css';
import { Routes, Route, } from 'react-router-dom';
import Home from "./components/_home/Home";
import Nav from "./components/Nav/Nav";
import Landing from "./components/Landing/Landing";
import Detail from "./components/CountryDetail/Detail";
import CreateAct from "./components/Create_Activity/CreateAct"


function App() {
  return (

    <div className="App">


      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home/" element={[<Nav />, <Home />]} />  {/* renderizas más de un componente en una misma ruta, con arr */}
        <Route exact path="/home/detail/:id" element={<Detail />} />
        <Route exact path="/home/CreateYourOwn" element={[<Nav onForm={true} />, <CreateAct />]} />
      </Routes>


    </div>


  );
}

export default App;

