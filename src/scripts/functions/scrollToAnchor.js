const scrollToAnchor  = (el) => {
    const headerHeight = document.querySelector('.main-header').clientHeight

    const topPos = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
        top: topPos, // scroll so that the element is at the top of the view
        behavior: 'smooth' // smooth scroll
    });
}

export {scrollToAnchor};