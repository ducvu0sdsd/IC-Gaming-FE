
import './App.css';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer'
import GameDetailPage from './GameDetailPage';
import ListGamesPage from './ListGamesPage'
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './UseContext/Context';
import { useState, useEffect } from 'react';
import './App.scss';
import logo from '../src/icgaming.png'
import { Link } from 'react-router-dom';
import Loading from './ElementCustom/Loading'
import LinkManagerManagerPage from './LinkDownloadPage/LinkManagerPage'
import axios from 'axios';
import LinkDownloadPage from './LinkDownloadPage';

function App() {

  const [handle, data] = useContext(Context)
  const [isPC , setIsPC ] = useState(false)
  const [links, setLinks] = useState([])
  useEffect(() => {
      axios.get('https://ic-gaming-node-js.vercel.app/links/api')
          .then(res => setLinks(res.data))
  }, [])

  const handleClickPC = () => {
    const subArea = document.querySelector('.subMenuItemPC')
    const num = document.getElementsByClassName('submenuPC').length

    if (document.querySelector('.subMenuItemMobile').offsetHeight > 0) {
      document.querySelector('.subMenuItemMobile').style.height = '0px'
      setIsMobile(false)
    }

    if (isPC == true)  {
      subArea.style.height = '0px'
      setIsPC(false)
    } else {
      subArea.style.height = 52.727 * num + 'px'
      setIsPC(true)
    }
  }


  const [isMobile , setIsMobile ] = useState(false)
  const handleClickMobile = () => {
    const subArea = document.querySelector('.subMenuItemMobile')
    const num = document.getElementsByClassName('submenuMobile').length

    if (document.querySelector('.subMenuItemPC').offsetHeight > 0) {
      document.querySelector('.subMenuItemPC').style.height = '0px'
      setIsPC(false)
    }

    if (isMobile == true)  {
      subArea.style.height = '0px'
      setIsMobile(false)
    } else {
      subArea.style.height = 52.727 * num + 'px'
      setIsMobile(true)
    }
  }
  const [listGames, setListGames] = useState([])
  let list = []
  const handleExitMenu = () => {
    const opa = document.querySelector('#effectOpacity')
    const menu = document.querySelector('#menuMobile')
    const search = document.querySelector('#searchMobile')
    search.style.right = '-300px'
    menu.style.left = '-300px'
    opa.style.backgroundColor = 'rgba(52, 51, 51, 0.0)'
    setTimeout(() => {
      opa.style.display = 'none'
    }, 500)
    document.querySelector('.subMenuItemMobile').style.height = '0px'
    setIsMobile(false)
    document.querySelector('.subMenuItemPC').style.height = '0px'
    setIsPC(false)

    document.querySelector('.txtSearchMobile').value = ''
    setListGames([])


  }

  const [haveData, setHaveData] = useState(false)
  const checkData = setInterval(() => {
    if (data.games.length > 0) {
      setHaveData(true)
      clearInterval(checkData)
    }
  }, 100);


  const handleChangeInput = () => {
      let value = document.querySelector('.txtSearchMobile').value.toLowerCase()
      list = []
      data.games.forEach(game => {
          if (game.title.toLowerCase().includes(value)) 
              list.push(game)
      })
      setListGames(list)
  }

  return (             
    <div className="App">
      <Header val = {{ opa : document.querySelector('#effectOpacity'), menu : document.querySelector('#menuMobile'), search : document.querySelector('#searchMobile')}} />
      <div className='boxParent'></div>
      {haveData == true ? 
        <Routes>
          <Route path='/' element={<HomePage />} />
          {data.listGamesPC.map((item, index) => {
              return <Route key={index} path={`/list-games/game-origin/${item.toLowerCase().split(' ').join('-')}-games`} element={<ListGamesPage type='Game PC' series={`${item.toLowerCase().split(' ').join('-')}`} />} /> 
          })}
          {data.listGamesMobile.map((item, index) => {
              return <Route key={index} path={`/list-games/game-mod/${item.toLowerCase().split(' ').join('-')}-games`} element={<ListGamesPage type='Game Mobile' series={`${item.toLowerCase().split(' ').join('-')}`} />} /> 
          })}
          {data.games.map((game, index) => ( 
              <Route key={index} path={`/games/${game.title.toLowerCase().split(' ').join('-')}`} element={<GameDetailPage game={game} isSecond={false} />}  /> 
          ))}
          {data.games.map((game, index) => ( 
              <Route key={index} path={`/games/${game.title.toLowerCase().split(' ').join('-')}/is-second`} element={<GameDetailPage game={game} isSecond={true} />}  /> 
          ))}
          <Route path='/link-manager' element={<LinkManagerManagerPage />} />
          {links.map((link, index) => {
            return <Route key={index} path={`${link.URL.split('app')[1]}`} element={<LinkDownloadPage links={link} />} />
          })}
        </Routes>  : <Loading  />
      }

      <Footer />
      <div id='searchMobile'>
        <div className='headerMO'>
          <div className='logoMobile'>
            <img src={logo} height='80%' width="100%" />
          </div>
          <p>IC GAMING</p>
          <i onClick={() => handleExitMenu()} className="fa-regular fa-circle-xmark"></i>
        </div>
        <div className='searchArea'>
          <input 
            onChange={() => handleChangeInput()}
            type='text' 
            className="form-control col-11 txtSearchMobile" 
            placeholder="Search game..."
          />
        </div>
        <div className='resultMobile'>
          {listGames.map((game, index) => (
            <div key={index} onClick={() => handleExitMenu()} className='resultItem col-12'>
              <Link className='col-12' style={{color:'black', textDecoration:'none' , display:'flex', justifyContent:  'space-around'}} onClick={() => {handle.handleScrollUp() ;}} to={`/games/${game.title.toLowerCase().split(' ').join('-')}`}>
                <div className='logoR col-2'>
                  <img height='100%' src={game.logo}/>
                </div>
                <div className='titleR col-9'>
                  {game.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div id='menuMobile'>
          <div className='headerMO'>
            <div className='logoMobile'>
              <img src={logo} height='80%' width="100%" />
            </div>
            <p>IC GAMING</p>
            <i onClick={() => handleExitMenu()} className="fa-regular fa-circle-xmark"></i>
          </div>
          <div className='menuMO'>
            <div className='menuItemMO'><Link onClick={() => {handle.handleScrollUp(); handleExitMenu()}} className='link' to="/">Home</Link></div>
            <div className='menuItemMO' onClick={() => handleClickPC()}>Games PC <i className='bx bxs-chevron-down'></i></div>
            <div className='subMenuItemPC subMenuItemMO'>
              {data.listGamesPC.map((menu, index) => (
                <div key={index} className='submenuPC submenu'><Link className='link' onClick={() => {handle.handleScrollUp() ; handleExitMenu()}} to={`list-games-page/${menu.toLowerCase().split(' ').join('-')}-games`}>{menu}</Link></div>
              ))}
              <div className='submenuPC submenu'><Link onClick={() => {handle.handleScrollUp() ; handleExitMenu()}} className='link' to="/list-games-page/all-games">All Games</Link></div>
            </div>
            <div className='menuItemMO' onClick={() => handleClickMobile()}>Mods <i className='bx bxs-chevron-down'></i></div>
            <div className='subMenuItemMobile subMenuItemMO'>
              {data.listGamesMobile.map((menu, index) => (
                <div key={index} className='submenuMobile submenu'><Link className='link' onClick={() => {handle.handleScrollUp() ; handleExitMenu()}} to={`list-games-page/${menu.toLowerCase().split(' ').join('-')}-games`}>{menu}</Link></div>
              ))}
              <div className='submenuMobile submenu'><Link onClick={() => {handle.handleScrollUp() ; handleExitMenu()}} className='link' to="/list-games-page/all-games">All Games</Link></div>
            </div>
            <div className='menuItemMO' onClick={() =>  {handle.handleScrollDown(); handleExitMenu()}}>Contact</div>
          </div>
      </div>
      <div id='effectOpacity' onClick={() => handleExitMenu()}>

      </div>
    </div>
  );
}

export default App;
