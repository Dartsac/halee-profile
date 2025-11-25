import matter from 'gray-matter';

/**
 * Fetch and parse all blog posts from the public/content/blog directory
 * @returns {Promise<Array>} Array of blog post objects with metadata and content
 */
export const getAllPosts = async () => {
  try {
    // Fetch the list of blog post files
    const response = await fetch('/content/blog/index.json');
    if (!response.ok) {
      console.warn('Blog index not found, returning empty array');
      return [];
    }

    const fileList = await response.json();

    // Fetch and parse each blog post
    const posts = await Promise.all(
      fileList.map(async (filename) => {
        const fileResponse = await fetch(`/content/blog/${filename}`);
        const fileContent = await fileResponse.text();

        // Parse frontmatter and content
        const { data, content } = matter(fileContent);

        // Generate slug from filename (remove .md extension and date prefix if present)
        const slug = filename.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          featuredImage: data.featuredImage || null,
          excerpt: data.excerpt || '',
          tags: data.tags || [],
          published: data.published !== false, // Default to true
          content,
          ...data
        };
      })
    );

    // Filter out unpublished posts and sort by date (newest first)
    return posts
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

/**
 * Get a single blog post by slug
 * @param {string} slug - The blog post slug
 * @returns {Promise<Object|null>} Blog post object or null if not found
 */
export const getPostBySlug = async (slug) => {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
};

/**
 * Get all unique tags from blog posts
 * @returns {Promise<Array>} Array of unique tag strings
 */
export const getAllTags = async () => {
  const posts = await getAllPosts();
  const tagSet = new Set();

  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });

  return Array.from(tagSet).sort();
};

/**
 * Filter posts by tag
 * @param {Array} posts - Array of blog posts
 * @param {string} tag - Tag to filter by
 * @returns {Array} Filtered posts
 */
export const filterPostsByTag = (posts, tag) => {
  if (!tag) return posts;
  return posts.filter(post =>
    post.tags && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

/**
 * Get adjacent posts (previous and next) for navigation
 * @param {string} currentSlug - Current post slug
 * @returns {Promise<Object>} Object with prevPost and nextPost
 */
export const getAdjacentPosts = async (currentSlug) => {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);

  return {
    prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  };
};

/**
 * Format date string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
