import './sass/main.scss';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import imagesListTpl from './js/templates/image-list.hbs';
import onShowImage from './js/basicLightbox';


const refs = {
    galleryContainer: document.querySelector('.gallery'),
    formRef: document.querySelector('#search-form'),
    inputRef: document.querySelector('input'),
    btnRef: document.querySelector('[data-action="load-more"]')
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true
});

refs.formRef.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages)
refs.galleryContainer.addEventListener('click', onShowImage)

const imagesApiService = new ImagesApiService();

function onSearch(e) {
    e.preventDefault();

    imagesApiService.query = e.currentTarget.elements.query.value.trim();

    if (imagesApiService.query) {
    
            clearContainer();
            imagesApiService.resetPage();
            fetchImages();
            loadMoreBtn.show();

    }
}

const renderImages = (images) => {
    refs.galleryContainer.insertAdjacentHTML('beforeend', imagesListTpl(images))
}

const clearContainer = () => {
    refs.galleryContainer.innerHTML = '';
}

async function fetchImages() {
    loadMoreBtn.disable()
  const images = await imagesApiService.fetchImages()
        renderImages(images);
    loadMoreBtn.enable()
    
    setTimeout(() => {
        refs.galleryContainer.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
    }, 500)
}


