
import './listGames.scss'
import  GamesRandom from './GamesRandom'
import ListGames from './ListGames'
import { useContext } from 'react'
import { Context } from '../UseContext/Context'
import { Link } from 'react-router-dom';

function ListGamesPage({type ,series}) {
    const [handle, data] = useContext(Context)
    const menuItems = (type == 'Game PC' ? [...data.listGamesPC] : [...data.listGamesMobile])

    const handleClickMenu = (num) => {
        const active = document.querySelector(".active")
        const currentMenuItem = document.querySelector('.menuItem' + num)
        active.classList.remove('active') 
        currentMenuItem.classList.add('active')
    }
    return ( 
        <div id='listGames'>
            <GamesRandom type={'Game PC'}/>

            <div className="menuGames col-lg-12">
                <div className="menu">
                    {menuItems.map((m,index) => (
                        <Link key={index} className='link' onClick={handle.handleScrollUp} to={(type == 'Game PC' ? `/list-games/game-origin/${m.toLowerCase().split(' ').join('-')}-games` : `/list-games/game-mod/${m.toLowerCase().split(' ').join('-')}-games`)}>
                            <div onClick={() => handleClickMenu(index)} key={index} className={m.toLowerCase().split(' ').join('-') != series ? 'menuItem menuItem'+index : 'menuItem active menuItem'+index}>
                                {m}
                            </div>
                        </Link>
                        
                    ))}
                </div>
            </div>
            <div className='menuVideosMobile'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Games
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        {menuItems.map((m,index) => (
                            <li key={index}><Link className='link dropdown-item' onClick={handle.handleScrollUp} to={m == 'All Games' ? `/list-games-page/all-games` : `/list-games-page/${m.toLowerCase().split(' ').join('-')}-games`}>{m}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='boxChildren'></div>
            <ListGames type={type} series={series}/>
            <div className='boxParent'></div>
            <div className='boxChildren'></div>
        </div>
     );
}

export default ListGamesPage;