import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const Account = () => {
    const [id] = useParams();
    const [user, setUser] = useState();
    const [comments, setComments] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {   
                const data = await Promise.all([
                    fetch('user_url').then(response => response.json()),
                    fetch('comment_url').then(response => response.json()),
                ]);
                setUser(data[0]);
                setComments(data[1]);
                setLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="account">
            {loaded && 
                <div className="info">
                    <h1>username</h1>
                    <Comment comments={comments} />
                </div>                    
            }
        </div>
    )
}

export default Account;