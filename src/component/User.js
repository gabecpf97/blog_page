import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "./Comment";
import PostList from "./PostList";

const User = ({ myId }) => {
    const id = useParams().id || myId;
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();
    const [loaded, setLoaded] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (posts === undefined || reload) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://my-blog-api-29.herokuapp.com/user/${id}/post_comment`);
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
                    <PostList posts={posts} reload={onReload} />
                    {myId && 
                        <Link className="page" to="/blog_page/post/create">create post</Link>
                    }
                    <h1>Comment</h1>
                    <Comment comments={comments} reload={onReload} />
                </div>
            }
        </div>
    )
}

export default User;