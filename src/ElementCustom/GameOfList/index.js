
import { useContext } from 'react';
import './gameOfList.scss'
import { Link } from 'react-router-dom';
import { Context } from '../../UseContext/Context';

function GameOfList({game}) {
    
    const date = new Date(game.updateDate)
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateFormat = date.toLocaleDateString('en-US', options)
    const [handle] = useContext(Context)

    return ( 
        <div className= 'col-lg-5 gameOfList'>
            <div className='boxChildren'></div>
            <div className='col-lg-12 gameImage'>
                <img width= '100%' src = {game.images[0]}/>
            </div>
            <div className='col-lg-12 gameInfo'>
                <div className='title col-lg-12'>
                    {game.title}
                </div>
                <div className='col-lg-12 updateDate' style={{display:'flex'}}>
                    <p className='key'>Update Date </p>
                    <p className='value'>: {dateFormat}</p>
                </div>
                <div className='col-lg-12 gender' style={{display:'flex'}}>
                    <p className='key'>Gender </p>
                    <p className='value'>: {game.gender}</p>
                </div>
                <Link onClick={handle.handleScrollUp} to={`/games/${game.title.toLowerCase().split(' ').join('-')}`}><button>Official Site</button></Link>
            </div>
        </div>
     );
}

export default GameOfList;