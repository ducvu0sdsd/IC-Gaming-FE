
import Slider from './Slider';
import FeaturedGame from './FeaturedGame';
import VideosReview from './VideosReview'
import './homePage.scss'
import { useContext } from 'react'
import { Context } from '../UseContext/Context';

function HomePage () {

    const [handle, data] = useContext(Context)

    return ( <div id='HomePage'>
        <Slider games={data.games} />
        <div className='boxParent'></div>
        <FeaturedGame games={data.games} />
        <div className='boxParent'></div>
        <VideosReview />
        <div className='boxParent'></div>
    </div>
     );
}

export default HomePage;