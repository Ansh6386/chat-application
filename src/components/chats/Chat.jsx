import { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from "emoji-picker-react"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from "../../lib/firebase"
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';
const Chat = () => {

    const [chat, setChat] = useState();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [img, setImg] = useState({
        file: null,
        url: ""
    });

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
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

    const handleImg = e => {

        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSend = async () => {
        if (text === "" || !currentUser || !chatId) return;  // Check if currentUser and chatId exist

        let imgUrl = null;


        try {

            if (img.file) {
                imgUrl = await upload(img.file);
            }
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),

                    ...(imgUrl && { img: imgUrl }),
                }),
            });

            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();

                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

                    // Update the last message, seen status, and updated timestamp
                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text;
                        userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                        userChatsData.chats[chatIndex].updatedAt = Date.now();

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        });
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }

        setImg({
            file: null,
            url: ""
        });

        setText("");




    }

    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./avatar.png"} />
                    <div className="texts">
                        <span>{user?.username}</span>
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


                    <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createdAt}>
                        <div className="texts">

                            {message.img && <img src={message.img} />}
                            <p>
                                {message.text}
                            </p>

                        </div>
                    </div>
                ))}

                {img.url && (<div className="message own">
                    <div className="texts">
                        <img src={img.url} />
                    </div>
                </div>)}

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
                <input type='text' placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You can't send message" : "Type a mesaage "} value={text} onChange={(e) => setText(e.target.value)}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                />

                <div className="emoji">
                    <img src='./emoji.png' onClick={() => setOpen((prev) => !prev)} />
                    <div className="picker">

                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendButton' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
            </div>
        </div>
    )
}

export default Chat;


//camera featurre
// import { useEffect, useRef, useState } from 'react'
// import './chat.css'
// import EmojiPicker from "emoji-picker-react"
// import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
// import { db } from "../../lib/firebase"
// import { useChatStore } from '../../lib/chatStore';
// import { useUserStore } from '../../lib/userStore';
// import upload from '../../lib/upload';

// const Chat = () => {

//     const [chat, setChat] = useState();
//     const [open, setOpen] = useState(false);
//     const [text, setText] = useState("");
//     const [img, setImg] = useState({
//         file: null,
//         url: ""
//     });
//     const [isCameraOpen, setIsCameraOpen] = useState(false); // Camera state
//     const [videoStream, setVideoStream] = useState(null); // Stream for camera
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
//     const { currentUser } = useUserStore();

//     const endRef = useRef(null);
//     useEffect(() => {
//         endRef.current?.scrollIntoView({ behaviour: "smooth" })
//     }, []);

//     useEffect(() => {
//         const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
//             setChat(res.data())
//         })

//         return () => {
//             unSub();
//         }
//     }, [chatId])

//     const handleEmoji = e => {
//         setText((prev) => prev + e.emoji);
//         setOpen(false);

//     }

//     const handleImg = e => {

//         if (e.target.files[0]) {
//             setImg({
//                 file: e.target.files[0],
//                 url: URL.createObjectURL(e.target.files[0])
//             })
//         }
//     }

//     const handleSend = async () => {
//         if (text === "" || !currentUser || !chatId) return;  // Check if currentUser and chatId exist

//         let imgUrl = null;

//         try {

//             if (img.file) {
//                 imgUrl = await upload(img.file);
//             }
//             await updateDoc(doc(db, "chats", chatId), {
//                 messages: arrayUnion({
//                     senderId: currentUser.id,
//                     text,
//                     createdAt: new Date(),

//                     ...(imgUrl && { img: imgUrl }),
//                 }),
//             });

//             const userIDs = [currentUser.id, user.id];
//             userIDs.forEach(async (id) => {
//                 const userChatsRef = doc(db, "userchats", id);
//                 const userChatsSnapshot = await getDoc(userChatsRef);

//                 if (userChatsSnapshot.exists()) {
//                     const userChatsData = userChatsSnapshot.data();

//                     const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

//                     // Update the last message, seen status, and updated timestamp
//                     if (chatIndex !== -1) {
//                         userChatsData.chats[chatIndex].lastMessage = text;
//                         userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
//                         userChatsData.chats[chatIndex].updatedAt = Date.now();

//                         await updateDoc(userChatsRef, {
//                             chats: userChatsData.chats,
//                         });
//                     }
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//         }

//         setImg({
//             file: null,
//             url: ""
//         });

//         setText("");

//     }

//     const openCamera = async () => {
//         setIsCameraOpen(true);
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             setVideoStream(stream);
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         } catch (err) {
//             console.error("Error accessing the camera:", err);
//             setIsCameraOpen(false);
//         }
//     };

//     const closeCamera = () => {
//         if (videoStream) {
//             const tracks = videoStream.getTracks();
//             tracks.forEach(track => track.stop());
//             setVideoStream(null);
//         }
//         setIsCameraOpen(false);
//     };

//     const capturePhoto = () => {
//         const canvas = canvasRef.current;
//         const video = videoRef.current;
//         if (canvas && video) {
//             const context = canvas.getContext("2d");
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);
//             canvas.toBlob(blob => {
//                 const imgURL = URL.createObjectURL(blob);
//                 setImg({
//                     file: blob,
//                     url: imgURL
//                 });
//             });
//             closeCamera(); // Close the camera after capturing
//         }
//     };

//     return (
//         <div className='chat'>
//             <div className="top">
//                 <div className="user">
//                     <img src={user?.avatar || "./avatar.png"} />
//                     <div className="texts">
//                         <span>{user?.username}</span>
//                         <p>Lorem ipsum dolor sit amet.</p>
//                     </div>
//                 </div>
//                 <div className="icons">
//                     <img src="./phone.png" />
//                     <img src="./video.png" />
//                     <img src="./info.png" />
//                 </div>
//             </div>

//             <div className="center">

//                 {chat?.messages?.map((message) => (

//                     <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createdAt}>
//                         <div className="texts">

//                             {message.img && <img src={message.img} />}
//                             <p>
//                                 {message.text}
//                             </p>
//                             {/* <span>1min ago</span> */}
//                         </div>
//                     </div>
//                 ))}

//                 {img.url && (<div className="message own">
//                     <div className="texts">
//                         <img src={img.url} />
//                     </div>
//                 </div>)}

//                 <div ref={endRef}></div>
//             </div>

//             <div className="bottom">

//                 <div className="icons">
//                     <label htmlFor='file'>
//                         <img src='./img.png' />
//                     </label>
//                     <input type='file' id='file' style={{ display: "none" }} onChange={handleImg} />
//                     <img src='./camera.png' onClick={openCamera} /> {/* Camera icon */}
//                     <img src='./mic.png' />
//                 </div>

//                 <input type='text' placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You can't send message" : "Type a message "} value={text} onChange={(e) => setText(e.target.value)}
//                     disabled={isCurrentUserBlocked || isReceiverBlocked}
//                 />

//                 <div className="emoji">
//                     <img src='./emoji.png' onClick={() => setOpen((prev) => !prev)} />
//                     <div className="picker">

//                         <EmojiPicker open={open} onEmojiClick={handleEmoji} />
//                     </div>
//                 </div>
//                 <button className='sendButton' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
//             </div>

//             {isCameraOpen && (
//                 <div className="camera">
//                     <video ref={videoRef} autoPlay style={{ width: "100%" }} />
//                     <button class="cam" onClick={capturePhoto}>Capture Photo</button>
//                     <button class="cam" onClick={closeCamera}>Close Camera</button>
//                 </div>
//             )}
//             <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480"></canvas>
//         </div>
//     )
// }

// export default Chat;
