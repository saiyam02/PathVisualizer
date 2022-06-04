import React from 'react'

export default function Alert(props) {

 const alertBox = document.getElementById("alert");
 
  return (
    <div>
    <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
    <strong>{props.alertText}</strong>
    {!(props.alertText==="")?<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>:<></>}
    </div>
    </div>
  )
}

