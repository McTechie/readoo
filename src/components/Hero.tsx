import Image from 'next/image'

const Hero = () => {
  return (
    <header className='bg-white border-y border-slate-700 py-20'>
      <div className='px-5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between'>
        <div className='space-y-8 mb-10'>
          <h1 className='text-5xl md:text-6xl max-w-xl font-serif'>
            <span className='leading-tight'><span className='underline underline-offset-4 decoration-indigo-600 decoration-wavy decoration-4'>Readoo</span> enhances reading, writing and experiencing blogs</span>
          </h1>
          <h2 className='text-indigo-600 leading-relaxed'>
            It&apos;s free to use, tons of GIFs, built for developers and above all,<br />Legen.... wait for it.... dary too?!
          </h2>
        </div>

        <div className='hidden md:block md:ml-52'>
          <Image priority={true} src='/hero.png' alt='Readoo' width={520} height={400} />
        </div>
      </div>
    </header>
  )
}
 
export default Hero
