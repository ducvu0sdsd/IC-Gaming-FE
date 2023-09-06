

import './gameDetailPage.scss'
import {useEffect, useRef} from 'react'
import GamesRandom from '../ListGamesPage/GamesRandom'
import $ from 'jquery'
import logo_gg_drive from '../ggdrivelogo.png'
import logo from '../icgaming.png'
import logoCVB from '../vcb.webp'
import logoMomo from '../momo.png'
import logoZalo from '../zalo.webp'
import logoPaypal from '../paypal.png'
import YouTube from 'react-youtube';
import myVideo from './getlink.mp4'
import thum from './getlink.png'
import axios from 'axios'

function GameDetailPage({game, isSecond}) {

    let handleChangeSlide = useRef()
    let x = 0
    let index = 0
    let listGames = useRef()


    const listImages = game.images


    useEffect(() => {
        handleChangeSlide = setInterval(() => {
            if (index < listImages.length - 1) {
                x += document.querySelector('.imageGameItem').offsetWidth
                listGames.current.style.transform = `translateX(${x * -1}px)`
                index ++
            } else {
                x = 0
                listGames.current.style.transform = `translateX(${x * -1}px)`
                index = 0
            }
            
        }, 5000)

        return () => clearInterval(handleChangeSlide)
    },[])

    let status = true;
    const handleChangeNext = () => {
        if (status == true) {
            status = false
            clearInterval(handleChangeSlide)
            if (index < listImages.length - 1) {
                x += document.querySelector('.imageGameItem').offsetWidth
                listGames.current.style.transform = `translateX(${x * -1}px)`
                index ++
            } else {
                x = 0
                listGames.current.style.transform = `translateX(${x * -1}px)`
                index = 0
            }   
            handleChangeSlide = setInterval(() => {
                if (index < listImages.length - 1) {
                    x += document.querySelector('.imageGameItem').offsetWidth
                    listGames.current.style.transform = `translateX(${x * -1}px)`
                    index ++
                } else {
                    x = 0
                    listGames.current.style.transform = `translateX(${x * -1}px)`
                    index = 0
                }
                
            }, 5000)
            setTimeout(() => {status = true}, 500)
        }
    }

    const handleChangePrev = () => {
        if (status == true) {
            status = false
            clearInterval(handleChangeSlide)
            if (index > 0) {
                x -= document.querySelector('.imageGameItem').offsetWidth
                listGames.current.style.transform = `translateX(${x * -1}px)`
                index --
            } else {
                x = document.querySelector('.imageGameItem').offsetWidth * (listImages.length - 1)
                listGames.current.style.transform = `translateX(${x * -1}px)`
                index = listImages.length - 1
            }   
            handleChangeSlide = setInterval(() => {
                if (index < listImages.length - 1) {
                    x += document.querySelector('.imageGameItem').offsetWidth
                    listGames.current.style.transform = `translateX(${x * -1}px)`
                    index ++
                } else {
                    x = 0
                    listGames.current.style.transform = `translateX(${x * -1}px)`
                    index = 0
                }
                
            }, 5000)
            setTimeout(() => {status = true}, 500)
        }
    }

    const handleClickDownload = () => {
        $('.opa').css('display', 'block')
        $('#modalDownload').css('top', '25%')
    }

    const handleClickDonate = () => {
        $('.opa').css('display', 'block')
        $('#modalDonate').css('top', '25%')
    }

    const handleClickExit = () => {
        $('.opa').css('display', 'none')
        $('#modalDownload').css('top', '-100%')
        $('#modalDonate').css('top', '-1000%')
    }

    const opts = {
        width: '100%',
        height : '400px'
    };

    const handleUpdateDownloads = (index, game) => {
        axios.put('https://ic-gaming-node-js.vercel.app/game/update-downloads-game', {gameID : game._id})
    }
    const handleUpdateSecond = (index, game) => {
        axios.put('https://ic-gaming-node-js.vercel.app/game/update-second-game', {gameID : game._id})
    }

    return ( 
        <div className='gameDetail'>
            <div className='boxChildren'></div>  
            {/* <GamesRandom type={'Game PC'} /> */}
            <div className='boxChildren'></div>  
            <div className='col-lg-12 gameInfo '>
                <div id='infoPC' className='col-lg-4 info item'>
                    <div className='col-lg-12 title'>
                        {game.title + '  ('+ (game.gameType == 'Game Mobile' ? 'Game Mod' : 'Game Origin') +')'}
                    </div>
                    <div className='col-lg-12 detailInfo'>
                        <div className='col-lg-12 gender detailItem' >
                            Gender : {game.gender}
                        </div>
                        <div className='col-lg-12 capacity detailItem'>
                            Capacity : {game.capacity}
                        </div>
                        <div className='col-lg-12 numberUser detailItem'>
                           Number of Players : {game.numberUser}
                        </div>
                        <div className='col-lg-12 ram detailItem'>
                            Minimum RAM : {game.ram}
                        </div>
                        <div className='col-lg-12 language detailItem'>
                            Language : {game.language}
                        </div>
                    </div>
                    <div className='btns'>
                        <button onClick={() => handleClickDownload()} className='button btnDownload'>Download Free</button>
                        <button className='button btnDonate' onClick={() => handleClickDonate()}>Donate</button>
                        <button className='button btnDonate'><a href='#getlink' className='aaa'>How To Get Link</a></button>
                    </div>
                    
                </div>
                <div className='col-lg-6 col-11 images item'>
                    <div className='listGames' ref={listGames}>
                        {listImages.map ((image, index) => (
                            <img className='imageGameItem' key={index} src={image}  width='100%' />
                        ))}
                    </div>
                    <button onClick={() => handleChangePrev()} className='button buttonPrev'><i className='bx bxs-left-arrow'></i></button>
                    <button onClick={() => handleChangeNext()} className='button buttonNext'><i className='bx bxs-right-arrow'></i></button>
                </div>
                <div id='infoMobile' className='col-lg-4 col-11 info item'>
                    <div className='col-lg-12 title'>
                        {game.title + '  ('+ game.gameType +')'}
                    </div>
                    <div className='col-lg-12 detailInfo'>
                        <div className='col-lg-12 gender detailItem' >
                            Gender : {game.gender}
                        </div>
                        <div className='col-lg-12 capacity detailItem'>
                            Capacity : {game.capacity}
                        </div>
                        <div className='col-lg-12 numberUser detailItem'>
                           Number of Players : {game.numberUser}
                        </div>
                        <div className='col-lg-12 ram detailItem'>
                            Minimum RAM : {game.ram}
                        </div>
                        <div className='col-lg-12 language detailItem'>
                            Language : {game.language}
                        </div>
                    </div>
                    <div className='btns'>
                        <button onClick={() => handleClickDownload()} className='button btnDownload'>Download Free</button>
                        <button className='button btnDonate' onClick={() => handleClickDonate()}>Donate</button>
                        <button  className='button btnDonate'><a href='#getlink' className='aaa'>How To Get Link</a></button>
                    </div>
                    
                </div>
            </div>
            {/* <GamesRandom type={'Game PC'} /> */}
            <div className='boxParent'></div>
            <div className='col-lg-12 col-12 video_des'>
                <div className='video col-lg-6 col-11'>
                    <YouTube videoId={game.video} opts={opts}  />
                </div>
                <div className='col-lg-4 col-11  des'>
                    <h3>Introduce</h3>
                    <div className='description'>
                        {game.description}
                    </div>
                </div>
            </div>
            <a name='getlink'></a>
            <div className='boxParent'></div>
            <div className='col-lg-12 col-12 video_get video_des'>
                <div className='col-lg-4 col-11  des' >
                    <h3>How to Get Link Download Game</h3>
                    <div className='description'>
                        <p>This is how I create funds to continue to grow the channel</p>
                        <p>I hope you will take the time to help me about 30 seconds to get the download link to support me ❤️❤️</p>
                        <p>Thank you !!!!</p>
                    </div>  
                </div>
                <div className='video col-lg-6 col-11'>
                    <video  className="video-component" controls poster={thum}>
                        <source src={myVideo} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className='boxParent'></div> 
            <div className='opa'></div>
            <div id='modalDownload' className='modal1'>
                <div className='col-lg-12 row' style={{display:'flex', justifyContent: 'center'}}>
                    <div className='col-lg-4 logo'>
                        <img src={game.logo} width='90%'/>
                    </div>
                    <div className='col-lg-8 buttons'>
                        {isSecond == false ? 
                            game.linksDownload.map((link, index) => {
                                if (index == 0) {
                                    return <button key={index} onClick={() => {handleUpdateDownloads(index, game)}} className='col-lg-5'><a target="_blank" href={link}>
                                    {game.linksDownload.length == 1 ? 'Main' : 'Part ' + (index + 1)} <img src={logo_gg_drive} height='70%'/>
                                </a></button>
                                } else {
                                    return <button key={index} className='col-lg-5'><a target="_blank" href={link}>
                                    {game.linksDownload.length == 1 ? 'Main' : 'Part ' + (index + 1)} <img src={logo_gg_drive} height='70%'/>
                                </a></button>
                                }     
                            }) : 
                            game.linksDownloadSecond.map((link, index) => {
                                if (index == 0) {
                                    return <button key={index} onClick={() => {handleUpdateSecond(index, game)}} className='col-lg-5'><a target="_blank" href={link}>
                                    {game.linksDownload.length == 1 ? 'Main' : 'Part ' + (index + 1)} <img src={logo_gg_drive} height='70%'/>
                                </a></button>
                                } else {
                                    return <button key={index} className='col-lg-5'><a target="_blank" href={link}>
                                    {game.linksDownload.length == 1 ? 'Main' : 'Part ' + (index + 1)} <img src={logo_gg_drive} height='70%'/>
                                </a></button>
                                }
                            })
                        }
                    </div>
                    <button onClick={() => handleClickExit()} className='btnExit'><i className='bx bxs-x-square'></i></button>
                </div>
            </div>
            <div id='modalDonate' className='modal1'>
                <div className='col-lg-12 row' style={{display:'flex', justifyContent: 'center'}}>
                    <div className='col-lg-3 logo'>
                        <img src={logo} width='90%'/>
                    </div>
                    <div className='col-lg-9 donates'>
                        <p className='col-lg-11 donate'><img src={logoPaypal} height='70%'/>  icgaming26zs@gmail.com</p> 
                        {/* <p className='col-lg-11 donate'><img src={logoMomo} height='70%'/>  0902491471</p> 
                        <p className='col-lg-11 donate'><img src={logoZalo} height='70%'/>  0902491471</p>  */}
                        

                    </div>
                    <button onClick={() => handleClickExit()} className='btnExit'><i className='bx bxs-x-square'></i></button>
                </div>               
            </div>
        </div>
    );
}

export default GameDetailPage;