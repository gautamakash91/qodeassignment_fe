import { Text, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import config from '../../../config';

export default function CommentsSection({ isOpen, onClose, selectedImage }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  //USEFFECT WILL CALL THE FETCH COMMENTS FUNCTION EVERYTIME THE DRAWER IS OPENED
  useEffect(() => {
    fetchComments()
  }, [isOpen])

  //FUNCTION TO FETCH COMMENTS FROM BACKEND
  const fetchComments = () => {
    fetch(config.baseurl+'comments/'+selectedImage)
    .then(response => response.json())
    .then(json => {
      setComments(json);
    })
    .catch(error => {
      console.error(error);
    });
  }

  //FUNCTION TO SEND A COMMENT TO THE BACKEND
  const sendComment = () => {
    //API call to add a new comment
    fetch(config.baseurl+'comments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: newComment,
        imageId: selectedImage
      }),
    })
      .then(response => response.json())
      .then(json => {
        fetchComments();
        setNewComment("")
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Comments</DrawerHeader>

        {/* ALL THE COMMENTS ARE SHOWN HERE */}
        <DrawerBody>
          {comments.map((s)=>(
            <Box borderWidth='1px' borderRadius='lg' p={2} mb={2}>
              <Text fontSize='sm'>{s.comment}</Text>
            </Box>
          ))}
          
          {/* INPUT TO ADD A NEW COMMENT */}
          <Input 
            placeholder='Type here and press enter' 
            value={newComment}
            onChange={(e)=>{
              setNewComment(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if(newComment !== ""){
                  sendComment();
                }
              }
            }}
          />
        </DrawerBody>


      </DrawerContent>
    </Drawer>
  )
}