import React from 'react'
import axios from 'axios'
const axiosInstance = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" })

//get Data from axios 
export const getPost = async () => {
  try {
    const response = await axiosInstance.get('/posts')
    return response;
  }
  catch (err) {
    console.log(err)
  }
}

//create post in axios
export const createPost = async(createdData)=>{
  try{
  const response = await axiosInstance.post('https://jsonplaceholder.typicode.com/posts',createdData)
  return response;
  }
  catch(err){
    console.log(err)
  }
}

//update post in axios
export const updatePost=async (item)=>{
  try{
   const response = axiosInstance.patch(`/posts/${item.id}`,item)
  }
  catch(err){
    console.log(err)
  }
}

//axios to delete data
export const deletePost = async (id) => {
  try {
  await axiosInstance.delete(`/posts/${id}`)
  }
  catch (err) {
    console.log(err)
  }
}

function AxiosFunction() {
  return (
    <>
    </>
  )
}

export default AxiosFunction