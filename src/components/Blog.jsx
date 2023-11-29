const Blog = ({ blog }) => (
  <div style={{border: '1px solid black', borderRadius: '5px', width: '45%', margin: '10px', padding: '10px'}}>
    <p>Title: {blog.title} </p>
    <p>Author: {blog.author}</p>
    <p>Url: <a href="">{blog.url}</a></p>
    <p>Likes: {blog.likes}</p>
  </div>  
)

export default Blog