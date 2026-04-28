import { useAppSelector } from "@/hooks/store.hooks"
import { RootState } from "@/store/store"
import axios from "axios";

export async function getPostComments(postId:string , token:string | null ) {
    try {
        const options = {
        url : `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10
`,
        method: "GET",
        headers:{
            AUTHORIZATION:`Bearer ${token}`
        }
    }
        const {data} = await axios.request(options);
        return data.data.comments

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}


