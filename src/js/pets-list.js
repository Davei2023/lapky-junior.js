import axios from 'axios';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://paw-hut.b.goit.study/api/';
const CATECORIES_URL = 'categories';
const ANIMALS_URL = 'animals';

const categories = document.querySelector('.categories-list');
const allAnimals = document.querySelector('.animals-list');

async function createCategories() {
  const { data } = await axios(`${BASE_URL}${CATECORIES_URL}`);
  return data;
}

createCategories().then(data => {
  categories.insertAdjacentHTML('afterbegin', createMarkupCategories(data));
});
// .catch(error => {
//   iziToast.error({
//     message:
//       'Sorry, there are no images matching your search query. Please try again!',
//     position: 'topRight',
//     color: 'red',
//   });
// });

function createMarkupCategories(arr) {
  return arr
    .map(
      ({ name }) =>
        `<li class="categories-item"><div class="categories-text">${name}</div></li>`
    )
    .join('');
}
