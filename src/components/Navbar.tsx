import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex justify-between text-slate-700 p-5 max-w-7xl mx-auto'>
      <Link href='/'>
        <img
          src='/logo.png'
          alt='Readoo'
          className='w-24 object-contain cursor-pointer hover:scale-105 transition-apply'
        />
      </Link>
      <div className='flex items-center space-x-5'>
        <h3 className='text-white bg-slate-700 px-4 py-1 rounded-full border border-slate-700 cursor-pointer hover:scale-[1.03] transition-apply shadow-lg'>
          Sign In
        </h3>
        <h3 className='border px-4 py-1 rounded-full border-slate-700 cursor-pointer hover:scale-[1.03] transition-apply shadow-md'>
          Get Started
        </h3>
      </div>
    </nav>
  )
}
 
export default Navbar
