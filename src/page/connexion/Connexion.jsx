import React, { useEffect } from 'react'
import { Stack, Typography, Box, TextField, Button} from '@mui/material'
import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Connexion() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("utilisateur")) {
      navigate("/");
    }
  }, [navigate]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // Étape 1 : Vérifier si l'utilisateur avec l'email existe
    axios.get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`)
      .then((res) => {
        if (res.data.length > 0) {
          // Étape 2 : Vérifier si le mot de passe correspond
          const utilisateur = res.data[0];
          if (utilisateur.motDePasse === data.motDePasse) {
            localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
            navigate("/");
            toast.success("Connexion réussie");
          } else {
            toast.error("Mot de passe incorrect");
          }
        } else {
          toast.error("L'utilisateur n'existe pas");
        }
      })
      .catch((error) => {
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
        console.error("Erreur lors de la connexion", error);
      });
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      backgroundColor={"#f5f5f5"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}
      >
        <Typography variant="h5">Connexion</Typography>
        <form
          style={{
            marginTop: 4,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre adresse mail"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("mailUtilisateur", {
                required: "Veuillez saisir votre adresse mail",
                pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir un mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("motDePasse", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message: "Veuillez saisir un mot de passe de plus de 6 caractères",
                },
              })}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
            }}
            type="submit"
          >
            Connexion
          </Button>
          <Typography paddingTop={2}>
            Voulez-vous créer un compte ? <Link to="/inscription">Cliquez ici</Link>
          </Typography>
        </form>
      </Box>
    </Stack>
  );
}
