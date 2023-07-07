import UserType from "../types/auth";
import userAPI from "../lib/userAPI";
import { useState } from "react";

type Props = {
  setUser: (user: UserType) => void;
};

type Styles = {
  [key: string]: React.CSSProperties;
};

export default function LatteLoginForm({ setUser }: Props) {
  const [formData, setFormData] = useState<UserType>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await userAPI.login(
        formData.email || "",
        formData.password || ""
      );
      if (error) {
        setMessage(error);
      } else if (data) {
        setUser(data);
        setMessage("Successful Latte Log In");
        handleClose();
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred while logging in. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles: Styles = {
    modalContainer: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#ccc",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      filter: "grayscale(100%)",
    },
  };

  return (
    <div>
      <button onClick={handleOpen}>Latte Log In</button>
      {open && (
        <div style={styles.modalContainer}>
          <h2 style={{ textAlign: "center" }}>Latte Log In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <br />
            <button type="submit">Latte Log In</button>
            <p>{message}</p>
          </form>
        </div>
      )}
    </div>
  );
}

