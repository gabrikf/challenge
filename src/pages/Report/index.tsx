import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Box,
  Grid,
} from '@material-ui/core';


import './questions.css';
import useQuestions from '../../hooks/useQuestionContext';
import { QuestionsType } from '../../context/QuestionsContext';




const Questions = () => {


  const { answers } = useQuestions();
 


  return (

      
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
         
              <Grid item xs={6} sm={6} md={6}>
        
                {answers.map((item: QuestionsType, index: Number) => (
                  <div key={String(index)}>
                  <FormControl component='fieldset'>
                
                    
                    <FormLabel component='legend'>{(item.question)}</FormLabel>
                    <RadioGroup
                      aria-label='gender'
                      defaultValue='female'
             
                      value={item.responses}
        
                    >
                      {item.answers.map((value: any, index: Number) => (
                        <FormControlLabel
                          
                          key={String(index)}
                          value={value}
                          control={<Radio color={item.responses === item.correct_answer ? 'success' : 'error'}/> }
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                    
                  </FormControl>
                  </div>
                  ))}
             
      
              </Grid>
           
          </Grid>
        </Box>
  )
                      }
export default Questions;
