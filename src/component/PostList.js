import React from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {

    return (
        <ul className="post_list">
            {posts.map(post => {
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

    )
}

export default PostList;