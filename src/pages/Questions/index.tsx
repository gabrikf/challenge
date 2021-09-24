import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
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
  question: string;
  type: string;
};

const Questions = () => {
  const [buttons, setButtons] = useState(true);
  const [quanstions, setQuestions] = useState<QuestionsType[]>([]);
  const history = useHistory();
  const { quantity } = useQuestions();
  const handleStartQuestions = async () => {
    setButtons(false);
    await api.get(`api.php?amount=${quantity}. `).then((response) => {
      setQuestions(response.data);
      console.log(response.data.results);
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
        <>
          {quanstions.map((item : QuestionsType) => (
            <div className="flex-item">
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default Questions;
