import './user_info.css'
import {useUserStore} from "../../../lib/userStore";


const User_info = () => {

    const {currentUser} = useUserStore();

    return (
        <div className='u_i'>
            <div className="user">
                <img src={currentUser.avatar||"./avatar.png"} />
                <h3>Ansh</h3>
            </div>
            
            <div className="icons">
                <img src='./more.png' alt='nhi_moili' />
                <img src='./video.png' alt='nhi_moili' />
                <img src='./edit.png' alt='nhi_moili' />

            </div>
        </div>
    )
}

export default User_info;