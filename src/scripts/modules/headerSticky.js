export const headerSticky = () => {

  const getElCurHeight = el => {
      return el.clientHeight
    };

  const header = document.querySelector('.main-header');
  const headerInitialHeight = getElCurHeight(header);
  const firstSection = document.querySelector('section');

  console.log(firstSection)

  const onScrollHandler = () => {
    if(window.pageYOffset > headerInitialHeight) {
      header.classList.add('main-header--sticky');
      firstSection.style.marginTop = headerInitialHeight + 'px';
    } else if (window.pageYOffset === 0 && header.classList.contains('main-header--sticky')) {
      header.classList.remove('main-header--sticky');
      firstSection.style.marginTop = 0;
    }
  }

  if(header) {
    document.addEventListener('scroll', onScrollHandler);
  }
};

headerSticky();