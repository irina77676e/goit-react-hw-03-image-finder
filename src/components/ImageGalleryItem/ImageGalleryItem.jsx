import React from 'react';
import { Gallery, Img } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ src, tags, dataSrc, onClick }) {
  return (
    <Gallery onClick={onClick}>
      <Img src={src} alt={tags} data-src={dataSrc} />
    </Gallery>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  dataSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
