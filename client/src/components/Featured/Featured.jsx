import React, { useState } from "react";
import "./Featured.scss";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom"
function Featured() {
  const[input,setInput]= useState("");
  const navigate = useNavigate()
  
  const handleSubmit = ()=>{
    navigate(`/categories?search=${input}`)
  }
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1 className="title">
            <span className="newFontStart">F</span>ind The Best{" "}
            <span className="newFont">Developer</span> and best
            <span className="newFont"> Freelancer</span> from ReSeller.{" "}
          </h1>
          <div className="search">
            <div className="searchInput">
              <SearchIcon className="SearchIcon" />
              <input type="text" placeholder="Find a Service" onChange={(e)=>setInput(e.target.value)}/>
            </div>
            <button onClick={handleSubmit}>Search..</button>
          </div>
          <div className="category">
            <span>People Likes: </span>
            <button>Web Design</button>
            <button>Software Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
            <button>Story Writer</button>
          </div>
        </div>
        <div className="right">
          <img src="../../../public/img/img2.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
