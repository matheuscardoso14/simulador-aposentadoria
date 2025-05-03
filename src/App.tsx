import styles from "./App.module.scss"
import FormServidor from "./components/FormServidor"
import Header from "./components/Header"

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <section>
        <FormServidor />
      </section>
    </div>
  )
}

export default App
