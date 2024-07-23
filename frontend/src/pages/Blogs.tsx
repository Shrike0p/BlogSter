import { Appbar } from "../Components/Appbar"
import { BlogCards } from "../Components/BlogsCard"
import { BLogSklton } from "../Components/BlogsSkelton";
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading, blogs}=useBlogs();
    if(loading){
        return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div>
            <BLogSklton/>
            <BLogSklton/>
            <BLogSklton/>
            <BLogSklton/>
            </div>
        </div>
        </div>
    }
    return <div>
        <Appbar/>
        <div className="flex justify-center">
        <div >
            {blogs.map(blog=><BlogCards 
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd feb 2024"}
            />)}
            
        </div>
        </div>
    </div>
}

