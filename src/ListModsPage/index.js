

import './listmodspage.scss'
import Criteria from '../ModsPage/Criteria'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../UseContext/Context';
function ListModsPage({criteria, origin}) {
    const [handle, data] = useContext(Context)
    const [mods, setMods] = useState([])
    const location = useLocation();
    const currentUrl = location.pathname.split('/')[location.pathname.split('/').length -1];
    const shuffleArray = (array) => {
        const shuffledArray = [];
        array.forEach((game) => {
            shuffledArray.push(game)
        })
        let currentIndex = shuffledArray.length;
      
        while (currentIndex > 0) {
          const randomIndex = Math.floor(Math.random() * currentIndex);
      
          currentIndex--;
      
          const temporaryValue = shuffledArray[currentIndex];
          shuffledArray[currentIndex] = shuffledArray[randomIndex];
          shuffledArray[randomIndex] = temporaryValue;
        }
      
        return shuffledArray;
    }
    useEffect(() => {
        axios("https://ic-gaming-node-js.vercel.app/mods/get-by-criteria-origin?criteria="+criteria+"&origin="+origin) 
            .then (res => {
                setMods(shuffleArray(res.data))
            })
    },[criteria, origin])
    return (
        <div id='list-mods-page'>
            <Criteria origin={origin} isList={true} criteria={currentUrl}/>
            <div className='mods col-lg-11'>
                <div className='col-lg-10' style={{display:'flex', flexWrap : 'wrap'}}>
                    {mods.map((mod,index) => {
                        return <div key={index} className='item col-lg-4'>
                            <img className='col-lg-12' src={mod.images[0]} width='100%' />
                            <p className='title col-lg-12'>{mod.title}</p>
                            <Link onClick={() => handle.handleScrollUp()}  to={'/mods/'+mod.originGame.toLowerCase().split(' ').join('-')+'/'+mod.criteria.toLowerCase().split(' ').join('-')+'/'+ mod.title.toLowerCase().split(' ').join('-')} style={{textDecoration:'none', color : 'black'}}><button className='btn-mod'>Official Site</button></Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListModsPage;