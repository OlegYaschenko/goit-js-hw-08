// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const refs = {
  gallery: document.querySelector('.gallery'),
}

const createMarkupEl = galleryItems.map(({ original, preview, description}) =>
  `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`)
.join('');

refs.gallery.innerHTML = createMarkupEl;

new SimpleLightbox('.gallery a', { 
  captionDelay: 250,
  captionsData: 'alt',
});

