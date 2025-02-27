import { useState, useEffect} from "react";
import type Candidate from "../interfaces/Candidate.interface";
import UserTable from "../components/userTable";

const SavedCandidates = () => {
  const [users, updateUser] = useState<Candidate[] | []>([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("acceptedUsers") || "[]");
    updateUser(savedUsers);
  }, []);

  const declineUser = (id: number) => {
    const updatedUsers = users.filter((user: Candidate) => user.id !== id);
    alert(
      `The selected user has been declined`
    )
    updateUser(updatedUsers);

    //set local storage to have the updated page information
    localStorage.setItem('acceptedUsers', JSON.stringify(updatedUsers))
  }

  return (
    <>
      <h1>Potential Candidates</h1>

      <main>
        {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>

          <tbody>
             {users.map((user) => {
              console.log(user)
             return (
              <>
                <UserTable 
                key={user.id || Math.random()}
                declineUser={declineUser}
                {...user}
                />
              </>
             );
            })} 
          </tbody>
        </table>
        ) : (
          <p>No saved Canidates Found.</p>
        )}
      </main>
    </>
  );
};

export default SavedCandidates;
