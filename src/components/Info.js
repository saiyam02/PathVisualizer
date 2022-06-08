import React, { useEffect } from 'react'
import "./styles/info.css"
import StartEndWall from './styles/Images/StartEndWall.gif'
import mazeAdd from './styles/Images/mazeAdd.gif'
import visualizeGif from './styles/Images/visualize.gif'

export default function Info() {
useEffect (()=>{
  document.getElementById('info-btn').click();
},[])

  return (
  <>
    <div className='info-container'>
        <a href="/" role="button" id="info-btn" data-bs-toggle="modal" data-bs-target="#firstModal">
          <div style={{marginRight: "5vw",marginTop:"3vh", position: "absolute",right: "0"}}>
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
          <div className="modal-body">
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Click and drag <i style={{fontSize: "24px"}} className='fas'>&#xf183;</i> to move start point. <br/><br/>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Click and drag <i style={{fontSize: "24px",color: "red"}} className='fas'>&#xf3c5;</i> to move end point.<br/><br/>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Click and drag empty cells to add Walls.<br/><br/><br/>
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
          <div className="modal-body" >
          <p class="info-subhead" >To create maze</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Select the maze algorithm you want to use and click the "add maze" button.
          <p class="info-subhead">Speed Control</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i>Visualize Algorithm at your desired speed by adjusting the speed control slider.<br/><br/><br/>
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
          <div className="modal-body" >
          <p class="info-subhead">To visualize shortest path</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Select the desired path finding algorithm and click the "Visualize Algorithm" button.<p></p>
          <p className='info-subhead' >To Remove walls or Clear grid</p>
          <i style={{fontSize: "20px", color:"white"}} className='fas'>&#xf0a4;</i> Click remove walls or clear grid button.<br/><br/><br/>
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
      <div className="modal-dialog ">
        <div className="modal-content" id="modalContent">
          <div className="modal-header">
            <h5 className="modal-title text-white fw-bold" id="exampleModalLabel">Overview of algorithms used</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" >
          <p className='info-subhead' >Dijkstra</p>
          Uses a formal approach (without heuristic). 
          It gaurantees the shortest path, but is slower than Greedy BFS.
          <p className='info-subhead'>Greedy BFS (Best First Search)</p>
          Always selects the path that appears best at that moment.
          It combines the power of BFS and DFS along with a heuristic approach.
          Much faster than Dijkstra but does not always gaurantee shortest path.
          <p className='info-subhead' >A* (A-Star)</p>
          One of the most successful path finding algorithm.As fast as Greedy BFS and as good as Dijkstra.
          It combines the heuristic approach of greedy BFS and formal approach of Dijkstra. 
          It gaurantees the shortest path.
          <p className='info-subhead'>DFS (Depth First Search)</p>
          An Unweighted algorithm.Perhaps the simplest algorithm, but certainly not a good choice for Path finding.
          It does not always gaurentee shoetest path.
          <p className='info-subhead' > BFS (Breadth First Search)</p>
          An Unweighted algorithm. In conrast to Dijkstra, which uses a priority queue, it uses a simple queue.
          It gaurantees shoetest path.
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
