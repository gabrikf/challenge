import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Button,
  RadioGroup,
  Box,
  Grid,
} from '@material-ui/core';
import useQuestions from '../../hooks/useQuestionContext';
import { QuestionsType } from '../../context/QuestionsContext';
import { useHistory } from 'react-router';

const Questions = () => {
  const history = useHistory();
  const { answers } = useQuestions();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6}>
          {answers.map((item: QuestionsType, index: Number) => (
            <div key={String(index)}>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>{item.question}</FormLabel>
                <RadioGroup aria-label={item.question} value={item.responses}>
                  {item.answers.map((value: any, index: Number) => (
                    <FormControlLabel
                      key={String(index)}
                      value={String(index)}
                      control={
                        <Radio
                          color={
                            item.responses ===
                            String(item.answers.indexOf(item.correct_answer))
                              ? 'success'
                              : 'error'
                          }
                        />
                      }
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          ))}
          <Button
            color='primary'
            variant='contained'
            fullWidth
            type='submit'
            onClick={() => history.push('/')}
          >
            Back to Home
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Questions;
