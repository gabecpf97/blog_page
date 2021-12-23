import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home  = () => {
    const [posts, setPosts] = useState();

    useEffect(() => {
        const fetchPosts = async () => {
            const option = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const all_post = await fetch(process.env.POSTS_URL, option);
            setPosts(all_post);
        }

        fetchPosts().catch(() => {
            console.log('fail fetching');
        });
    }, []);

    return(
        <div className="home">
            
        </div>
    )
}

export default Home;