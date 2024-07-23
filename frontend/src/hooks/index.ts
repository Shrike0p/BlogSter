import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";


export interface Blog{
    "id":string;
    "content":string;
    "title":string;
    "author":{
        "name":string
    }
}


export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
  
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
          .then(response => {
            console.log("Full response:", response);
            // Check if response.data.blog exists
            if (response.data && response.data.blog) {
              setBlog(response.data.blog);
            } else {
              console.error("Blog data is not available in the response.");
            }
            setLoading(false);
          })
          .catch(error => {
            console.error("There was an error fetching the blog:", error);
            setLoading(false);
          });
      }, [id]);
      
  
    return {
      loading,
      blog
    };
  };

export const useBlogs=()=>{
    const [loading, setLoading]=useState(true);
    const [blogs, setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                Authorization:localStorage.getItem("token")

            }
        })
        .then(response=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])

    return {
        loading, 
        blogs
    }
}