
import './modselement.scss'
import { useState,useEffect  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ModsElement({origin, num = 0, handleCallHover}) {

    const [mods, setMods] = useState([])
    const [criterias , setCriterias] = useState([])
    useEffect(() => {
        axios.get(`https://ic-gaming-node-js.vercel.app/mods/get-by-origin?origin=`+origin)
            .then(res =>{
                setMods(res.data)
                res.data.forEach(mod => {
                    let arr = criterias
                    arr.push({criteria : mod.criteria, amount : 1})
                    setCriterias(arr)
                })
                let arr = []
                criterias.forEach(item => {
                    if (!arr.includes(item.criteria)) {
                        arr.push(item.criteria)
                    }
                })
                setCriterias(arr)
            })
    }, [])
    let i = 0
    let index = 0

    useEffect(() => {
        index = num
        let width = document.querySelector('.mods-element').offsetWidth
        i = width * index
        document.querySelector('.wrapper-mods').style.transform = `translateX(${i * -1}px)`
    },[num])

    const handleNext = () => {
        let length = criterias.length -1
        let width = document.querySelector('.mods-element').offsetWidth
        if (index == length) {
            i = 0
            index = 0
        } else {
            index += 1
            i += width
        }
        handleCallHover(index)
        document.querySelector('.wrapper-mods').style.transform = `translateX(${i * -1}px)`
    }

    const handlePrev = () => {
        let length = criterias.length -1
        let width = document.querySelector('.mods-element').offsetWidth
        if (index == 0) {
            i = width *length
            index = length
        } else {
            i -= width
            index -= 1
        }
        handleCallHover(index)
        document.querySelector('.wrapper-mods').style.transform = `translateX(${i * -1}px)`
    }


    return (
        <div className="mods-element col-lg-11">
            <button onClick={() => handlePrev()} className='btn-prev btn'><i className='bx bxs-left-arrow'></i></button>
            <button onClick={() => handleNext()} className='btn-next btn'><i className='bx bxs-right-arrow' ></i></button>
            <div className='wrapper-mods'>
                {criterias != undefined ? criterias.map((cri, index) => (
                    <div key={index} className='mods col-lg-12'>
                        <Link to={'/mods/'+origin.toLowerCase().split(' ').join('-')+'/' + cri.toLowerCase().split(' ').join('-')} style={{textDecoration : 'none', color : 'black'}}><button className='btn-more'>More</button></Link> 
                        {mods.map((mod,index) => {
                            if (mod.criteria == cri) {
                                return (<Link key={index} style={{textDecoration : 'none', color : 'black'}} to={'/mods/'+mod.originGame.toLowerCase().split(' ').join('-')+'/'+mod.criteria.toLowerCase().split(' ').join('-')+'/'+ mod.title.toLowerCase().split(' ').join('-')}><div key={index} className='item'>
                                    <img src={mod.images[0]} width={'100%'}/>
                                    <div className='title'>{mod.title}</div>
                                </div></Link>)
                            }
                        })}
                    </div>
                )) : ''}
            </div>
        </div>
    );
}

export default ModsElement;