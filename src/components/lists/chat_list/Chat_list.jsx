import { useEffect, useState } from 'react';
import './chat_list.css'
import AddUser from "./addUser/AddUser.jsx"
import { db } from "../../../lib/firebase"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { useUserStore } from "../../../lib/userStore.js"


const Chat_list = () => {

    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);
    console.log(chats);
    

    const { currentUser } = useUserStore();

    useEffect(() => {

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {

            const items = res.data().chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));

        });

        return () => {
            unSub();
        }
    }, [currentUser.id])

    console.log(chats);


    return (
        <div className='c_l'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" />
                    <input type='text' placeholder='Search' />
                </div>
                <img className='add' src={addMode ? "./minus.png" : "./plus.png"}
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>

            {chats.map((chat) => (
                <div className="item" key={chat.chatId}>
                    <img src="./avatar.png" />
                    <div className="texts">
                        <span>Ansh</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    )
}

export default Chat_list;