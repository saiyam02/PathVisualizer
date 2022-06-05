import React from 'react'
import './legend.css'

export default function Legend() {
  return (
    <div className='d-flex justify-content-between' style={{alignItems: "center"}}>
        <div className='legend-container d-flex'>
            <div className="icon start fas fa-male me-2 "></div> 
            <div className='label'>Start Point</div>
        </div>
        <div className='legend-container d-flex' >
            <div className="icon end fas fa-map-marker-alt"></div> 
            <div className='label'>End Point</div>    
        </div>
        <div className='legend-container d-flex' >
            <div className="icon not-visited"></div> 
            <div className='label'>Not Visited</div>    
        </div>
        <div className='legend-container d-flex' >
            <div className="icon wall"></div> 
            <div className='label'>Wall</div>    
        </div>
        <div className='legend-container d-flex' >
            <div className="icon new-visit"></div> 
            <div className='label'>Recently Visited</div>    
        </div>
        <div className='legend-container d-flex' >
            <div className="icon visited"></div> 
            <div className='label'>Visited</div>    
        </div>
        <div className='legend-container d-flex' >
            <div className="icon path"></div> 
            <div className='label'>Shortest Path</div>    
        </div>
    </div>
  )
}
