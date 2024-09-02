

import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm} from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

export default function AjouterPublication() {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (pub) => {
      return axios.post("http://localhost:3000/publications", pub);
    },
    onError: (error) => {
      toast.error("Une ereur est survenue");
    },
    onSuccess: () => {
      toast.success("Publication ajoutée");
    },
  });

  const onSubmit = (data) =>{
    const publication = {
      ...data,
      datePublication: new Date(),
      likePublication: 0,
      idUtilisateur: user.id,
      auteur: user.nomUtilisateur, 

    };
    mutation.mutate(publication);
           
  }
  return (
    <Stack width={"60%"} margin={"auto"} marginTop={2} marginBottom={3}>
        <Typography variant="h4">Ajouter une publication</Typography>
        <form style={{
          marginTop: 4,
          }}
          onSubmit={handleSubmit(onSubmit)}
          >
          <Stack gap={2}>
            <TextField
              id="filled-basic"
              label="Parlez nous votre journée"
              variant="outlined"
              type="text"
              fullWidth
              size="small"
              multiline
              rows={3}
              {...register("textePublication", {
                required: "Veuillez saisir un text",
                minLength: {
                  value: 9,
                  message: "Veuillez saisir un text de plus de 10 caractères",
                },
              })}

            />
            <TextField
              id="filled-basic"
              label="Partager l'url de votre photo"
              variant="outlined"
              fullWidth
              size="small" 
              {...register("imagePublication", {
                required: "Veuillez saisir url de votre photo",
                minLength: {
                  message: "Veuillez saisir une url",
                },
              })}             

            />
            <Button variant="contained" type="submit">Publier</Button>
          </Stack>
            
        </form> 
    </Stack>
  )
}
