import './detail.css'
import { auth } from '../../lib/firebase';

const Detail = () => {
    return (
        <div className='detail'>
            <div className="user">
                <img src="./avatar.png" />
                <h2>Ansh</h2>
                <p>Lorem ipsum, dolor sit ame</p>
            </div>
            <div className="info">

                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src='./arrowUp.png' />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src='./arrowUp.png' />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy and Help</span>
                        <img src='./arrowUp.png' />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src='./arrowDown.png' />
                    </div>
                    <div className="photos">

                        <div className="photoItem">
                            <div className="photoDetail">

                                <img src='https://images.pexels.com/photos/259698/pexels-photo-259698.jpeg?auto=compress&cs=tinysrgb&w=400' />
                                <span>
                                    Photo_2024_.png
                                </span>
                            </div>

                            <img src='./download.png' className="icon" />
                        </div> <div className="photoItem">
                            <div className="photoDetail">

                                <img src='https://images.pexels.com/photos/259698/pexels-photo-259698.jpeg?auto=compress&cs=tinysrgb&w=400' />
                                <span>
                                    Photo_2024_.png
                                </span>
                            </div>

                            <img src='./download.png' className="icon" />
                        </div> <div className="photoItem">
                            <div className="photoDetail">

                                <img src='https://images.pexels.com/photos/259698/pexels-photo-259698.jpeg?auto=compress&cs=tinysrgb&w=400' />
                                <span>
                                    Photo_2024_.png
                                </span>
                            </div>

                            <img src='./download.png' className="icon" />
                        </div>

                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src='./arrowUp.png' />
                    </div>
                </div>
                <button>
                    Blocked User
                </button>
                <button className="logout"
                    onClick={() => auth.signOut()}
                >
                    Log Out
                </button>
            </div>
        </div>

    )
}

export default Detail;