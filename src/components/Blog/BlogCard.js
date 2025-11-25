import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/blogUtils'

const BlogCard = ({ post }) => {
  return (
    <Link
      className='blog-card'
      to={`/blog/${post.slug}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      {post.featuredImage && (
        <div className='blog-card-image'>
          <img src={post.featuredImage} alt={post.title} />
        </div>
      )}
      <div className='blog-card-content'>
        <div className='blog-card-meta'>
          <span className='blog-card-date'>{formatDate(post.date)}</span>
          {post.tags && post.tags.length > 0 && (
            <div className='blog-card-tags'>
              {post.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className='blog-card-tag'>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <h2 className='blog-card-title'>{post.title}</h2>
        {post.excerpt && <p className='blog-card-excerpt'>{post.excerpt}</p>}
        <div className='read-more'>
          <span>Read More</span>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M18 6.5L6 18.5' stroke='currentColor'></path>
            <path d='M8 6.5H18V16.5' stroke='currentColor'></path>
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
