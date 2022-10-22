import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../sanity'
import { Post } from '../../typings'

interface Props {
  post: Post
}

const PostCard = ({ post }: Props) => (
  <Link href={`/post/${post.slug.current}`}>
    <div className='my-8 flex flex-col md:flex-row md:items-center md:space-x-14 p-4 max-w-7xl mx-auto border border-slate-700 bg-white rounded-xl group cursor-pointer hover:shadow-lg transition-apply overflow-hidden'>
      <Image
        src={urlFor(post.mainImage).url()}
        alt={post.title}
        width={1024}
        height={1024}
        objectFit='cover'
        className='group-hover:scale-105 transition-apply blur-[1px] group-hover:blur-0 rounded-lg'
      />
      <div>
        <div>
          <p className='text-lg font-bold py-3'>{post.title}</p>
          <p className='font-light'>{post.description}</p>
          <p className='text-sm text-slate-500 pt-5 pb-3'>by {post.author.name}</p>
        </div>
        <div>
          <img
            src={urlFor(post.author.image).url()}
            alt={post.author.name}
            className='rounded-full h-14 w-14'
          />
        </div>
      </div>
    </div>
    
  </Link>
)
 
export default PostCard
