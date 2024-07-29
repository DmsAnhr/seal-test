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

const fetchAllNews = async () => {
  try {
    // Fetch data from all APIs and attach category to each news item
    const responses = await Promise.all(
      apiUrls.map(async ({ url, category }) => {
        const response = await fetch(`${BASE_URL}/${url}`);
        const data = await response.json();
        // Attach category to each news item
        return data.data.posts.map(post => ({ ...post, category }));
      })
    );
    // Flatten the array of arrays
    const allPosts = responses.flat();
    return allPosts;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// const fetchNews = async (endpoint) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${endpoint}`);
//     const data = await response.json();
//     const categories = endpoint;
//     const postsWithCategory = data.data.posts.map(post => ({ ...post, categories }));
//     const allPosts = postsWithCategory.flat();
//     return allPosts;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// const fetchNews = async (endpoint) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${endpoint}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };


const fetchNews = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    const categories = endpoint;
    // Menambahkan kategori ke setiap post
    const postsWithCategory = data.data.posts.map(post => ({ ...post, category: categories }));
    return postsWithCategory; // Kembalikan posts dengan kategori
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Update the exported functions to include category
export const getLatestNews = () => fetchNews('terbaru');
export const getNationalNews = () => fetchNews('nasional');
export const getInternationalNews = () => fetchNews('internasional');
export const getEconomyNews = () => fetchNews('ekonomi');
export const getSportNews = () => fetchNews('olahraga');
export const getTechnologyNews = () => fetchNews('teknologi');
export const getEntertainmentNews = () => fetchNews('hiburan');
export const getLifestyleNews = () => fetchNews('gayaHidup');
export const getAllNews = () => fetchAllNews();
export const getNewsByLink = async (category, link) => {
  try {
    const response = await fetch(`https://api-berita-indonesia.vercel.app/cnn/${category}`);
    const data = await response.json();
    const newsItem = data.data.posts.find(post => post.link.endsWith(link));
    return newsItem;
  } catch (error) {
    console.error('Error fetching news by link:', error);
    throw error;
  }
};

export const getNewsByCategory = async (category) => {
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