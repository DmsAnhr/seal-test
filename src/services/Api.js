const BASE_URL = 'https://api-berita-indonesia.vercel.app/cnn';
const apiUrls = [
  { url: 'terbaru', category: 'terbaru' },
  { url: 'nasional', category: 'nasional' },
  { url: 'internasional', category: 'internasional' },
  { url: 'ekonomi', category: 'ekonomi' },
  { url: 'olahraga', category: 'olahraga' },
  { url: 'teknologi', category: 'teknologi' },
  { url: 'hiburan', category: 'hiburan' },
  { url: 'gayaHidup', category: 'gayaHidup' }
];

export const getNewscategory  = async (categories) => {
  try {
    const response = await fetch(`${BASE_URL}/${categories}`);
    const data = await response.json();
    const postsWithCategory = data.data.posts.map(post => ({ ...post, category: categories }));
    return postsWithCategory;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getNewsDetail = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/${category}`);
    const data = await response.json();
    const postsWithCategory = data.data.posts.map(post => ({ ...post, category }));
    return postsWithCategory;
  } catch (error) {
    console.error('Error fetching data by category:', error);
    throw error;
  }
};

export const getPopularNews = async () => {
  const filteredApiUrls = apiUrls.filter(({ url }) => url !== 'terbaru');
  try {
    const responses = await Promise.all(
      filteredApiUrls.map(async ({ url, category }) => {
        const response = await fetch(`${BASE_URL}/${url}`);
        const data = await response.json();
        return data.data.posts.map(post => ({ ...post, category }));
      })
    );
    const allPosts = responses.flat();
    if (allPosts.length === 0) return [];

    allPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const uniqueLinks = new Set();
    const randomPosts = [];
    
    const topPosts = allPosts.slice(0, 8);
    
    while (randomPosts.length < 3 && topPosts.length > 0) {
      const randomIndex = Math.floor(Math.random() * topPosts.length);
      const selectedPost = topPosts[randomIndex];
      
      if (!uniqueLinks.has(selectedPost.link)) {
        randomPosts.push(selectedPost);
        uniqueLinks.add(selectedPost.link);
      }
      
      topPosts.splice(randomIndex, 1);
    }

    return randomPosts;
  } catch (error) {
    console.error('Error fetching popular news:', error);
    return [];
  }
};

export const getRecomNews = async () => {
  try {
    const filteredApiUrls = apiUrls.filter(({ url }) => url !== 'terbaru');
    
    const responses = await Promise.all(filteredApiUrls.map(({ url }) =>
      fetch(`${BASE_URL}/${url}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
    ));
    
    const recomPosts = responses.flatMap((response, index) => 
      response.data.posts.slice(0, 5).map(post => ({
        ...post,
        category: filteredApiUrls[index].category
      }))
    );
    
    return recomPosts;
  } catch (error) {
    console.error('Error fetching recommended news:', error);
    return [];
  }
};

export const getRealtedThree = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/${category}`);
    const data = await response.json();
    const postsWithCategory = data.data.posts.map(post => ({ ...post, category }));
    return postsWithCategory.slice(0, 3);
  } catch (error) {
    console.error('Error fetching data by category:', error);
    throw error;
  }
};