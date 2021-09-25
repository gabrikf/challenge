import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import api from "../../services/api";
import { useState } from "react";
import { useHistory } from "react-router";
import "./questions.css";
import useQuestions from "../../hooks/useQuestionContext";

type QuestionsType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  answers: string[];
  question: string;
  type: string;
};

const Questions = () => {
  const [buttons, setButtons] = useState(true);
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const history = useHistory();
  const { quantity } = useQuestions();
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

      setQuestions(newQuestions);
    });
  };

  return (
    <>
      {buttons ? (
        <div className="flex-item">
          <div className="buttons">
            <Button
              onClick={handleStartQuestions}
              className="btns"
              color="primary"
              variant="contained"
              fullWidth
              type="button"
            >
              Start
            </Button>
            <Button
              onClick={() => history.push("/")}
              className="btns"
              color="primary"
              variant="contained"
              fullWidth
              type="button"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {questions.map((item: QuestionsType, index: Number) => (
              <Grid item xs={6} sm={6} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {item.answers.map((value: any, index: Number) => (
                      <FormControlLabel
                        value={index.toString()}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};
export default Questions;
