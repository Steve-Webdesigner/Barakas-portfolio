const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn){
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show-menu');
  });
}

const text = [
  'Full Stack Web Developer',
  'Frontend Developer',
  'UI/UX Enthusiast'
];

let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type(){

  const typingElement = document.querySelector('.typing');

  if(typingElement){

    if(count === text.length){
      count = 0;
    }

    currentText = text[count];
    letter = currentText.slice(0, ++index);

    typingElement.textContent = letter;

    if(letter.length === currentText.length){
      count++;
      index = 0;

      setTimeout(type, 1800);
    } else {
      setTimeout(type, 120);
    }
  }

})();

window.addEventListener('scroll', reveal);

function reveal(){

  const reveals = document.querySelectorAll('.reveal');

  for(let i = 0; i < reveals.length; i++){

    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if(revealTop < windowHeight - revealPoint){
      reveals[i].classList.add('active');
    }
  }
}

reveal();