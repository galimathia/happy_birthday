// sparkles.js — динамически генерирует падающие частицы
(function () {
  const container = document.querySelector('.sparkles');
  if (!container) return;

  const colors = ['#ffd166', '#ff9f1c', '#ff4d6d', '#ff7aa2', '#7bdff2', '#9bffb3'];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    const el = document.createElement('span');

    const left = random(0, 100);
    const duration = random(4, 9); // seconds
    const color = colors[Math.floor(Math.random() * colors.length)];
    const drift1 = Math.round(random(-80, 80));
    const drift2 = Math.round(random(-80, 80));
    const top = random(10, 15);

    el.style.setProperty('--size', '10px');
    el.style.setProperty('--duration', duration + 's');
    el.style.setProperty('--color', color);
    el.style.setProperty('--driftbefore', drift1 + 'px');
    el.style.setProperty('--driftafter', drift2 + 'px');
    el.style.setProperty('--top', top + 'vh');

    el.style.left = left + '%';

    container.appendChild(el);

    // Удаляем элемент после завершения анимации
    el.addEventListener('animationend', () => {
      el.remove();
    });

    // Защита: на случай, если animationend не сработает
    setTimeout(() => el.remove(), (duration + 1) * 1000);
  }

  // Частота генерации: чем ниже — тем плотнее поток
  const interval = 150; // ms
  const handle = setInterval(createParticle, interval);

  // Остановить генерацию при уходе со страницы (необязательно)
  window.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(handle);
  });
})();
