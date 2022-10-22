import type { NextPage } from 'next'
import Head from 'next/head'
import { Hero, Navbar, Posts } from '../components'
import { sanityClient } from '../../sanity'
import { Post } from '../../typings'
import { useEffect, useState } from 'react'

interface Props {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPosts(false)
    }, 1000)
  }, [])

  return (
    <div>
      <Head>
        <title>Readoo by McTechie</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      
      <Navbar />

      <main className='bg-slate-100'>
        <Hero />

        {isLoadingPosts ? (
          <div className='h-screen'>
            <div className='dot-loader' />
          </div>
        ) : (
          <Posts posts={posts} />
        )}
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
    *[_type == 'post'] {
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
    }
  `

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}

export default Home
