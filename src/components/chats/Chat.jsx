import { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from "emoji-picker-react"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from "../../lib/firebase"
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
const Chat = () => {

    const [chat, setChat] = useState();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [img, setImg] = useState({
        file: null,
        url: ""
    });

    const { chatId, user } = useChatStore();
    const { currentUser } = useUserStore();

    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, []);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data())
        })

        return () => {
            unSub();
        }
    }, [chatId])



    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
        setOpen(false);

    }
    console.log(text);

    const handleImg = e => {

        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSend = async () => {

        if (text === "") return;

        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                }),
            })

            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {

                const userChatsRef = doc(db, "userchats", id)
                const userChatsSnapshot = await getDoc(userChatsRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()

                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,
                    })
                }



            })
        } catch (error) {
            console.log(error);

        }


    }

    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" />
                    <div className="texts">
                        <span>kjfhudh</span>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" />
                    <img src="./video.png" />
                    <img src="./info.png" />
                </div>
            </div>


            <div className="center">



                {chat?.messages?.map((message) => (


                    <div className="message own" key={message?.createdAt}>
                        <div className="texts">

                            {message.img && <img src={message.img} />}
                            <p>
                                {message.text}
                            </p>
                            {/* <span>1min ago</span> */}
                        </div>
                    </div>
                ))}

                <div ref={endRef}></div>
            </div>




            <div className="bottom">

                <div className="icons">
                    <label htmlFor='file'>

                        <img src='./img.png' />
                    </label>
                    <input type='file' id='file' style={{ display: "none" }} onChange={handleImg} />
                    <img src='./camera.png' />
                    <img src='./mic.png' />
                </div>
                <input type='text' placeholder='Type a Message..' value={text} onChange={(e) => setText(e.target.value)} />
                <div className="emoji">
                    <img src='./emoji.png' onClick={() => setOpen((prev) => !prev)} />
                    <div className="picker">

                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendButton' onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat;