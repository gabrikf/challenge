import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './home.css'
import useQuestions from '../../hooks/useQuestionContext'
import { useHistory } from 'react-router-dom'


const quantitySchema = Yup.object().shape({quantity: Yup.number().required('Esse campo é obrigatório')})

const Home = () => {

  const history = useHistory()
const { handleSetQuantity } = useQuestions()
  const formik = useFormik({
    initialValues: {
      quantity: '',
    },
    validationSchema: quantitySchema,
    onSubmit: (value) => {
      handleSetQuantity(value.quantity)
      history.push('/questions')
    },
  });

  return (
   
    <div className='flex-item'>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          sx={{marginBottom:"10px"}}
          id="quantity"
          name="quantity"
          label="Digite a quantidade de perguntas"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && "Digite a quantidade em números."}
        />
        
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  
  );
};

export default Home;
