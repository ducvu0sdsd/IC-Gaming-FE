
import { useContext, useState, useEffect } from 'react'
import './videosreview.scss'
import { Context } from '../../UseContext/Context'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube';


function VideosReview() {

    const [handle, data] = useContext(Context)
    const menuItems = [...data.listGames, 'All Games']
    const [typeVideo, setTypeVideo] = useState(menuItems[0])

    const handleClickMenu = (num, m) => {
        const active = document.querySelector(".active")
        const currentMenuItem = document.querySelector('.menuItem' + num)
        active.classList.remove('active')
        currentMenuItem.classList.add('active')
        setTypeVideo(m)
    }

    const handleHoverVideo = (index) => {
        const video = document.querySelector('.videoItem' + index)
        video.style.boxShadow = '15px 15px 6px rgba(106, 105, 105, 0.2)'
        video.style.transform = 'translateY(-5px)'
    }

    const handleOutVideo = (index) => {
        const video = document.querySelector('.videoItem' + index)
        video.style.boxShadow = '3px 3px 2px rgba(106, 105, 105, 0.2)'
        video.style.transform = 'translateY(0px)'
    }

    const opts = {
        width: '100%',
        height : '200px'
    };

    let iVideo = 0

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return ( 
        <div id="videosReview" className="col-lg-12">
            <h1 className="titleVideosReview col-lg-12">Videos Review</h1>
            <div className="menuVideosReview col-lg-12">
                <div className="menu col-lg-8">
                    {menuItems.map((m,index) => (
                        <div onClick={() => handleClickMenu(index, m)} key={index} className={index != 0 ? 'menuItem menuItem'+index : 'menuItem active menuItem'+index}>
                            {m}
                        </div>
                    ))}
                </div>
            </div>
            <div className='menuVideosMobile' style={{zIndex : 12}}>
                <div className="dropdown" >
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Video Games
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        {menuItems.map((m,index) => (
                            <li className="dropdown-item" key={index} onClick={() => handleClickMenu(index, m)} >{m}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="boxChildren"></div>
            <div className="boxChildren"></div>
            <div className="col-lg-12" style={{display:'flex', justifyContent : 'center', zIndex:4}}>
                <div className="col-lg-11 listVideoItem">
                    {data.games.map((game, index) => {
                        if (iVideo < 6 ){
                            if (typeVideo == 'All Games') {
                                iVideo ++
                                return <div key={index} onMouseOut={() => handleOutVideo(index)} onMouseOver={() => handleHoverVideo(index)} className={"col-lg-3 videoItem videoItem" + index}>
                                        <div className="col-lg-12 videoImage item">
                                            <YouTube videoId={game.video} opts={opts}  />
                                        </div>
                                        <div className='col-lg-12 videoDate item'>
                                            <span className='title'>Date Submitted</span>
                                            <span className='date'>{new Date(game.dateVideo).toLocaleDateString('en-US', options)}</span>
                                        </div>
                                        <div id='videoMO' className='col-lg-12 item videoTitle'>
                                            {game.titleVideo}
                                        </div>
                                    </div>
                            } else {
                                if (game.series == typeVideo) {
                                    iVideo++
                                    return <div key={index} onMouseOut={() => handleOutVideo(index)} onMouseOver={() => handleHoverVideo(index)} className={"col-lg-3 videoItem videoItem" + index}>
                                        <div className="col-lg-12 videoImage item">
                                            <YouTube videoId={game.video} opts={opts}  />
                                        </div>
                                        <div className='col-lg-12 videoDate item'>
                                            <span className='title'>Date Submitted</span>
                                            <span className='date'>{new Date(game.dateVideo).toLocaleDateString('en-US', options)}</span>
                                        </div>
                                        <div id='videoMO' className='col-lg-12 item videoTitle'>
                                            {game.titleVideo}
                                        </div>
                                    </div>
                                }
                            }
                        }
                    })}
                </div>
            </div>
        </div> 
    );
}

export default VideosReview;