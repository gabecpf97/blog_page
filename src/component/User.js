import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
    const id = useParams().id;
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/user/${id}/post_comment`);
            const data = await response.json();
            console.log(data);
        }
        fetchData();
    }, [id]);


    return (
        <div className="user_detail">

        </div>
    )
}

export default User;