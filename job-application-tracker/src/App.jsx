import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddApplication from "./AddApplication";
import Dashboard from "./Dashboard";
import Landing from "./Landing";

function App() {
  return (
    <BrowserRouter basename="/HTML-CSS-Learning/job-application-tracker">
      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/add-application"
          element={<AddApplication />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;