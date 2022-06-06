import React from 'react'

export default function Alert(props) {
 
  return (
    <div>
    <div className={`alert alert-${props.type} text-center alert-dismissible fade show`} style={{height: "3vw",fontSize: "1vw"}} role="alert">
    <strong>{props.alertText}</strong>
    {!(props.alertText==="")?<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>:<></>}
    </div>
    </div>
  )
}

