'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProfileCard from './subComponents/ProfileCard'
import Transaction from './subComponents/transaction'

const Profile = () => {

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // Fetch logged-in user
  //       const res = await axios.get('http://localhost:1337/api/users?populate=*'
  //         , {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
  //         },
  //       }
  //     )
  //       setUser(res.data)
  //     } catch (err) {
  //       setError('Failed to fetch profile')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchUser()
  // }, [])


  return (
<div className="p-3 min-lg:h-[92vh] w-full lg:flex lg:items-center lg:justify-between bg-gray-200">
  {/* Left Section */}
  <div className=" h-[750px] lg:h-[85vh] lg:w-[30vw] bg-white lg:m-3 mx-2 mt-3 mb-4 p-3 rounded-sm shadow-md">
    <ProfileCard/>
  </div>

  {/* Right Section */}
  <div className="min-h-[600px] md:h-[85vh] lg:w-[70vw] md:overflow-y-auto bg-white lg:m-3 mx-2 mt-4 mb-3 p-5 rounded-sm shadow-md">
      <div className="w-full">
      <Transaction/>
    </div>
  </div>
</div>

  )
}

export default Profile
