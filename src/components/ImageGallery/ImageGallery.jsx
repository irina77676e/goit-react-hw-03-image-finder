import React from 'react';
import { PropTypes } from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ query, onClick }) {
  return (
    <Ul>
      {query.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            tags={tags}
            dataSrc={largeImageURL}
            onClick={onClickImg}
          />
        );
      })}
    </Ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClickImg: PropTypes.func,
};

export default ImageGallery;
