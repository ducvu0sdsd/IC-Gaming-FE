
import './footer.scss'
import logo from '../icgaming.png'

function Footer() {

    const footerItem =  ['']

    return ( 
        <div className="wrapperFooter">
                <div className="logo col-lg-1 col-1">
                    <img src={logo} height="100%" />
                </div>
                <div className="footer col-lg-7 col-12">
                    <div className="col-lg-2 col-4 chooseFooter">
                        <p>Games Library</p>
                    </div>
                    <div className="col-lg-2 col-4 chooseFooter">
                        <p>Action Games</p>
                    </div>
                    <div className="col-lg-2 col-4 chooseFooter">
                        <p>Fighting Games</p>
                    </div>
                    <div className="col-lg-2 col-4  chooseFooter">
                        <p>Family Games</p>
                    </div>
                    <div className="col-lg-12 col-11" style={{display:'flex', justifyContent : 'center',marginBottom : '20px'}}>
                        <div className="col-lg-8 col-7 aboutMe">
                        IC GAMING DOWNLOAD Is a Wed Site Downloading Game Link Google Drive Free, Good Height Including: Original Game, MODS Game To Help Players Have The Best Experience When Playing
                        </div>
                        <div  className="col-lg-4 col-4 contact" >
                            <div className="col-lg-12 icon">
                                <a target='_blank' href='https://www.youtube.com/channel/UCnFDlD3aQHKitXoeayAQ5pA'style={{color : 'black'}}><i style={{fontSize : '30px', margin : '0 5px'}} className="fa-brands fa-i fa-youtube"></i></a> 
                                <a target='_blank' href='https://www.instagram.com/icgaming26/'style={{color : 'black'}}><i style={{fontSize : '30px', margin : '0 5px'}} className="fa-brands fa-i fa-instagram"></i></a>
                                <a target='_blank' href='https://www.tiktok.com/@ic_gaming26'style={{color : 'black'}}><i style={{fontSize : '30px', margin : '0 5px'}} className="fa-brands fa-i fa-tiktok"></i></a>
                            </div>
                            <div className="col-lg-12 copyRight">
                                © 2023 IC Gaming Inc.
                            </div>
                        </div>
                    </div>
                </div>
        </div>
     );
}

export default Footer;