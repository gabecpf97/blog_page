import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Post = () => {
    const id = useParams().id;
    const [post_info, setPost_info] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`http://localhost:5000/post/${id}`, {mode: 'cors'});
            const post_detail = await response.json();
            setPost_info(post_detail.thePost);
            setLoaded(true);
        };

        fetchData().catch((err) => {
            console.log(err);
        })
    }, [id]);

    return (
        <div className="post_detail">
            {loaded &&
                <div className="post">
                        <h1>{post_info.title}</h1>
                        <Link to={`/user/${post_info.user._id}`}>
                            <h2>{post_info.user.username}</h2>
                        </Link>
                        <p>
                            {DateTime.fromJSDate(new Date(`${post_info.date}`))
                            .toLocaleString(DateTime.DATETIME_FULL)}
                        </p>
                        <p>{post_info.message}</p>
                </div>
            }
        </div>
    )
}

export default Post;