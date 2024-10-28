import { Box } from "@chakra-ui/react"
import Header from "./components/header"
import ProductForm from "./components/sections/form"
import Product from "./components/sections/listItems/list"

function App() {

  return (
    <Box>
      <Header />
      <ProductForm />
      <Product />
    </Box>
  )
}

export default App
