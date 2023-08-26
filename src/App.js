import './App.css';
import Gallery from './feature/gallery';
import AppBar from './feature/appBar';
import storage from "./feature/appBar/firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useState } from 'react';
import config from './config';
import { Box } from '@chakra-ui/react';

function App() {
  const [file, setFile] = useState("");
  const [images, setImages] = useState([]);
  const [percentage, setPercent] = useState("");

  //FUNCTION TO SELECT AN IMAGE
  const handleChange = (event) => {
    if (!event.target.files) {
      alert("Please choose a file to upload")
    } else {
      setFile(event.target.files[0]);
    }
  }

  //FUNCTION TO UPLOAD AN IMAGE TO FIREBASE
  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `/files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFile("");
            setPercent("");
            addImage(url);
          });
        }
      );
    } else {
      alert("please select an image first")
    }
  }

  //FUNCTION TO SAVE UPLOADED IMAGE DATA TO DATABASE
  const addImage = (url) => {
    //API call to add a new comment
    fetch(config.baseurl + 'image', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: url
      }),
    })
      .then(response => response.json())
      .then(json => {
        // setImageUrl("");
        fetchImages();
      })
      .catch(error => {
        console.error(error);
      });
  }

  //FUNCTION TO FETCH ALL IMAGES
  const fetchImages = () => {
    fetch(config.baseurl + 'image')
      .then(response => response.json())
      .then(json => {
        setImages(json);
      })
      .catch(error => {
        console.error(error);
      });
  }



  return (
    <div className="App">
      {/* UPLOAD PROGRESS */}
      {percentage !== "" && <Box bg='tomato' w='100%' p={4} color='white'>Uploading progress {percentage}</Box>}

      {/* TOP NAVBAR */}
      <AppBar
        handleChange={handleChange}
        handleUpload={handleUpload}
      />
      {/* GALLERY LAYOUT */}
      <Gallery
        fetchImages={fetchImages}
        images={images}
      />
    </div>
  );
}

export default App;
