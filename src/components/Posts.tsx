import { Post } from '../../typings'
import PostCard from './PostCard'

interface Props {
  posts: Post[]
}

const Posts = ({ posts }: Props) => {
  return (
    <section className='max-w-7xl mx-auto text-slate-700 p-10'>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>    
  )
}

export default Posts
