import React, { createContext, ReactNode, useEffect, useState } from "react";

type QuestionsContextProviderProps = {
  children: ReactNode;
};
type QuestionContextType = {
  quantity: string;
  handleSetQuantity: (val: string) => void;
  answers: QuestionsType[];
  handleSetAnswers: (val: QuestionsType[]) => void;
};
export type QuestionsType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  answers: string[];
  question: string;
  type: string;
  responses: Object | undefined;
};

export const QuestionContext = createContext({} as QuestionContextType);

export function QuestionsContextProvider(props: QuestionsContextProviderProps) {

  const [quantity, setQuantity] = useState('');
  const [answers, setAnswers] = useState<any>([]);
  useEffect(() => {
    let answer = localStorage.getItem('answers')
    if(answer){
    answer = JSON.parse(answer)
      setAnswers(answer)
        
    }
  }, []);

  const handleSetQuantity = (val: string) => {
      setQuantity(val)
  }
  const handleSetAnswers = (val: QuestionsType[]) => {
    setAnswers(val)
    localStorage.setItem('answers', JSON.stringify(val));

}

  return (
    <QuestionContext.Provider value={{ quantity, handleSetQuantity, answers, handleSetAnswers}}>
      {props.children}
    </QuestionContext.Provider>
  );
}
