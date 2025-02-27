import type Candidate from "../interfaces/Candidate.interface";
import '../index.css'

const UserTable = (props: Candidate) => {
    return (
        <>
            <tr>
                <td><img src={props.avatar_url} width="100" height="100"></img></td>
                <td><h3>{props.name || "No name Added."}, {props.login}</h3></td>
                <td><p>{props.location || "No Location Added."}</p></td>
                <td><a>{props.email || "No Email Added."}</a></td>
                <td><p>{props.company || "No Company Added."}</p></td>
                <td><p>{props.bio || "No bio Added."}</p></td>
                <td><button onClick={() => (props.declineUser ? props.declineUser(props.id) : {})}>Reject</button></td>
            </tr>
        </>
    )
}

export default UserTable;