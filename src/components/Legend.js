import React from 'react'
import './styles/legend.css'

export default function Legend() {
  return (
  <>
    <div className="container">
         <div className="row">
            <div className="col legend-container ">
            <div className="icon start fas fa-male me-2 "></div> 
            <div className='label col '>Start Node</div>
            </div>
            <div className="col legend-container ">
            <div className="icon  end fas fa-map-marker-alt"></div> 
            <div className='label col '>End Node</div>    
            </div>
            <div className="col legend-container ">
            <div className="icon not-visited"></div> 
             <div className='label col'> Unvisited</div>
            </div>
            <div className="col legend-container ">
            <div className="icon wall"></div> 
             <div className='label col '>Wall</div> 
            </div>
            <div className="col legend-container ">
            <div className="icon new-visit"></div> 
            <div className='label col '>Recently Visited</div>    
            </div>
            <div className="col legend-container ">
            <div className="icon visited"></div> 
            <div className='label col'>Visited</div>  
            </div>
            <div className="col legend-container ">
            <div className="icon path"></div> 
            <div className='label col '>Path</div> 
            </div>
        </div>
    </div>
    </>
  )
}
