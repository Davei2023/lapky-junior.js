async function getFeedbacks() {
  try {
    const response = await fetch('https://paw-hut.b.goit.study/api/feedbacks');
    if (!response.ok) throw new Error('Не вдалося завантажити відгуки');
    const data = await response.json();
    return data.feedbacks.slice(0, 10); 
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function renderFeedbacks() {
  const container = document.getElementById('feedback-container');
  const feedbacks = await getFeedbacks();

  container.innerHTML = feedbacks.map(fb => {
  const score = parseFloat(fb.rate);
  const widthPercent = (score / 5) * 100;
  return `
    <div class="swiper-slide">
      <div class="feedback-card">
        <div class="stars"><span style="width: ${widthPercent}%;"></span></div>
        <p class="feedback-text">${fb.description}</p>
        <p class="feedback-author">${fb.author}</p>
      </div>
    </div>
  `;
}).join('');


const swiper = new Swiper('.feedback-swiper', {
  spaceBetween: 10, 
  loop: false,
  slidesPerView: 1,
  slidesPerGroup: 1,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,    
    dynamicMainBullets: 5,
  },

  navigation: {
    nextEl: '#nextBtn',
    prevEl: '#prevBtn',
  },

  breakpoints: {
    
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
     1440: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 32,
    },
  },
});
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');



function updateButtons() {
  prevBtn.disabled = swiper.isBeginning;
  nextBtn.disabled = swiper.isEnd;
}

updateButtons();
}

renderFeedbacks();