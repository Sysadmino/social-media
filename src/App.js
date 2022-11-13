import Layout from "./hoc/Layout/Layout";

function App(props) {
  return (
    <Layout state={props.state} dispatch={props.dispatch} store={props.store} />
  );
}

export default App;
