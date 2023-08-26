//SIMPLE LAYOUT TO SHOW AN IMAGE
//ON HOVER IT WILL GIVE A SHADOW EFFECT
import { Box, Center, Image } from '@chakra-ui/react'

export default function SingleImage({onTap, image, imageId}){

  return (
    <Box 
      onClick={()=>{
        onTap(imageId)
      }}
      _hover={{
        boxShadow:'dark-lg'
      }}
    >
      <Center>
      <Image src={image} />
      </Center>
    </Box>
  )
}