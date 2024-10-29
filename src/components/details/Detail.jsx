import './detail.css'
import { auth } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { doc } from 'firebase/firestore';
import { db } from "../../lib/firebase"
import { useUserStore } from '../../lib/userStore';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';

const Detail = () => {

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();

    const { currentUser } = useUserStore();

    // const handleBlock = async () => {

    //     if (!user) return;

    //     const userDocRef = doc(db, "users", currentUser.id)

    //     try {
    //         await updateDoc(userDocRef, {
    //             blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
    //         });

    //         changeBlock();

    //     } catch (error) {
    //         console.log(error);

    //     }

    // }

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);



        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });

            console.log("Block status updated successfully");

            changeBlock(); // Make sure this triggers an update to your store

        } catch (error) {
            console.log("Error while blocking/unblocking: ", error);
        }
    }


    return (
        <div className='detail'>
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} />
                <h2>{user?.username}</h2>
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
                <button onClick={handleBlock}>{
                    isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked ? "user blocked" : "Block user"
                }
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