
import './moddetail.scss'
import Criteria from '../ModsPage/Criteria'
import YouTube from 'react-youtube';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../UseContext/Context';
function ModDetail({ mod }) {
    const [handle] = useContext(Context)
    const opts = {
        width: '495px',
        height: '297px'
    };
    // window.location.reload()


    const [mods, setMods] = useState([])
    const [games, setGames] = useState()
    const shuffleArray = (array) => {
        const shuffledArray = array;
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
        axios.get(`https://ic-gaming-node-js.vercel.app/mods/get-by-origin?origin=` + mod.originGame)
            .then(res => {
                let arr = shuffleArray(res.data)
                setMods(arr)
            })
        axios.get(`https://ic-gaming-node-js.vercel.app/game/get-by-title?title=` + mod.originGame)
            .then(res => {
                setGames(res.data)
            })
    }, [])

    const handleUpdateDownloads = (title, downloads) => {
        axios.post(`https://ic-gaming-node-js.vercel.app/mods/update-downloads`, { title: title, downloads: downloads })
            .then(res => {

            })
    }

    const handleUpdateViews = (title, views) => {
        axios.post(`https://ic-gaming-node-js.vercel.app/mods/update-views`, { title: title, views: views + 1 })
            .then(res => {

            })
    }

    useEffect(() => {
        handleUpdateViews(mod.title, mod.views)
    }, [mod])

    const handleChangeImage = (num) => {
        const width = document.querySelector('.mod-content .image').offsetWidth
        document.querySelector('.wrapper').style.transform = `translateX(${width * num * -1}px)`
    }

    return (
        <div id='mod-detail' className='col-lg-12'>
            <Criteria origin={mod.originGame} isList={true} modDetail={true} />
            <div className='col-lg-12 content'>
                <div className='col-lg-7 mod-content'>
                    <div className='col-lg-12 image'>
                        <div className='wrapper'>
                            {mod.images.map((image, index) => (
                                <img key={index} src={image} width='100%' />
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-12 list-image'>
                        {mod.images.map((image, index) => (
                            <div onClick={() => handleChangeImage(index)} key={index} className='item'>
                                {console.log(image)}
                                <img width='100%' src={image} />
                            </div>
                        ))}
                    </div>
                    <div className='col-lg-12 actions'>
                        <h4 className='title col-lg-8'>{mod.title}</h4>
                        <button onClick={() => handleUpdateDownloads(mod.title, mod.downloads + 1)} className='btn-download'><a style={{ textDecoration: 'none', color: 'white' }} target='_blank' href={mod.linkDownload[0]}>Download</a></button>
                    </div>
                    <div className='action col-lg-12'>
                        <div className='amount-download amount'><i className='bx bx-download'></i>{mod.downloads}</div>
                        <div className='amount-view amount'><i className="fa-regular fa-eye"></i>{mod.views}</div>
                    </div>
                    <div className='col-lg-12 description'>
                        <YouTube className='col-lg-7' videoId={mod.video} opts={opts} />
                        <div className='col-lg-5'>
                            <span style={{ fontWeight: 'bold' }}>Description : </span>
                            {mod.description}
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 others'>
                    <div className='game-origin col-lg-12'  >
                        <div className='col-lg-11 image'>
                            <img src={games != undefined ? games[0].images[0] : ''} width='100%' />
                        </div>
                        <div className='col-lg-11 title'>
                            {games != undefined ? games[0].title : ''}
                        </div>
                        <div className='col-lg-11'>
                            <Link onClick={handle.handleScrollUp} to={games != undefined ? `/games/${games[0].title.toLowerCase().split(' ').join('-')}` : ''}><button className='btn-download'>Official Site</button></Link>
                        </div>
                    </div>
                    <div className='col-lg-12 similar-mods'>
                        <div className='title col-lg-12'>SIMILAR MODS</div>
                        <div className='mods col-lg-12'>
                            {mods.map((mod, index) => {
                                if (index < 10) {
                                    return (
                                        <Link onClick={handle.handleScrollUp} key={index} className='item col-lg-5' style={{ textDecoration: 'none', color: 'black' }} to={'/mods/' + mod.originGame.toLowerCase().split(' ').join('-') + '/' + mod.criteria.toLowerCase().split(' ').join('-') + '/' + mod.title.toLowerCase().split(' ').join('-')}>
                                            <div key={index}>
                                                <img width='100%' src={mod.images[0]} />
                                                {mod.title}
                                            </div>
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModDetail;