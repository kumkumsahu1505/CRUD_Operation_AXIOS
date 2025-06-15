import React from 'react'
import { useEffect, useState } from 'react'
import { getPost } from './Component/AxiosFunction'
import { deletePost } from './Component/AxiosFunction'
// import {createPost} from './Component/AxiosFunction'
import { updatePost } from './Component/AxiosFunction'

function App() {

  const [post, setPost] = useState([])
  const [editId,setEditId]=useState({})
  const [formData,setFormData] =useState({
    title:"",
    body:""
  })
  const [isEditClick, setisEditClick] = useState(false)

  
  //delete post in axios
  const handleDelete = async (id) => {
    deletePost(id)
    const newData = post.filter(item => id != item.id)
    setPost(newData)
  }

//add post in axios
const handleSubmit =async(e)=>{
  e.preventDefault();
    //  const response = createPost(formData);
      const newPostData ={
         ...formData,
      id:post.length+1
    }
    setPost((pre)=>([...pre,newPostData]))
    setFormData({body:'',title:""})
}
const handleChange=(e)=>{
  e.preventDefault();
  const value = e.target.value;
  const name = e.target.name;
  setFormData((pre)=>({...pre,[name]:value}))
}

//update Post
const handleUpdatePost =async(item,e)=>{
e.preventDefault()
setisEditClick(true)
setEditId(item.id)
setFormData({
  title:item.title,
  body:item.body
})
}
const handleEdit=(e)=>{
e.preventDefault();
setisEditClick(false)
 if(!editId) return;
    else{
  const response = updatePost(formData)
  setPost(
    post.map(post=>(post.id===editId?{...post,...formData}:post))
  )
  setEditId(null)
  setFormData({title:"",body:""})
    }
    
}

//get post
  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPost();
      setPost(response.data);
    }
    fetchPost();
  }, [])

  return (
    <>
    <div className='bg-blue-950'>
      <form action=""  className='flex justify-center-safe gap-8 items-center pt-5' >
        <input
        className='bg-amber-200 p-2 border-2 border-green-500 text-black outline-none font-bold text-xl'
        type="text"
        name="title"
        value={formData.title} 
        onChange={(e)=>handleChange(e)}/>
        <input
        className='bg-amber-200 p-2 border-2 border-green-500 text-black outline-none font-bold text-xl' type="text" 
        name="body"
        value={formData.body} 
        onChange={handleChange} />

        {isEditClick? <button className='bg-amber-400 px-4 text-lg font-bold' onClick={handleEdit} >EDIT</button>
        : <button className='bg-amber-400 px-4 text-lg font-bold' onClick={handleSubmit}>ADD</button>
        }
      
      </form>
      <div className='flex flex-wrap bg-blue-950 justify-around items-center gap-6 p-6'>

      
        {post.map((item, id) => {
          return (
            <li key={id} type='none' className='min-h-[15rem] max-w-[15rem] text-white bg-teal-950 p-6'>
              <h3 className='text-pink-500'>{id + 1}</h3>
              <h1 className='text-green-300'><span className='text-2xl'>Title: </span>{item.title}</h1>
              <h2>{item.body}</h2>
              <div className='flex justify-around mt-4'>
                <button className='bg-amber-500 px-4 font-medium' onClick={(e)=>handleUpdatePost(item,e)}>EDIT</button>
                <button className='bg-amber-500 px-4 font-medium' onClick={() => handleDelete(item.id)}>DELETE</button>
              </div>
            </li>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default App