import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import AppRoutes from "./Components/AppRoutes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          afterSignOutUrl="/login"
        >
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <SignedOut>
                    <SignIn
                      routing="path"
                      path="/login"
                      fallbackRedirectUrl="/home"
                    />
                  </SignedOut>

                  <SignedIn>
                    <Navigate to="/home" replace />
                  </SignedIn>
                </>
              }
            />

            <Route
              path="/*"
              element={
                <>
                  <SignedIn>
                    <AppRoutes />
                  </SignedIn>

                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </ClerkProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App
