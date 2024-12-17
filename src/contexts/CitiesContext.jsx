import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        loading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        loading: false,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city._id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error("Error on action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentCity, setcurrentCity] = useState({})

  const Basic_URL = "https://citiesapi2-8wiemvn9.b4a.run";
  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${Basic_URL}/api/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data.data });
      } catch (e) {
        dispatch({ type: "rejected", payload: "error of loading cities" });
      }
    }

    fetchData();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${Basic_URL}/api/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data.data });
      } catch (e) {
        dispatch({ type: "rejected", payload: "error of loading city" });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${Basic_URL}/api/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data.data });
    } catch (e) {
      dispatch({ type: "rejected", payload: "error of creating city" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${Basic_URL}/api/cities/${id}`, {
        method: "DELETE",
      });
      //DELETE from array
      dispatch({ type: "cities/deleted", payload: id });
    } catch (e) {
      dispatch({ type: "rejected", payload: "error of deleting city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        error,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
