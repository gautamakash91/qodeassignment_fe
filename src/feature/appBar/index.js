import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import React from 'react'

export default function AppBar({ handleChange, handleUpload }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef()

  return (
    <Box boxShadow='base' p='2' rounded='md' bg='white'>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem w='100%' h='10' bg='grey.100' textAlign="left">
          <Text fontSize='2xl'>Akashs Photo Gallery</Text>
        </GridItem>
        <GridItem w='100%' h='10' bg='grey.100' textAlign="right">
          <Button colorScheme='blue' onClick={onOpen} ml={5}>Upload Image</Button>
        </GridItem>

        {/* DIALOG WITH IMAGE UPLOAD LAYOUT */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Add an image
              </AlertDialogHeader>

              <AlertDialogBody>
                Click on the button below and select an image
                <input type="file" accept="image/*" onChange={handleChange} />
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme='green'
                  onClick={(e) => {
                    onClose();
                    handleUpload(e)
                  }}
                  ml={3}
                >
                  Upload
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Grid>
    </Box>
  )
}