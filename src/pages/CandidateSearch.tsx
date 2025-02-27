import { useState, useEffect} from 'react';
import { searchGithub, searchGithubUser} from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';
import UserCard from '../components/userCard';

const clearStorage = () => {
  //clear the local storage
  localStorage.clear()
  console.log("Local Storage Has been Cleared!")
}

//filter users that do not have certain information. Like 
// const filterUser = (users: {}) => {
  
// }

const CandidateSearch = () => {
  const [users, updateUser] = useState<Candidate[]>([]);

  useEffect(() => {
    //first search through the github data. This returns back an array of users with incomplete information
    searchGithub().then( async (userData) => {

      //Map out the data from the github search so that each user can have informaition added to them
      const detailedUserPromises = userData.map((user: Candidate) => 
        //use the login provided by each user to grab additional information 
        searchGithubUser(user.login).then((userDetails) => ({
          //spread out the original user data, then spread out the new user data
          ...user,
          ...userDetails
        }))
      );

      //Promise all takes all the individual promises from detailedUserPromises and removes all promise information. Returning back just the objects
      const detailedUsers = await Promise.all(detailedUserPromises);

      //filter all users that do not have certain fields of information. 
      // const filteredUsers = filterUser(detailedUsers)

      //We then send the parsed information to the updateUser function to have the page be updated
      updateUser(detailedUsers);
    });
  }, []);
  
  
  //function for accepting a user. Run when the accept user button is clicked.
  const acceptUser = (id: number) => {
    //send the current user to the accepted array and set the next user
    const acceptedUser = users.find((user: Candidate) => user.id === id);

    if (acceptedUser){
      //grab the local storage
      const savedUsers = JSON.parse(localStorage.getItem('acceptedUsers') || "[]")
      //push the accepted user and push it to the savedUsers array
      const updatedAcceptedUsers  = [...savedUsers, acceptedUser]

      console.log("accepted Users:", updatedAcceptedUsers)
      //set the local storage with the updated information
      localStorage.setItem('acceptedUsers', JSON.stringify(updatedAcceptedUsers))

      //remove the user from the page
      const updatedUsers = users.filter((user: Candidate) => user.id !== id);
      alert(
        `User ${acceptUser.name} has been accepted!`
      )
      updateUser(updatedUsers);
    }
  }

  // the function for declining a user.
  const declineUser = (id: number) => {
    const updatedUsers = users.filter((user: Candidate) => user.id !== id);

    updateUser(updatedUsers);
  }

  

  return (
    <div className='mainPage'>
      
      <header>
        <h1>Candidate Search</h1>
      </header>

      <main>
        {users.map((user) => (
            <UserCard 
            key={user.id}
            acceptUser={acceptUser}
            declineUser={declineUser}
            {...user}
            />
        ))}

        <button onClick={() => clearStorage()}>
          Clear Local Storage
        </button>
      </main>
      
    </div>
  );
};



export default CandidateSearch;
 