import  { useEffect, useRef,useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Scrollbars } from "react-custom-scrollbars-2";
const Home=()=>
{
    const navigate=useNavigate();
    useEffect(()=>
    {
      if(!localStorage.getItem('admintoken'))
      {
        navigate('/')
      }
     
    },[]);
   
    return(
        <Scrollbars style={{  height: 512 }}>
        <div className="addup">
          

        </div>
        </Scrollbars>
    )

}
export default Home;