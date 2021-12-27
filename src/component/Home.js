import React, { useEffect, useState } from "react";
import '../style/home.css';
import PostList from "./PostList";

const Home  = () => {
    const [posts, setPosts] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://my-blog-api-29.herokuapp.com/', {mode: 'cors'});
            const all_post = await response.json();
            setPosts(all_post.post_list);
            setLoaded(true);
        }

        fetchPosts().catch(() => {
            console.log('fail fetching');
        });
    }, []);

    return(
        <div className="home">
            {loaded && <PostList posts={posts} from="home" />}
        </div>
    )
}

export default Home;