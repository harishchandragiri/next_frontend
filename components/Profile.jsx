'use client'
import React from 'react'
import ProfileCard from './subComponents/ProfileCard'
import Transaction from './subComponents/transaction'

const Profile = () => {
  return (
    <div className=" md:h-[92vh]  md:flex justify-center items-center">
      {/* Left Section */}
      <div className="m-2 h-[750px] md:h-[85vh] w-auto md:w-1/3 bg-white p-3 border-2 rounded-sm shadow-md">
        <ProfileCard />
      </div>

      {/* Right Section */}
<div className="m-2 h-[750px] md:h-[85vh] w-auto md:w-2/3 bg-white p-5 border-2  rounded-sm shadow-md overflow-y-auto overflow-x-hidden">
  <Transaction />
</div>

    </div>
  )
}

export default Profile
