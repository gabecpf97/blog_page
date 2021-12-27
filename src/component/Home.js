import React, { useEffect, useState } from "react";
import '../style/home.css';
import PostList from "./PostList";

const Home  = () => {
    const [posts, setPosts] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:5000/', {mode: 'cors'});
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