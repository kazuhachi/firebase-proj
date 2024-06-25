import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'
import { addDoc, collection, getDocs} from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react'
import { SinglePost } from '../component/SinglePost'

export interface PostList   {
    title: string,
    description: string,
    userId: string,
    username: string,
    id: string
}

export const Post = () => {

    

    const [postList, setpostList] = useState<PostList[] | null>(null);




    const postSchema = yup.object().shape({
        title: yup.string().required("Required!"),
        description : yup.string().required("Required")
    })

    const { register, handleSubmit, formState: {errors}}  = useForm({
        resolver : yupResolver(postSchema)
    })


    

    const postsRef = collection(db, "posts");
    const [user ] = useAuthState(auth);

    const handleFormSubmit = async (data:any) => {

        console.log(data);
        await addDoc(postsRef, {
            ...data,
            // or can be like below
            // title: data.title,
            // description: data.description,
            // userId : user?.uid,
            userId : user?.uid,
            username : user?.displayName,
        })



        fetchPostList();
    }

    const fetchPostList = async () => {
        const data = await getDocs(postsRef);
        setpostList(data.docs.map((doc, key) => ({
            ...doc.data(), id: doc.id
        })) as PostList[])
    }



    useEffect( () => {
        fetchPostList();
    }, [])


    return(
        <>  
            <div className="poss-section">
                <h1>Welcome to post!</h1>

                <form className="post-form" onSubmit={handleSubmit(handleFormSubmit)} >
                    <div className='input-item'>
                        <input type="text" {...register("title")}/>
                        {
                            errors.title && (
                                <p className='input-error'>
                                    {errors.title?.message}
                                </p>
                            )
                        }
                    
                    </div>

                    <div className='input-item'>
                        <input type="text" {...register("description")} />

                        {
                            errors.description && (
                                <p className='input-error'>
                                    {errors.description?.message}
                                </p>
                            )
                        }
                        
                    </div>
                    
                    <button >Submit</button>
                    
                </form>


                <div className="post-area">
                    {
                        postList?.map( (post, key) => (
                            <SinglePost post={post} key={key}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}