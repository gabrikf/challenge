import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Box,
  Grid,
} from '@material-ui/core';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './questions.css';
import useQuestions from '../../hooks/useQuestionContext';
import { useFormik } from 'formik';
import { QuestionsType } from '../../context/QuestionsContext';

type FormikValues = {
  [key: string]: string;
};
const Questions = () => {
  const [buttons, setButtons] = useState(true);
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [values, setValues] = useState<FormikValues>({});
  const history = useHistory();
  const { quantity, handleSetAnswers } = useQuestions();
  useEffect(() => {
    if (!quantity) {
      history.push('/');
    }
  }, [quantity, history]);
  const handleStartQuestions = async () => {
    setButtons(false);
    await api.get(`api.php?amount=${quantity}`).then((response) => {
      let newQuestions = response.data.results.map((value: any) => {
        let result = value.incorrect_answers;

        result.push(value.correct_answer);

        return {
          ...value,
          answers: result.sort((v1: any, v2: any) => v1.localeCompare(v2)),
        };
      });
      questions.map((a: any) =>
        setValues({
          [a.question]: '',
        })
      );
      console.log(newQuestions);
      setQuestions(newQuestions);
    });
  };

  const formik = useFormik({
    initialValues: values,
    enableReinitialize: true,
    onSubmit: async (value: any) => {
      let responses: any = questions.map((item: QuestionsType) => {
        let val: any = value[item.question + item.correct_answer];
        return {
          ...item,
          responses: val,
        };
      });
      handleSetAnswers(responses);
      history.push('report');
    },
  });

  return (
    <>
      {buttons ? (
        <div className='flex-item'>
          <div className='buttons'>
            <Button
              onClick={handleStartQuestions}
              className='btns'
              color='primary'
              variant='contained'
              fullWidth
              type='button'
            >
              Start
            </Button>
            <Button
              onClick={() => history.push('/')}
              className='btns'
              color='primary'
              variant='contained'
              fullWidth
              type='button'
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <form onSubmit={formik.handleSubmit}>
                  {questions.map((item: QuestionsType, index: Number) => (
                    <div key={String(index)}>
                      <FormControl component='fieldset'>
                        <FormLabel component='legend'>
                          {item.question}
                        </FormLabel>
                        <RadioGroup
                          aria-label={item.question}
                          name={item.question + item.correct_answer}
                          value={
                            formik.values[item.question + item.correct_answer]
                              ? formik.values[
                                  item.question + item.correct_answer
                                ]
                              : ''
                          }
                          onChange={formik.handleChange}
                        >
                          {item.answers.map((value: any, index: Number) => (
                            <FormControlLabel
                              key={String(index)}
                              value={String(index)}
                              control={<Radio />}
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
                  >
                    Submit
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Box>
      )}
    </>
  );
};
export default Questions;
