import React, { createContext, ReactNode, useEffect, useState } from "react";

type QuestionsContextProviderProps = {
  children: ReactNode;
};
type QuestionContextType = {
  quantity: string;
  handleSetQuantity: (val: string) => void;
};

export const QuestionContext = createContext({} as QuestionContextType);

export function QuestionsContextProvider(props: QuestionsContextProviderProps) {

  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const quantityVal = localStorage.getItem('token')
    if(quantityVal){
        setQuantity(quantityVal)
    }
  }, [quantity]);

  const handleSetQuantity = (val: string) => {
      setQuantity(val)
      localStorage.setItem('quantity', quantity);
  }

  return (
    <QuestionContext.Provider value={{ quantity, handleSetQuantity }}>
      {props.children}
    </QuestionContext.Provider>
  );
}
