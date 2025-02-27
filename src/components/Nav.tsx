import { Link } from 'react-router-dom'
import '../index.css'

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>

      {/* using the link function it is possible to route to other pages*/}
      <nav className='nav'>
        <Link to ="/" className='nav-link'>Home</Link>
        <Link to ="/SavedCandidates" className='nav-link'>Saved Candidates</Link>
      </nav>
    </div>
  )
};

export default Nav;
