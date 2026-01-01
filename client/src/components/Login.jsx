import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (state === "register") {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (profilePic) formData.append("profilePic", profilePic);

        response = await axios.post("/api/user/register", formData);
      } else {
        response = await axios.post("/api/user/login", {
          email,
          password,
        });
      }

      const { data } = response;

      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch {
      toast.error("Authentication failed");
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 py-10 bg-white shadow-lg"
      >
        <h1 className="text-gray-900 text-3xl font-medium">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          {state === "login"
            ? "Please sign in to continue"
            : "Create a new account"}
        </p>

        {state === "register" && (
          <>
            <div className="flex flex-col items-center w-full mt-6">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>

              <div
                className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() =>
                  document.getElementById("profilePicInput").click()
                }
              >
                {profilePic ? (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">Click to add</span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                id="profilePicInput"
                className="hidden"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-6 w-full h-12 px-6 rounded-full border border-gray-300/80 outline-none"
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 w-full h-12 px-6 rounded-full border border-gray-300/80 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full h-12 px-6 rounded-full border border-gray-300/80 outline-none"
          required
        />

        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-primary hover:bg-primary-dull transition"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>

        <p className="text-gray-500 text-sm mt-4">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
