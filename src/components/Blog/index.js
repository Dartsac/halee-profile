import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from '../Loader'
import BlogCard from './BlogCard'
import { getAllPosts, getAllTags, filterPostsByTag } from '../../utils/blogUtils'
import './index.scss'

const Blog = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts()
        const allTags = await getAllTags()
        setPosts(allPosts)
        setFilteredPosts(allPosts)
        setTags(allTags)
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      setFilteredPosts(filterPostsByTag(posts, selectedTag))
    } else {
      setFilteredPosts(posts)
    }
  }, [selectedTag, posts])

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null) // Deselect if clicking the same tag
    } else {
      setSelectedTag(tag)
    }
  }

  return (
    <>
      <div className='container blog-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['B', 'l', 'o', 'g']}
              idx={15}
            />
          </h1>
          <p>
            Welcome to my personal blog! Here I share my thoughts on books, movies, TV shows, and everything in between.
          </p>

          {/* Tag Filter */}
          {tags.length > 0 && (
            <div className='tag-filter'>
              <button
                className={`tag-btn ${!selectedTag ? 'active' : ''}`}
                onClick={() => setSelectedTag(null)}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className='loading-message'>Loading posts...</div>
        ) : filteredPosts.length > 0 ? (
          <div className='blog-grid'>
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className='no-posts-message'>
            {selectedTag
              ? `No posts found with tag "${selectedTag}"`
              : 'No blog posts yet. Check back soon!'}
          </div>
        )}
      </div>

      <Loader />
    </>
  )
}

export default Blog
