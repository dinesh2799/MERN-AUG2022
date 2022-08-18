import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changePassword, reset } from '../features/auth/authSlice'


const ChangePassword = () => {

    const [formData, setFormData] = useState({
        oldPassword : '',
        newPassword : ''
    })
    const {oldPassword, newPassword} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )

    const email=user.email
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      if (isSuccess ) {
        navigate('/')
      }
  
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
  
    const onChange= (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            oldPassword,
            newPassword,
          }

          console.log(userData)
      
          dispatch(changePassword(userData))
    }

    if (isLoading) {
        // return <Spinner />
      }

  return (
    <>
        <section className='heading'> 
            <h1>
                Change Password
            </h1>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="password" className="form-control" id="email" name="oldPassword" value={oldPassword} placeholder="Enter Old Password" onChange={onChange}/>
                    <input type="password" className="form-control" id="password" name="newPassword" value={newPassword} placeholder="Enter New password" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <button className='btn btn-block' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default ChangePassword