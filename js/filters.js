const RANDOM_POSTS_NUMBER = 10;
const filterButtons = document.querySelectorAll('.img-filters__button');
let currentFilterButton = Array.from(filterButtons).find((button) => button.classList.contains('img-filters__button--active'));

export const getFilteredPosts = (posts) => {
  const filter = currentFilterButton.id;

  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
  switch (filter) {
    case 'filter-random':
      return posts
        .sort(() => 0.5 - Math.random())
        .slice(0, RANDOM_POSTS_NUMBER);
    case 'filter-discussed':
      return posts.sort((post1, post2) => post2.comments.length - post1.comments.length);
  }
  return posts;
};

export const setFilter = (cb) => {

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button !== currentFilterButton) {
        currentFilterButton.classList.remove('img-filters__button--active');
        button.classList.add('img-filters__button--active');
        currentFilterButton = button;

        cb();
      }
    });
  });
};
