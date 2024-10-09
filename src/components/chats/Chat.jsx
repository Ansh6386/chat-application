import { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from "emoji-picker-react"

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, []);



    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
        setOpen(false);

    }
    console.log(text);

    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" />
                    <div className="texts">
                        <span>Ansh</span>
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

                <div className="message">
                    <img src='./avatar.png' />
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ducimus, fugit quidem repellendus nulla reiciendis rerum at repellat cupiditate nesciunt?
                        </p>
                        <span>1min ago</span>
                    </div>
                </div>

                <div ref={endRef}></div>

                <div className="message own">
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ducimus, fugit quidem repellendus nulla reiciendis rerum at repellat cupiditate nesciunt?
                        </p>
                        <span>1min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src='./avatar.png' />
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ducimus, fugit quidem repellendus nulla reiciendis rerum at repellat cupiditate nesciunt?
                        </p>
                        <span>1min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ducimus, fugit quidem repellendus nulla reiciendis rerum at repellat cupiditate nesciunt?
                        </p>
                        <span>1min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src='./avatar.png' />
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ducimus, fugit quidem repellendus nulla reiciendis rerum at repellat cupiditate nesciunt?
                        </p>
                        <span>1min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">

                        <img src='https://images.pexels.com/photos/259698/pexels-photo-259698.jpeg?auto=compress&cs=tinysrgb&w=400' />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ducimus, fugit quidem repellendus nulla reiciendis rerum at repellat cupiditate nesciunt?
                        </p>
                        <span>1min ago</span>
                    </div>
                </div>

            </div>


            <div className="bottom">

                <div className="icons">
                    <img src='./img.png' />
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
                <button className='sendButton'>Send</button>
            </div>
        </div>
    )
}

export default Chat;