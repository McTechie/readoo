import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { sanityClient, urlFor } from '../../../sanity'
import { Post } from '../../../typings'
import { Navbar } from '../../components'
import PortableText from 'react-portable-text'

interface Props {
  post: Post
}

const Post = ({ post }: Props) => {
  console.log(post)

  return (
    <div>
      <Navbar />
      
      <main className='max-w-7xl mx-auto'>
        <div className='flex justify-center items-center relative group'>
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            width={1280}
            height={400}
            objectFit='cover'
          />

          <div className='absolute w-full h-full bg-black opacity-20 group-hover:opacity-50 tansition-all duration-700 ease-in-out' />

          <div className='absolute top-0 right-0 hidden group-hover:block tansition-all duration-700 ease-in-out text-white p-4'>
            <p>{post.title}</p>
            <p className='text-sm'>by {post.author.name}</p>
          </div>
        </div>

        <article className='max-w-5xl mx-auto p-5 mt-10'>
          <h1 className='text-4xl mb-3'>{post.title}</h1>
          <h3 className='font-light text-slate-500 mb-5'>{post.description}</h3>

          <div className='flex items-center space-x-2'>
            <Image
              src={urlFor(post.author.image).url()}
              alt={post.author.name}
              width={50}
              height={50}
              className='rounded-full'
            />

            <p className='text-sm font-extralight'>
              Blog post by <span className='font-normal'>{post.author.name}</span> | Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>

          <div className='mt-10 text-justify'>
            <PortableText
              className=''
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h2 className='text-3xl font-bold my-5' {...props} />
                ),
                h2: (props: any) => (
                  <h3 className='text-2xl font-bold my-5' {...props} />
                ),
                li: ({ children }: any) => (
                  <li className='ml-4 list-disc'>{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className='text-indigo-500 hover:underline'>
                    {children}
                  </a>
                )
              }}
            />
          </div>
        </article>

        <hr className='max-w-4xl my-10 mx-auto border-2 border-slate-400' />
      </main>
    </div>
  )
}
 
export default Post

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == 'post' && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug,
      body
    }
  `

  const post = await sanityClient.fetch(query, { slug: params?.slug })

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    },
    revalidate: 86400
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
    *[_type == 'post'] {
      _id,
      slug {
        current
      }
    }
  `

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}
