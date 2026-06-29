import "./App.css";

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <>
      <h1 className="bg-pink-500 text-2xl font-bold">Creating Blog Website</h1>
    </>
  );
}

export default App;
