import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentPost from "./CommentPost";
import Comment from "./Comment";

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
                        fetch(`http://localhost:5000/post/${id}`).then(response => response.json()),
                        fetch(`http://localhost:5000/post_comment/${id}`).then(response => response.json()),
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
        <div className="post_detail">
            {loaded &&
                <div className="post_div">
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
                    <CommentPost handleSumbit={addComment} postID={id}/>
                    <Comment comments={comments} reload={addComment} />
                </div>
            }
        </div>
    )
}

export default Post;