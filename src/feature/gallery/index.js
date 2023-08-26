import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import SingleImage from './component/singleImage'
import React, { useEffect, useState } from 'react'
import CommentsSection from './component/commentsSection'

export default function Gallery({ fetchImages, images }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    //call API to fetch images
    fetchImages();
  }, [])

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={4} m={10}>
      {images.map((obj) => (
        <GridItem w='100%' >
          <SingleImage
            onTap={(selectedImage) => {
              onOpen();
              setSelectedImage(selectedImage)
            }}
            image={obj.image_url}
            imageId={obj._id}
          />
        </GridItem>
      ))}

      {/* THIS IS THE COMMENTS SECTION WHICH IS INSIDE OF A RIGHT DRAWER */}
      <CommentsSection
        isOpen={isOpen}
        onClose={onClose}
        selectedImage={selectedImage}
      />

    </Grid>
  )
}