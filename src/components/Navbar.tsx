import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex justify-between p-5 max-w-7xl mx-auto'>
      <Link href='/'>
        <img
          src='/logo.png'
          alt='Readoo'
          className='w-24 object-contain cursor-pointer hover:scale-105 transition-apply'
        />
      </Link>
      <div className='flex items-center space-x-5'>
        <h3 onClick={() => alert('This feature is coming soon!')} className='text-white bg-indigo-700 px-4 py-1 rounded-full border border-indigo-700 cursor-pointer hover:scale-[1.03] transition-apply shadow-lg'>
          Sign In
        </h3>
        <h3 onClick={() => alert('This feature is coming soon!')} className='border px-4 py-1 rounded-full border-indigo-700 cursor-pointer hover:scale-[1.03] transition-apply shadow-md text-indigo-700'>
          Get Started
        </h3>
      </div>
    </nav>
  )
}
 
export default Navbar
