import { getFeedbacks } from '../../api/feedbacks';
import Raty from 'raty-js';

// DOM
const listEl = document.getElementById('stories-list');

function initRating() {
  document.querySelectorAll('.rating').forEach(el => {
    if (el.dataset.inited) return;

    new Raty(el, {
      readOnly: true,
      score: Number(el.dataset.rate),
      half: true,
      starOn: '/img/star-filled.svg',
      starOff: '/img/star-outline.svg',
      starHalf: '/img/star-half.svg',
    }).init();

    el.dataset.inited = 'true';
  });
}

/* ---------- Slide template ---------- */
function createSlide({ rate, description, author }) {
  return `
    <li class="swiper-slide story-card">
      <div class="star-rating" style="--rating: ${rate}" aria-label="Оцінка ${rate} з 5">
      </div>
      <p class="story-text">${description}</p>
      <p class="story-author">${author}</p>
    </li>
  `;
}

async function initSuccessStories() {
  try {
    const data = await getFeedbacks({ page: 1, limit: 6 });

    // універсальне діставання масиву
    const feedbacks =
      data?.results || data?.feedbacks || data?.data?.results || [];

    if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
      throw new Error('No feedbacks found');
    }

    feedbacks.forEach(item => {
      listEl.insertAdjacentHTML('beforeend', createSlide(item));
    });

    initRating();
    initSwiper();
  } catch (error) {
    console.error('Failed to load feedbacks:', error.message);
  }
}

/* ---------- Swiper ---------- */
function initSwiper() {
  new Swiper('.success-stories-swiper', {
    slidesPerView: 1,
    spaceBetween: 32,
    speed: 500,
    autoHeight: true,

    pagination: {
      el: '.slider-pagination',
      clickable: true,
      bulletClass: 'dot',
      bulletActiveClass: 'active',
    },

    navigation: {
      nextEl: '.slider-btn--next',
      prevEl: '.slider-btn--prev',
      disabledClass: 'is-disabled',
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1440: {
        slidesPerView: 2,
        spaceBetween: 80,
      },
    },
  });
}

initSuccessStories();
