import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Formulario = () => {
  const initialFormState = {
    nombre: "",
    especie: "",
    raza: "",
    peso: "",
    edad: "",
    sexo: "",
  };

  const [mascotas, setMascotas] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedMascotas = JSON.parse(localStorage.getItem("mascotas"));
    if (storedMascotas) {
      setMascotas(storedMascotas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mascotas", JSON.stringify(mascotas));
  }, [mascotas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Edit existing record
      mascotas[editIndex] = formData;
      setMascotas([...mascotas]);
      setEditIndex(null);
    } else {
      // Add new record
      setMascotas([...mascotas, formData]);
    }
    setFormData(initialFormState);
  };

  const handleEdit = (index) => {
    setFormData(mascotas[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedMascotas = mascotas.filter((_, i) => i !== index);
    setMascotas(updatedMascotas);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Registro de Mascotas
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Especie"
                name="especie"
                value={formData.especie}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Raza"
                name="raza"
                value={formData.raza}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Peso"
          name="peso"
          type="text" 
          value={formData.peso}
          onChange={handleChange}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Edad"
          name="edad"
          type="text" 
          value={formData.edad}
          onChange={handleChange}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
        />
      </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sexo</InputLabel>
                <Select
                  value={formData.sexo}
                  onChange={handleChange}
                  name="sexo"
                >
                  <MenuItem value="macho">Macho</MenuItem>
                  <MenuItem value="hembra">Hembra</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                {editIndex !== null ? "Guardar Cambios" : "Agregar Mascota"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

<Grid container spacing={0}>
  {/* Column headers */}
  <Grid item xs={12}>
    <Paper sx={{ padding: 2, backgroundColor: 'lightblue' }}>
      <Grid container spacing={0}>
        <Grid item xs={2} container justifyContent="center">
          <Typography variant="subtitle1" align="center">Nombre</Typography>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Typography variant="subtitle1" align="center">Especie</Typography>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Typography variant="subtitle1" align="center">Raza</Typography>
        </Grid>
        <Grid item xs={1} container justifyContent="center">
          <Typography variant="subtitle1" align="center">Peso (kg)</Typography>
        </Grid>
        <Grid item xs={1} container justifyContent="center">
          <Typography variant="subtitle1" align="center">Edad (años)</Typography>
        </Grid>
        <Grid item xs={1} container justifyContent="center">
          <Typography variant="subtitle1" align="center">Sexo</Typography>
        </Grid>
        <Grid item xs={1} container justifyContent="center" sx={{ ml: 3 }}>
          <Typography variant="subtitle1" align="center">Editar   </Typography>
        </Grid>
        <Grid item xs={1} container justifyContent="center" sx={{ ml: 5 }}>
          <Typography variant="subtitle1" align="center">Eliminar</Typography>
        </Grid>
      </Grid>
    </Paper>
  </Grid>

       {/* Pet data */}
       <Grid item xs={12} style={{ maxHeight: '200px', overflow: 'auto'}}>
        {mascotas.map((mascota, index) => (
          <Paper key={index} sx={{ padding: 2, marginBottom: 0, border: '1px solid #ccc'  }}>
            <Grid container spacing={0}>
              <Grid item xs={2} container justifyContent="center">
                <Typography variant="body1">{mascota.nombre}</Typography>
              </Grid>
              <Grid item xs={2} container justifyContent="center">
                <Typography variant="body1">{mascota.especie}</Typography>
              </Grid>
              <Grid item xs={2} container justifyContent="center">
                <Typography variant="body1">{mascota.raza}</Typography>
              </Grid>
              <Grid item xs={1} container justifyContent="center">
                <Typography variant="body1">{mascota.peso}</Typography>
              </Grid>
              <Grid item xs={1} container justifyContent="center">
                <Typography variant="body1">{mascota.edad}</Typography>
              </Grid>
              <Grid item xs={1} container justifyContent="center">
                <Typography variant="body1">{mascota.sexo}</Typography>
              </Grid>
              <Grid item xs={2} container justifyContent="center">
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(index)}
                  startIcon={<EditIcon />}                  
                >                  
                </Button>
              </Grid>
              <Grid item xs={1} container justifyContent="center">
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(index)}
                  startIcon={<DeleteIcon />}
                >
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
</Grid>
    </Container>
  );
};

export default Formulario;