import React, {useState} from 'react';
import './DocumentBtn.css'

const DocumentBtn = (props) =>  {


  return (
    <a className='documentBtn' id={props.id} href={props.document}>
      {props.document} <br/>
    </a>
  )

}

export default DocumentBtn;
