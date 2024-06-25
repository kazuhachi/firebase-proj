import { useEffect, useState } from "react";
import { PostList as IPost } from "../pages/Post"
import { addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props   {
    post : IPost;
}

interface Reactions {
    userId: string,
    postId : string,
    reactionType: number
}



export const SinglePost = (prop:Props) => {

    const { post }  = prop;
    const [user] = useAuthState(auth);

    const [reactionType, setReactionType] = useState<number | null>(null);


    const reactionRef = collection(db, "reactions");
    const reactionDoc = query(
        reactionRef, 
        where("userId", "==", user?.uid),
        where("postId", "==", post.id)
    );




    const reactionBtnHandler = async (reactionType:number) => {

        const existingReaction:any = await getDocs(reactionDoc);
        const fetchedReaction = existingReaction.docs[0]?.data().reactionType;
        try{

            console.log(existingReaction.docs[0].ref);
        }catch(e){
            console.log(e)
        }

        if (fetchedReaction){
            if (fetchedReaction !==  reactionType){

                // updates the reactionType 
                updateDoc(
                    existingReaction.docs[0].ref, {reactionType: reactionType}
                )
            }else{
                // delete post if want to remove reaction
                updateDoc(
                    // set -1 to make it no reactions
                    existingReaction.docs[0].ref, {reactionType: -1}
                )
            }
        }else{
            await addDoc(reactionRef, {
                userId: user?.uid,
                postId: post.id,
                reactionType: reactionType
            })
        }

        fetchReaction();
    }

    const fetchReaction = async () => {
        const ifHasReacted = false;


        const reactionData:any = await getDocs(reactionDoc);

        // console.log(reactionData.docs[0]?.data())
        setReactionType(reactionData.docs[0]?.data().reactionType)
        // setReactionType(reactionData)
    }



    useEffect( ()=> {
        fetchReaction();
    }, [])

    return(
        <div className="post-item">
            <h1>{post.title}</h1>
            <p>
                { post.description }
            </p>

            <p>Author: <b>{post.username}</b></p>

            <div className="reaction-cont">
                <button 
                    className={`reaction-btn ${reactionType === 1 ? 'reacted': ''}`}
                    onClick={() => {reactionBtnHandler(1)} }>
                    <span>
                        🩷
                    </span>
                </button>
                <button 
                    className={`reaction-btn ${reactionType === 2 ? 'reacted': ''}`}
                    onClick={() => {reactionBtnHandler(2)} }>
                    <span>
                        😮
                    </span>
                </button>
                <button 
                    className={`reaction-btn ${reactionType === 3 ? 'reacted': ''}`}
                    onClick={() => {reactionBtnHandler(3)} }>
                    <span>
                        👍
                    </span>
                </button>
            </div>
        </div>
    )
}