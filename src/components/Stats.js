import React from 'react'

export default function Stats(props) {
  return (
    <div className='container' style={{marginLeft: "5vw"}}>
      <div className='d-flex'>
        <div className='visit-label text-white fw-bold' style={{marginLeft: "1.5vw",marginTop: ".5vw",fontSize: "2vw"}}>Nodes Visited : </div>
        <div className='visitCount text-white fw-bold' style={{margin: ".6vw",fontSize: "2vw"}}>{props.visitedCount}</div>
        <div className='count-conatiner d-flex'style={{marginLeft: "4vw"}}>
            <div className='visit-label text-white fw-bold' style={{marginTop: ".5vw", fontSize: "2vw"}}>Path Nodes : </div>
            <div className='visitCount text-white fw-bold' style={{margin: ".6vw",fontSize: "2vw"}}>{props.pathCount}</div>
        </div>
      </div>
    </div>
  )
}
