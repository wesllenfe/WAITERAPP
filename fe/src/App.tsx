import { Header } from "./components/Header/index"
import { Orders } from "./components/Orders"
import { GlobalStyles } from "./styles/GlobalStyles"

export function App() {
  return (
      <>
        <GlobalStyles />
        <Header />
        <Orders />
      </>
  )
}
