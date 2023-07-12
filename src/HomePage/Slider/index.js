
import { Context } from '../../UseContext/Context'
import './slider.scss'
import { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

function Slider({games}) {
    let cateIndex1= 0
    let cateIndex2 = 0
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
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
    const gamesArr = shuffleArray(games) 

    const [handle] = useContext(Context)

    const imagesPC = []
    const imagesMobile = []
    gamesArr.forEach(game => {
        if (game.gameType == 'Game PC') {
            imagesPC.push({
                url : `/games/${game.title.toLowerCase().split(' ').join('-')}`,
                image : game.images[0],
                logo : game.logo
            })
        } else {
            imagesMobile.push({
                url : `/games/${game.title.toLowerCase().split(' ').join('-')}`,
                image : game.images[0],
                logo : game.logo
            })
        }
    })
    const sliderRef = useRef()
    let bannerRef1 = useRef()
    let bannerRef2 = useRef()
    let listBanner1 = document.getElementsByClassName('banner1')
    let listBanner2 = document.getElementsByClassName('banner2')
    let cateItems1 = document.getElementsByClassName('cateItem1')
    let cateItems2 = document.getElementsByClassName('cateItem2')
    let valueSlider1 = 0
    let valueSlider2 = 0
    let cateSlider1 = 0
    let cateSlider2 = 0
    let changeSlider = () => {}
    let sliding = () => {}
    let isAllowChange1 = true
    let isAllowChange2 = true
    let size = 0

    useEffect (() => {

        bannerRef1 = document.querySelector('.listBanner1')
        bannerRef2 = document.querySelector('.listBanner2')

        sliding = (bannerRef,listBanner, valueSlider, cateIndex, number, time) => {
            for (let i =0 ; i< number; i++) {
                bannerRef.style.transition = '0.8s'
                size = sliderRef.current.offsetWidth
                valueSlider += size
                bannerRef.style.transform = `translateX(${-valueSlider}px)`
                if (cateIndex == 1) {
                    if (cateIndex1 == listBanner.length - 1) {
                        cateIndex1=0
                    } else {
                        cateIndex1++;
                    }
                    document.querySelector('.active1').classList.remove('active1')
                    cateItems1[cateIndex1].classList.add('active1')
                } else {
                    if (cateIndex2 == listBanner.length - 1) {
                        cateIndex2=0
                    } else {
                        cateIndex2++;
                    }
                    document.querySelector('.active2').classList.remove('active2')
                    cateItems2[cateIndex2].classList.add('active2')
                }
        
                setTimeout(()=> {
                    if (listBanner.length > 0) {
                        bannerRef.style.transition = '0s'
                        valueSlider = 0
                        bannerRef.style.transform = `translateX(${-valueSlider}px)`
                        bannerRef.appendChild(listBanner[0])
                        isAllowChange1 = true
                        isAllowChange2 = true
                    }
                },time)
            }
        }
        changeSlider = setInterval(() => {
            sliding(bannerRef1, listBanner1, valueSlider1, 1, 1, 1000)
            sliding(bannerRef2, listBanner2, valueSlider2, 2, 1, 1000)
        }, 4500)

        return () => {
            clearInterval(changeSlider)
        }
    }, [])

    const handleClickCateSlider1 = () => {
        clearInterval(changeSlider)
        let i = 0
        if (cateSlider1 < cateIndex1) {
            i = listBanner1.length - (cateIndex1 - cateSlider1)
        } else {
            i = cateSlider1 - cateIndex1
        }
        sliding(bannerRef1, listBanner1, valueSlider1, 1, i, 1000)
        changeSlider = setInterval(() => {
            sliding(bannerRef1, listBanner1, valueSlider1, 1, 1, 1000)
            sliding(bannerRef2, listBanner2, valueSlider2, 2, 1, 1000)
        }, 4500)
    }

    const handleClickCateSlider2 = () => {
        clearInterval(changeSlider)
        let i = 0
        if (cateSlider2 < cateIndex2) {
            i = listBanner2.length - (cateIndex2 - cateSlider2)
        } else {
            i = cateSlider2 - cateIndex2
        }
        sliding(bannerRef2, listBanner2, valueSlider2, 2, i, 1000)
        changeSlider = setInterval(() => {
            sliding(bannerRef1, listBanner1, valueSlider1, 1, 1, 1000)
            sliding(bannerRef2, listBanner2, valueSlider2, 2, 1,)
        }, 4500)
    }

    const handleMouseOver = (number) => {
        const logoGames = document.querySelectorAll('.logoGame' + number)
        const bannerImage = document.querySelector('.bannerImage' + number)
        logoGames.forEach(logo => {
            logo.style.height = '100%'
            logo.style.top = '0%'
            logo.style.backgroundImage = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))'
            logo.querySelector('.image').style.height = '50%'
            logo.querySelector('.image').style.width = '50%'
            logo.querySelector('.image').style.marginTop = '8%'
        })
    }

    const handleMouseOut = (number) => {
        const logoGames = document.querySelectorAll('.logoGame' + number)
        const bannerImage = document.querySelector('.bannerImage' + number)
        logoGames.forEach(logo => {
            logo.style.height = '120px'
            logo.style.top = '50%'
            logo.style.background = '0'
            logo.querySelector('.image').style.height = '120px'
            logo.querySelector('.image').style.width = '120px'
            logo.querySelector('.image').style.marginTop = '0'
        })
    }

    let widthSlider = useRef()
    useEffect(() => {
        const getwidth = setInterval(() => {
            widthSlider = document.querySelector('.slider1').offsetWidth
        }, 1000)
        return () => {clearInterval(getwidth)}
    }, [])

    return (<div style={{display:'flex', justifyContent:'center'}}>
        <div className="col-lg-12 sliders">
            {imagesPC.length != 0 ?
                <div ref={sliderRef} className="slider slider1 col-lg-5 col-11">
                    <div className='listBanner listBanner1'>
                        {imagesPC.map((image, index) => {
                            if (index < 6) {
                                return <div onMouseOver={() => handleMouseOver(1)} onMouseOut={() => handleMouseOut(1)} key={index} className='banner banner1 col-lg-12 col-12'>
                                    <img className='bannerImage1 bannerImage' src={image.image} width='100%'  />
                                    <div className='logoGame1 logoGame'>
                                        <div className='image'> 
                                            <img src={image.logo} height={'100%'}/>
                                            <button type="button" className="btn btn-danger"><Link className='link' style={{color:'white'}} onClick={() => handle.handleScrollUp()} to={image.url}>Download Game</Link></button>
                                        </div>
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                    <div className='cateSliderParent'>
                        {imagesPC.map ((m,index) => {
                            if (index < 6) {
                                return <div key={index} onClick={() => {
                                    if (isAllowChange1 == true) {
                                        isAllowChange1 = false
                                        cateSlider1 = index; 
                                        handleClickCateSlider1()
                                    }
                                    }} className={index == 0 ? 'cateItem cateItem1 active1' : 'cateItem cateItem1'} > 
                                </div>
                            }
                        })}
                    </div>
                </div> :
                <></>
            }
            {imagesMobile.length != 0 ? 
                <div className="slider slider2 col-lg-5 col-0">
                    <div className='listBanner listBanner2'>
                        {imagesMobile.map((image, index) => {
                            if (index < 6) {
                                return <div onMouseOver={() => handleMouseOver(2)} onMouseOut={() => handleMouseOut(2)} key={index} className='banner banner2 col-lg-12'>
                                    <img className='bannerImage2'   src={image.image} width='100%' height='100%' />
                                    <div className='logoGame2 logoGame'>
                                        <div  className='image'> 
                                            <img src={image.logo} height={'100%'}/>
                                            <button type="button" className="btn btn-danger"><Link className='link' style={{color:'white'}} onClick={() => handle.handleScrollUp()} to={image.url}>Download Game</Link></button>
                                        </div>
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                    <div className='cateSliderParent'>
                        {imagesMobile.map ((m,index) => {
                            if (index < 6) {
                                return <div key={index} onClick={() => {
                                    if (isAllowChange2 == true) {
                                        isAllowChange2 = false
                                        cateSlider2 = index; 
                                        handleClickCateSlider2()
                                    }
                                }} className={index == 0 ? 'cateItem cateItem2 active2' : 'cateItem cateItem2'}> 
                                </div>
                            }
                        })}
                    </div>
                </div>  :
                <></>
            }
        </div>   
    </div>);
}

export default Slider;