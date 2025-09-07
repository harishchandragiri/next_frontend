import Cart from '@/components/Cart'
import React from 'react'

const page = () => {
  return (
    <div className=' lg:m-3 lg:mx-5 lg:px-3'>
      <h2 className='font-semibold text-3xl my-2 px-3 lg:px-0'>Products</h2>
      <hr className="my-1  border-gray-300" />
      <Cart/>
    </div>
  )
}

export default page