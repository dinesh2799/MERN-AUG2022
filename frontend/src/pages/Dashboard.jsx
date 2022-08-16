import React from 'react'
import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// import Spinner from '../components/Spinner'
function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} =useSelector((state) => state.auth)
    // useEffect(()=>{

    //     if(isError){
    //         console.log(message)
    //     }

    //     if(user)
    //     {
    //         // dispatch(getPosts())
    //     }

    //     if(!user){
    //         navigate('/login')
    //     }

    //     // 
    //     return()=>{
    //         // dispatch(reset()
    //         // )
    //     }

    // },[user, navigate, isError, message, dispatch])

    // if(isLoading)
    // {
        // return <Spinner />
    // }

  return (
    <>
    <section className='heading'>
        <h1>Welcome {user && user.name} </h1>
        <Link to="/changePassword"> Change Password </Link>
    </section>
    
    
    </>
  )
}

export default Dashboard