import type Candidate from "../interfaces/Candidate.interface";
import '../index.css';

// the user card in which all the user information will be put on
const UserCard = (props: Candidate) => {
    return (
        <>
            <div className="userCard">
                <div className="imgContainer">
                <img src={props.avatar_url} width='200' height='200'></img>
                </div>

                <div className="userInfo">
                    {props.login ? <h2>{props.login}</h2> : ""}
                    {props.name ? <h2>{props.name}</h2> : ""}
                    {props.location ? <p>{props.location}</p> : ''}
                    {props.email ? <label>Email: <a>{props.email}</a></label> : ""}
                    {props.company ? <p>Company: {props.company}</p> : ''}
                    {props.bio ? <p>Bio: {props.bio || "No bio Added"}</p> : ''}
                </div>

                <div className="userButtons">
                    <button onClick={() => (props.acceptUser ? props.acceptUser(props.id) : {})}>
                        Accept User
                    </button>

                    <button onClick={() => (props.declineUser ? props.declineUser(props.id) : {})}>
                        Decline User
                    </button>
                </div>
            </div>
        </>
    )
}



export default UserCard;