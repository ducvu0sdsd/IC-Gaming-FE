

import { useContext } from 'react';
import './game.scss'
import { Link } from 'react-router-dom';
import { Context } from '../../UseContext/Context';

function Game({featuredGame, index}) {

    const handleMouseOver = (number) => {
        const logo = document.querySelector(".featuredGameLogo"+number)
        const site = document.querySelector(".site"+number)
        const smoothOut = document.querySelector('.gradientSmoothOut'+number)
        const smoothOver = document.querySelector('.gradientSmoothOver'+number)
        logo.style.top = '18%'
        site.style.opacity = '1'
        smoothOut.style.opacity = '0'
        smoothOver.style.opacity = '0.7'
    }

    const handleMouseOut = (number) => {
        const logo = document.querySelector(".featuredGameLogo"+number)
        const site = document.querySelector(".site"+number)
        const smoothOut = document.querySelector('.gradientSmoothOut'+number)
        const smoothOver = document.querySelector('.gradientSmoothOver'+number)
        logo.style.top = '30%'
        site.style.opacity = '0'
        smoothOut.style.opacity = '1'
        smoothOver.style.opacity = '0'
    }

    const [handle , data] = useContext(Context)

    return ( 
        <div onMouseOut={() => handleMouseOut(index)} onMouseOver={() => handleMouseOver(index)} className={"col-lg-3 col-11 featuredGame featuredGame"+index}>
            <Link onClick={handle.handleScrollUp} to={featuredGame.url}>
                <div className={'col-lg-12 gradientSmoothOut gradientSmoothOut'+index}></div>
                <div className={'col-lg-12 gradientSmoothOver gradientSmoothOver'+index}></div>
                <img className='featuredGameImage' src={featuredGame.image} width="100%"/>
                <div className={'featuredGameLogo col-lg-5 featuredGameLogo'+index}>
                    <img width='100%' src={featuredGame.logo} />
                </div>
                <p className={'site site'+index}>Official Site</p>
            </Link>
        </div>
     );
}

export default Game;