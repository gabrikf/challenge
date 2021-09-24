import Routes from "./routes";
import { QuestionsContextProvider } from "./context/QuestionsContext";

function App() {
  return (
    <QuestionsContextProvider>
      <Routes />
    </QuestionsContextProvider>
  );
}

export default App;
