import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import { getPostBySlug, formatDate, getAdjacentPosts } from '../../utils/blogUtils'
import './index.scss'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [letterClass, setLetterClass] = useState('text-animate')
  const [post, setPost] = useState(null)
  const [adjacentPosts, setAdjacentPosts] = useState({ prevPost: null, nextPost: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Enable scrolling for blog post pages
    document.body.classList.add('project-page-active')

    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.body.classList.remove('project-page-active')
    }
  }, [])

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true)
        const foundPost = await getPostBySlug(slug)

        if (!foundPost) {
          navigate('/blog')
          return
        }

        setPost(foundPost)

        // Load adjacent posts for navigation
        const adjacent = await getAdjacentPosts(slug)
        setAdjacentPosts(adjacent)
      } catch (error) {
        console.error('Error loading blog post:', error)
        navigate('/blog')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug, navigate])

  if (loading) {
    return <Loader />
  }

  if (!post) {
    return null
  }

  return (
    <>
      <div className='container blog-post-page project-detail-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={post.title.split('')}
              idx={15}
            />
          </h1>
          <div className='post-meta'>
            <span className='post-date'>{formatDate(post.date)}</span>
            {post.tags && post.tags.length > 0 && (
              <div className='post-tags'>
                {post.tags.map((tag, index) => (
                  <span key={index} className='post-tag'>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='project-content blog-post-content'>
          {post.featuredImage && (
            <div className='featured-image'>
              <img src={post.featuredImage} alt={post.title} />
            </div>
          )}

          <div className='markdown-content'>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        {/* Navigation between posts */}
        <div className='blog-post-navigation'>
          <Link to='/blog' className='back-to-blog'>
            ← Back to Blog
          </Link>
          <div className='adjacent-posts'>
            {adjacentPosts.prevPost && (
              <Link
                to={`/blog/${adjacentPosts.prevPost.slug}`}
                className='adjacent-post prev-post'
                onClick={() => window.scrollTo(0, 0)}
              >
                <span className='nav-label'>← Previous</span>
                <span className='nav-title'>{adjacentPosts.prevPost.title}</span>
              </Link>
            )}
            {adjacentPosts.nextPost && (
              <Link
                to={`/blog/${adjacentPosts.nextPost.slug}`}
                className='adjacent-post next-post'
                onClick={() => window.scrollTo(0, 0)}
              >
                <span className='nav-label'>Next →</span>
                <span className='nav-title'>{adjacentPosts.nextPost.title}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Loader />
    </>
  )
}

export default BlogPost
