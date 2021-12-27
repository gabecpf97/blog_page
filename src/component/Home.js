import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import '../style/home.css';

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
            <ul className="post_list">
                {loaded && posts.map(post => {
                    const pretty_date = DateTime.fromJSDate(new Date(`${post.date}`))
                                        .toLocaleString(DateTime.DATETIME_FULL);
                    return(
                        <div className="post" key={post._id}>
                            <Link to={`/post/${post._id}`}>
                                <h1>{post.title}</h1>
                                <p>{post.message}</p>
                                <p>By: {post.user.username}</p>
                                <p>{pretty_date}</p>
                            </Link>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home;