

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import NavBar from './components/NavBar';
import AjouterPublication from './components/AjouterPublication';
import axios, { Axios } from 'axios';
import { useQueryClient, useQuery } from '@tanstack/react-query';



export default function Accueil() {
  const [publication, setPublication] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    }

  });

  const queryClient = useQueryClient();
  const {data: publications, error, isLoading} = useQuery({
    queryKey: ["publications"],
    queryFn: () => 
      axios.get("http://localhost:3000/publications").then((res) => res.data),
    onerror: (error) => console.log(error),
    
  });
  
  if (isLoading) {
    return <div style={{
      textAlign: "center",
      alignContent: "center",
    }}
    >
      .....Chargement des données
    </div>;
  }
  let pubTrier = publications.sort((a, b) => {
    return new Date(b.datePublication) - new Date(a.datePublication);
  });

  return (
   <Box bgcolor={"#eef4ff"}>
      <NavBar /> 
      <AjouterPublication/>
      <Box width={"60%"} margin={"auto"} >
        {publications && pubTrier.map((publication) => 
        <Box 
        width={"100%"} 
        bgcolor={"#ffff"} 
        borderRadius={4} 
        marginBottom={3}
        padding={2}
        
        >
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Avatar src={publication.photoUtilisateur} />
            <Typography> {publication.auteur} </Typography>
          </Stack>
          <Typography> {publication.textePublication} </Typography>
          <img src= {publication.imagePublication} style={{
            width: "100%",
            borderRadius: 4,
          }} />
        </Box>)}

      </Box>
   </Box> 
  )
}
