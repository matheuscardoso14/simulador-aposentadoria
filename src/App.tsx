import styles from "./App.module.scss"
import FormServidor from "./components/FormServidor"
import Title from "./components/Title"

function App() {
  return (
    <div className={styles.App}>
      <header>
        <Title type="h1">Simulador de aposentadoria</Title>
      </header>
      <section>
        <FormServidor />
      </section>
    </div>
  )
}

export default App
