import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginDisplay, setLoginDisplay] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setLoginDisplay(false)
  }

  const addBlog = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
  
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlog({
          title: '',
          author: '',
          url: ''
        });
      })
      .catch(error => {
        // Handle error if necessary
        console.error('Error adding blog:', error);
      });
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  return (
    <div>
      {
        user ?
        <>
          <p>{user.name} is logged in <button onClick={handleLogout}>Logout</button> </p>
          <form onSubmit={addBlog}>
            <div className="">
              <label>Title: </label>
              <input type='text' name="title" value={newBlog.title} onChange={handleInputChange} placeholder='title' />
            </div>
            <div className="">
              <label>Author: </label>
              <input type='text' name="author" value={newBlog.author} onChange={handleInputChange} placeholder='author' />
            </div>
            <div className="">
              <label>URL: </label>
              <input type='text' name="url" value={newBlog.url} onChange={handleInputChange} placeholder='www.exampleblog.com' />
            </div>
            <button type='submit'>Save</button>
          </form>
        </> :
          <>
            {loginDisplay ? <Login username={username} user={user} password={password} setPassword={setPassword} setUser={setUser} setUsername={setUsername} handleLogout={handleLogout} /> : <button onClick={() => setLoginDisplay(true)}>login</button> }
          </>
          
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App