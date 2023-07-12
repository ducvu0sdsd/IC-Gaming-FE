

import { useEffect } from 'react';
import './loading.scss'
import logo from './icgaming.png'

function Loading() {

    useEffect(() => {
        document.querySelector('#loading').style.height = window.innerHeight + "px"
    },[])

    return ( 
        <div id='loading' className='col-12'>
            <div className='formLoading col-md-6 col-11'>
                <img src={logo} width='90px' className="rotate-img" alt="Rotating Image"></img>
                <p>LOADING . . .</p>
            </div>
        </div>
    );
}

export default Loading;