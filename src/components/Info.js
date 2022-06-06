import React from 'react'
import "./styles/info.css"
import StartEndWall from './styles/Images/StartEndWall.gif'
import mazeAdd from './styles/Images/mazeAdd.gif'
import visualizeGif from './styles/Images/visualize.gif'

export default function Info() {
  return (
  <>
    <div className='info-container'>
        <a href="/" role="button" data-bs-toggle="modal" data-bs-target="#firstModal">
          <div style={{marginRight: "2%", position: "absolute",right: "0"}}>
            <div className='fas fa-info-circle animate-info' style={{fontSize: "34px", color: "black"}}></div>
          </div>
        </a>
    </div>
    <div className="modal fade "  id="firstModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content" id="modalContent">
          <div className="modal-header">
            <h5 className="modal-title text-white fw-bold" id="exampleModalLabel">Getting started with the Path Visualizer</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{fontSize: "1.1vw"}} >
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Click and drag <i style={{fontSize: "24px"}} className='fas'>&#xf183;</i> to move start point. <br/><br/>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Click and drag <i style={{fontSize: "24px",color: "red"}} className='fas'>&#xf3c5;</i> to move end point.<br/><br/>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Click and drag empty cells to add Walls.<br/>
          <div className='wallGif'>
            <img src={StartEndWall} alt ="Wall addition demo"></img>
          </div>
          </div>
          <div className="modal-footer">
          <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#secondModal" data-bs-dismiss="modal">Next</button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade "  id="secondModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content" id="modalContent">
          <div className="modal-header">
            <h5 className="modal-title text-white fw-bold" id="exampleModalLabel">Creating mazes and Speed control</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{fontSize: "1.1vw"}} >
          <p style={{textAlign: "left",color: "white",fontSize: "1.3vw" }} >To create maze</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Select the maze algorithm you want to use and click the "add maze" button.
          <p style={{textAlign: "left",color: "white",fontSize: "1.3vw" }} >Speed Control</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i>Visualize Algorithm at your desired speed by adjusting the speed control slider.
          <div className='mazeAddGif'>
          <img src={mazeAdd} alt ="Maze addition demo"></img>
          </div>
          </div>
          <div className="modal-footer">
          <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#firstModal" data-bs-dismiss="modal">Previous</button>
          <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#thirdModal" data-bs-dismiss="modal">Next</button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade "  id="thirdModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content" id="modalContent">
          <div className="modal-header">
            <h5 className="modal-title text-white fw-bold" id="exampleModalLabel">Creating mazes and Speed control</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{fontSize: "1.1vw"}} >
          <p style={{textAlign: "left",color: "white",fontSize: "1.3vw" }} >To visualize shortest path</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Select the desired path finding algorithm and click the "Visualize Algorithm" button.<p></p>
          <p style={{textAlign: "left",color: "white",fontSize: "1.3vw" }} >To Remove walls or Clear grid</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Click remove walls or clear grid button .
          <div className='visualizeGif'>
          <img src={visualizeGif} alt ="Maze addition demo"></img>
          </div>
          </div>
          <div className="modal-footer">
          <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#secondModal" data-bs-dismiss="modal">Previous</button>
          <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#fourthModal" data-bs-dismiss="modal">Next</button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade "  id="fourthModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content" id="modalContent">
          <div className="modal-header">
            <h5 className="modal-title text-white fw-bold" id="exampleModalLabel">Creating mazes and Speed control</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{fontSize: "1.1vw"}} >
          <p style={{textAlign: "left",color: "white",fontSize: "1.3vw" }} >To visualize shortest path</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Select the desired path finding algorithm and click the "Visualize Algorithm" button.
          <div className='visualizeGif'>
          <img src={visualizeGif} alt ="Maze addition demo"></img>
          </div>
          </div>
          <div className="modal-footer">
          <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#thirdModal" data-bs-dismiss="modal">Previous</button>
          <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}