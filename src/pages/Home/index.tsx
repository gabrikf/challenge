import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './home.css'
import useQuestions from '../../hooks/useQuestionContext'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";


const quantitySchema = Yup.object().shape({quantity: Yup.number().required('Esse campo é obrigatório')})

const Home = () => {
  const [resps, setResps] = useState(false)
  const { handleSetQuantity } = useQuestions()
  useEffect(() => {
    const resp = localStorage.getItem('answers')
    if(resp){
      setResps(true)
    }
  },[])
  const history = useHistory()

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
{resps &&
        <Button sx={{marginTop: '10px'}} color="primary" variant="contained" fullWidth onClick={() => history.push('report')}>
          Last Result
        </Button>
}
      </form>
    </div>
  
  );
};

export default Home;
