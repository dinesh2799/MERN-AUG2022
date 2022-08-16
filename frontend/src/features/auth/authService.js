import axios from "axios"
const API_URL ='/api/users/'

const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
}

const changePassword = async (token,userData) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + 'change', userData, config)
  
    // if (response.data) {
    //   localStorage.setItem('user', JSON.stringify(response.data))
    // }
  
    return response.data
}




const getUser = async(token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'user' , config)
    return response.data
}



const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,logout,login,getUser,changePassword
}

export default authService