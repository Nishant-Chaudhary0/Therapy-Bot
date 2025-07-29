import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between px-8 py-4 bg-blue-700'>
      <h1 className='text-white font-bold text-xl'>HealBot</h1>
      <div className='flex justify-between gap-10'>
        <h1 className='text-white font-bold text-xl'>SignUp</h1>
        <h1 className='text-white font-bold text-xl'>Home</h1>
      </div>
    </div>
  )
}

export default Navbar
