

import './listGame.scss'
import GameOfList from '../../ElementCustom/GameOfList';
import { useContext } from 'react';
import {Context} from '../../UseContext/Context'

function ListGames({type, series}) {

    const [handle, data] = useContext(Context)
    const games1 = []
    if (series == 'all-games') {
        data.games.forEach((game , index) => {
            if (game.gameType == type) {
                games1.push(game)
            }
            
        })
    } else {
        data.games.forEach((game , index) => {
            if(game.series.toLowerCase().split(' ').join('-') == series) {
                if (game.gameType == type) {
                    games1.push(game)
                }
            }
        })
    }
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

    const games = shuffleArray(games1) 

    return ( 
        <div className="col-lg-12 wrapperListGames" style={{display:'flex', justifyContent : 'center'}}>
            <div className='col-lg-9 listGames' style={{display:'flex', justifyContent : 'center', flexWrap: 'wrap'}}>
                {games.map((game , index) => {
                    return <GameOfList key={index} game = {game} />
                })}
            </div>
        </div>
    );
}

export default ListGames;