import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [username, setUsername] = useState([])
  
  const [error, setError] = useState("")
  const [userdata, setUserdata] = useState("") 
  const [input, setInput] = useState("") 
  
    const inputValue = (e) => {
    setUsername(e.target.value);
  }
  


  const githubData = async() => {
    if(!username) {
      return ;
    }
    setError(null)

    try{
      let fetchData = await axios.get(`https://api.github.com/users/${username}`)
      setUserdata(fetchData.data)
    }catch (err){
       setError('user not found')
    }
  };

  const handleDefultSubmit = (e) => {
    e.preventDefault();
  
  }

  
  return (
    <>
     <div id='main'>
      <div id='wraper'>
        <h1 id='heading'>GitHub Profile</h1>
        <form onSubmit={handleDefultSubmit}>
          <input 
           value={username} 
           type='text'
           onChange={inputValue}
           placeholder='Enter GitHub Userame' required>
                         
          </input>
          <button onClick={githubData}>Search</button>
        </form>

        {/* Error message */}
      {error && <p>{error}</p>}

{/* Display user data if available */}
{userdata && (

        <div id='manu'>
          <img src={userdata.avatar_url} alt='Avatar' />

          <div id='text'>
            <h3 id='name'>Name : {userdata.name}</h3>
            <h3 id='name'>followers : {userdata.followers}</h3>
            <h3 id='name'>following : {userdata.following}</h3>
            <h3  id='name'>Repos : {userdata.public_repos}</h3>
          </div>
        </div>
)}  
      </div>
     </div>

     <div>{input}</div>

     </>

  )
  
}

export default App
