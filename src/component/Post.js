import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentPost from "./CommentPost";
import Comment from "./Comment";
import '../style/post.css';
import '../style/comment.css';
import PostModify from "./PostModify";

const Post = () => {
    const id = useParams().id;
    const [post_info, setPost_info] = useState();
    const [comments, setComments] = useState();
    const [loaded, setLoaded] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (post_info === undefined || added) {
            const fetchData = async () => {
                try {
                    const data = await Promise.all([
                        fetch(`https://my-blog-api-29.herokuapp.com/post/${id}`).then(response => response.json()),
                        fetch(`https://my-blog-api-29.herokuapp.com/post_comment/${id}`).then(response => response.json()),
                    ]);
                    setPost_info(data[0].thePost);
                    setComments(data[1].comment_list);
                    setLoaded(true);
                    setAdded(false);
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }
    }, [id, added, post_info]);

    const addComment = () => {
        setAdded(true);
    }

    return (
        <div className="post_page">
            {loaded &&
                <div className="post_div">
                    <div className="post_detail">
                        <h1>{post_info.title}</h1>
                        <div className="user_info">
                            <Link className="to_user" to={`/user/${post_info.user._id}`}>
                                <p>By: {post_info.user.username}</p>
                            </Link>
                            <p>
                                {DateTime.fromJSDate(new Date(`${post_info.date}`))
                                .toLocaleString(DateTime.DATETIME_FULL)}
                            </p>
                        </div>
                        <p className="post_msg">{post_info.message}</p>
                        {localStorage.user &&
                            (JSON.parse(localStorage.user)._id === post_info.user._id) &&
                            <PostModify Pid={post_info._id} refresh={addComment}/>
                        }
                    </div>
                    {localStorage.user && 
                        <CommentPost handleSumbit={addComment} postID={id}/>
                    }
                    <h2>Comment: </h2>
                    <Comment comments={comments} reload={addComment} />
                </div>
            }
        </div>
    )
}

export default Post;