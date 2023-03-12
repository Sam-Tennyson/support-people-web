import RootRouter from "./Routes/RootRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { SnackbarProvider } from "notistack";
import { store, persistor } from "./Redux/Store";
import Loader from "./Components/HOC/Loader";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          maxSnack={3}
        >
          <Loader />
          <RootRouter />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
