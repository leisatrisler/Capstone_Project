import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import UserType from "../types/auth";
import userAPI from "../lib/userAPI";

type Props = object;

// eslint-disable-next-line no-empty-pattern
export default function RegisterForm({}: Props) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<UserType | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData!, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await userAPI.register(formData!);
    setMessage(error || "Steaming Hot, You Have Successfully Registered.");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Registration Form
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Roasting Register!</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              type="text"
              name="first_name"
              onChange={handleInputChange}
              label="First Name"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              type="text"
              name="last_name"
              onChange={handleInputChange}
              label="Last Name"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              type="text"
              name="email"
              onChange={handleInputChange}
              label="Email"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              type="password"
              name="password"
              onChange={handleInputChange}
              label="Password"
              fullWidth
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Caffine Cancellation</Button>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <p>{message}</p>
    </div>
  );
}
