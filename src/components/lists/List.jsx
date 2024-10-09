import './list.css'
import './user_info/User_info.jsx'
import './chat_list/Chat_list.jsx'

import User_info from './user_info/User_info.jsx'
import Chat_list from './chat_list/Chat_list.jsx'

const List = () => {
    return (
        <div className='list'>


            <User_info />
            <Chat_list />

        </div>
    )
}

export default List;