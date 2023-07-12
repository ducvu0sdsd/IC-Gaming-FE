

import './gamesRandom.scss'
import Game from '../../ElementCustom/GameRan'
import {useEffect, useRef, useState} from 'react'
import { useContext } from 'react';
import { Context } from '../../UseContext/Context';

function GamesRandom({type}) {

    const shuffleArray = (array) => {
        const shuffledArray = [];
        array.forEach((game) => {
            if (game.gameType == type) {
                shuffledArray.push(game)
            }
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

    const [handle, data] = useContext(Context)
    const games = data.games

    const GamesRandom = games.map(game => {
        return {
            gameType : game.gameType,
            url : `/games/${game.title.toLowerCase().split(' ').join('-')}/is-second`,
            image : game.logoSite,
            logo : game.logo
        }
    })

    const shuffledGamesRandom = shuffleArray(GamesRandom);
    let x = 0
    let sliderGames = useRef()
    useEffect(() => {
        const listGames = document.getElementsByClassName('featuredGame')
        const listGamesRandomRef = document.querySelector('.listGamesRandom')
        sliderGames.current = setInterval(() => {
            let gameWidth = listGames[0].offsetWidth + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-right"))
            x += gameWidth
            listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
            setTimeout (() => {
                listGamesRandomRef.style.transition = '0s'
                x = 0
                listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
                listGamesRandomRef.appendChild(listGames[0])
            }, 500)
            listGamesRandomRef.style.transition = '0.5s'
        },2200)
        

        return () => {
            clearInterval(sliderGames.current)
        }
    },[])

    const handleMouseOverButton = (btnType) => {
        const btn = document.querySelector('.' + btnType)
        btn.style.backgroundColor= 'rgba(185, 185, 185,0.8)'
    }
    const handleMouseOutButton = (btnType) => {
        const btn = document.querySelector('.' + btnType)
        btn.style.backgroundColor= 'rgba(185, 185, 185,0.3)'
    }
    let status = true
    const handleClickButton = (btnType) => {
        if (status == true) {
            const listGamesRandomRef = document.querySelector('.listGamesRandom')
            status = false
            if (btnType == 'btnRight') {
                clearInterval(sliderGames.current)
                const listGames = document.getElementsByClassName('featuredGame')
                let gameWidth = document.querySelector('.featuredGame').offsetWidth + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-right"))
                x += gameWidth
                listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
                setTimeout (() => {
                    listGamesRandomRef.style.transition = '0s'
                    x = 0
                    listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
                    listGamesRandomRef.appendChild(listGames[0])
                }, 500)
                listGamesRandomRef.style.transition = '0.5s'
    
                sliderGames.current = setInterval(() => {
                    let gameWidth = document.querySelector('.featuredGame').offsetWidth + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-right"))
                    x += gameWidth
                    listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
                    setTimeout (() => {
                        listGamesRandomRef.style.transition = '0s'
                        x = 0
                        listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
                        listGamesRandomRef.appendChild(listGames[0])
                    }, 500)
                    listGamesRandomRef.style.transition = '0.5s'
                },2200)
                setTimeout(() => {status = true},500)
            } else if (btnType == 'btnLeft') {
                clearInterval(sliderGames.current)
                const listGames = document.getElementsByClassName('featuredGame')
                let gameWidth = document.querySelector('.featuredGame').offsetWidth + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-right"))
                
                listGamesRandomRef.style.transition = '0s'
                x += gameWidth
                listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
                listGamesRandomRef.insertBefore(listGames[listGames.length-1], listGames[0])
    
                setTimeout (() => {
                    listGamesRandomRef.style.transition = '0.5s'
                    x= 0
                    listGamesRandomRef.style.transform= `translateX(${x}px)`
                }, 50)
    
                sliderGames.current = setInterval(() => {
                    let gameWidth = document.querySelector('.featuredGame').offsetWidth + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(document.querySelector('.featuredGame')).getPropertyValue("margin-right"))
                    x += gameWidth
                    listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
                    setTimeout (() => {
                        listGamesRandomRef.style.transition = '0s'
                        x = 0
                        listGamesRandomRef.style.transform= `translateX(${x * -1}px)`
                        listGamesRandomRef.appendChild(listGames[0])
                    }, 500)
                    listGamesRandomRef.style.transition = '0.5s'
                },2200)
                setTimeout(() => {status = true},500)
            }
        }

    } 

    return ( 
        <div className='wrapperGamesRandom col-lg-12 col-12' style={{overflow:'hidden'}}>
            <div id="gamesRandom" className='col-lg-9 col-12'>
                <div className='listGamesRandom'>
                    {shuffledGamesRandom.map((GameRandom,index) => (<Game key={index} featuredGame={GameRandom} index = {index}/>))}
                </div>
            </div>
            <button onClick={()=>handleClickButton('btnLeft')} onMouseOver={() => handleMouseOverButton('btnLeft')} onMouseOut={() => handleMouseOutButton('btnLeft')} className='btnLeft'><i className='bx bxs-left-arrow'></i></button>
            <button onClick={()=>handleClickButton('btnRight')} onMouseOver={() => handleMouseOverButton('btnRight')} onMouseOut={() => handleMouseOutButton('btnRight')} className='btnRight'><i className='bx bxs-right-arrow'></i></button>
        </div>
     );
}

export default GamesRandom;