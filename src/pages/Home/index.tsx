import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

const Home = () => {
  return (
    <>
    <Box >
       <Box
      component="form"
      sx={{ display: 'flex' }}
      noValidate
      alignItems="center"
      justifyContent="center"
      autoComplete="off"
    >
        <TextField id="outlined-basic" label="Número de perguntas" variant="outlined" />
        <Button variant="contained" color="primary">
          Buscar
        </Button>
      </Box>
      </Box>
    </>
  );
};
export default Home;
