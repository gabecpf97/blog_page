import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import PostList from "./PostList";

const User = () => {
    const id = useParams().id;
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();
    const [loaded, setLoaded] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (posts === undefined || reload) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/user/${id}/post_comment`);
                    const data = await response.json();
                    setPosts(data.post_list);
                    setComments(data.comment_list);
                    setLoaded(true);
                    setReload(false);
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }
    }, [id, reload, posts]);

    const onReload = () => {
        setReload(true);
    }

    return (
        <div>
            {loaded && 
                <div className="user_detail">
                    <h1>Post</h1>
                    <PostList posts={posts} />
                    <h1>Comment</h1>
                    <Comment comments={comments} reload={onReload} />
                </div>
            }
        </div>
    )
}

export default User;