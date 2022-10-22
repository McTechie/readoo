import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'
import { sanityClient, urlFor } from '../../../sanity'
import { Comment, Post } from '../../../typings'
import { Navbar } from '../../components'
import PortableText from 'react-portable-text'
import axios from 'axios'

interface Props {
  post: Post
}

interface CommentFormInput {
  _id: string,
  name: string,
  email: string,
  comment: string
}

const Post = ({ post }: Props) => {
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormInput>()
  
  const submitData:SubmitHandler<CommentFormInput> = async (data) => {
    const res = await axios.post('/api/createComment', data)
    
    if (res.status === 200) {
      setCommentSubmitted(true)
      reset()
    }
  }

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
          <h3 className='italic mb-5 text-indigo-400'>{post.description}</h3>

          <div className='flex items-center space-x-2'>
            <Image
              src={urlFor(post.author.image).url()}
              alt={post.author.name}
              width={50}
              height={50}
              className='rounded-full'
            />

            <p className='text-sm font-extralight'>
              Blog post by <span className='font-bold text-indigo-400'>{post.author.name}</span> | Published at {new Date(post._createdAt).toLocaleString()}
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

        <hr className='max-w-4xl mt-20 mx-auto border-2 border-indigo-400' />

        <section>
        <div className='my-20 p-5 md:p-0 max-w-lg mx-auto flex flex-col space-y-5 text-slate-700'>
          <h3 className='text-3xl font-bold'>Comments</h3>
          <hr className='py-3' />

          {post.comments.length === 0 && (
            <p className='text-slate-500'>No comments yet. Be the first to comment!</p>
          )}

          {post.comments.map((comment: Comment) => (
            <div key={comment._id} className='flex flex-col space-y-2 shadow border p-4'>
              <p className='text-sm text-slate-500'>{comment.comment}</p>
              
              <div className='flex items-center space-x-2'>
                <p className='text-sm font-extralight'>
                  ~ Comment by <span className='font-bold text-indigo-400'>{comment.name}</span> | Published at {new Date(comment._createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

        {commentSubmitted ? (
          <div className='my-20 p-5 md:p-0 max-w-lg mx-auto flex flex-col space-y-5 text-slate-700'>
            <div className='flex flex-col space-y-1 text-center'>
              <h3 className='text-indigo-400 font-bold pb-4 text-3xl'>Thank you for submitting!</h3>
              <p className='text-slate-500'>Your comment will appear below once it has been approved xD</p>
              <p className='text-slate-500'>In case you&apos;re wondering, we use <b>Sanity Mutations</b> for comments ;D</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitData)} className='my-20 p-5 md:p-0 max-w-lg mx-auto flex flex-col space-y-5 text-slate-700'>
            <div className='flex flex-col space-y-2'>
              <h3 className='text-indigo-400 font-bold pb-2'>Enjoyed this article?</h3>
              <h4 className='text-3xl font-bold'>Join in the conversation above</h4>
              <hr className='py-3' />
            </div>

            <input
              type='hidden'
              {...register('_id')}
              value={post._id}
            />
            
            <div className='flex flex-col'>
              <label htmlFor='name' className='flex justify-between pl-2 py-2'>
                <span>Name</span> {errors.name && (
                <span className='mt-2 text-sm text-rose-400'>Ayy Ay Amigo! Who are you? xD</span>
              )}
              </label>
              <input
                type='text'
                placeholder='Your Name'
                className='w-full text-sm text-indigo-500 shadow border border-slate-200 p-2'
                {...register('name', { required: true })}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='flex justify-between pl-2 py-2'>
                <span>Email</span> {errors.email && (
                <span className='mt-2 text-sm text-rose-400'>Ahh Amigo! Where do we find you? xD</span>
              )}
              </label>
              <input
                type='email'
                placeholder='Your Email'
                className='w-full text-sm text-indigo-500 shadow border border-slate-200 p-2'
                {...register('email', { required: true })}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='comment' className='flex justify-between pl-2 py-2'>
                <span>Comment</span> {errors.comment && (
                <span className='mt-2 text-sm text-rose-400'>Mi Amigo! Say something first?! xD</span>
              )}
              </label>
              <textarea
                placeholder='Your Comment'
                rows={5}
                className='w-full text-sm text-indigo-500 shadow border border-slate-200 p-2 mb-10'
                {...register('comment', { required: true })}
              />
            </div>

            <input
              type='submit'
              value='Submit'
              className='w-full shadow border p-3 bg-indigo-400 text-white font-bold cursor-pointer hover:bg-indigo-500'
            />
          </form>
        )}
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
      'comments': *[_type == 'comment' && post._ref == ^._id && approved == true],
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
