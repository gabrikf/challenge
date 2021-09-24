import { useContext } from 'react'
import { QuestionContext } from '../context/QuestionsContext'

const useQuestions = () => {
    const value = useContext(QuestionContext)
    return value 
} 
export default useQuestions