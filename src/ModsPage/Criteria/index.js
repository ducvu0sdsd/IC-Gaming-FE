
import axios from 'axios';
import './criteria.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


function Criteria({origin, handleChangeCriteria, isList = false, criteria = '', modDetail = false}) {
    
    const [indexCriteria, setIndexCriteria] = useState(0)
    const [mods, setMods] = useState([])
    const [criterias , setCriterias] = useState([])
    const location = useLocation();
    criteria = modDetail == false ? location.pathname.split('/')[location.pathname.split('/').length - 1] : location.pathname.split('/')[location.pathname.split('/').length - 2]
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

                let arr1 = []
                arr.forEach(item => {
                    let i = 0
                    criterias.forEach(cr => {
                        if (cr.criteria == item) {
                            i++;
                        }
                    })   
                    arr1.push({criteria : item, amount : i})
                })
                setCriterias(arr1)
                arr1.forEach((item, index) => {
                    if (item.criteria.toLowerCase() == criteria.toLowerCase()) {
                        setIndexCriteria(index)
                    }
                })
            })
    }, [])

    const handleHover = (num) => {
        const active = document.querySelector('.active')
        active.classList.remove('active')
        const element = document.querySelector('.item'+num)
        element.classList.add('active')
    }

    return (
        <div id="criteria" className="col-lg-11">
            <p className='title col-lg-12'>Mods for {origin}:</p>
            <div className='criteria_list col-lg-12'>
                {criterias.map((item, index) => {
                    if (isList == false) {
                        return (
                            <div onClick={() => {handleChangeCriteria(index); handleHover(index)}} key={index} className={index == indexCriteria ? 'active item item' + index : 'item item'+index}>
                                <span className='name'>{item.criteria}</span>
                                <span className='amount'>{item.amount}</span>
                            </div>
                        )
                    } else {
                        return (
                            <Link onClick={() => {handleHover(index)}} key={index} to={'/mods/'+origin.toLowerCase().split(' ').join('-')+'/' + item.criteria.toLowerCase().split(' ').join('-')} style={{textDecoration : 'none', color : 'black'}}>
                                <div key={index} className={index == indexCriteria ? 'active item item' + index : 'item item'+index}>
                                    <span className='name'>{item.criteria}</span>
                                    <span className='amount'>{item.amount}</span>
                                </div>
                            </Link>
                        )
                    }
                })}
            </div>

        </div>
    );
}

export default Criteria;