import { useEffect, useState } from "react";
import CoffeeType from "../types/coffee";
import coffeeAPI from "../lib/coffeeAPI";
import UserType from "../types/auth";

type Props = {
  user: UserType | null;
};

export default function EditCoffeeForm({ user }: Props) {
  if (!user) return "Latte Login First";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState<CoffeeType | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [message, setMessage] = useState<string>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [coffees, setCoffees] = useState<CoffeeType[] | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [coffeeToEdit, setCoffeeToEdit] = useState<CoffeeType | null>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await coffeeAPI.get();
      if (data) {
        setCoffees(data);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData!, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await coffeeAPI.edit(
      user,
      formData!,
      coffeeToEdit?.id || 1 // No clue why it needs a 1 but it works...hmm why??? lol
    );
    setMessage(error || "");
    if (data) {
      setMessage("Espresso Edited Successfully");
    }
  };
  
  const handleChooseCoffeeToEdit = (
    e: React.FormEvent<HTMLSelectElement>
  ) => {
    if (parseInt(e.currentTarget.value) !== 0) {
      setCoffeeToEdit(
        coffees?.find((r) => r.id === parseInt(e.currentTarget.value)) || null
      );
    } else {
      setCoffeeToEdit(null);
    }
  };

  const handleDelete = () => {
    if (coffeeToEdit && coffeeToEdit.id !== undefined) {
      coffeeAPI.del(user, coffeeToEdit.id);
      setMessage(
        "Decaffinated Delete, Don't Be Depresso You Can Always Come Back."
      );
    }
  };
  

  return (
    <div style={styles.container}>
      <h1>Espresso Edit</h1>
      <form onSubmit={handleSubmit}>
        <select name="id" onChange={handleChooseCoffeeToEdit}>
          <option value={0}>--Select Coffee--</option>
          {coffees?.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </select>

        <br />
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          placeholder={coffeeToEdit?.title || ""}
        />
        <br />
        <input
          type="text"
          name="body"
          onChange={handleInputChange}
          placeholder={coffeeToEdit?.body || ""}
        />
        <br />
        <button type="submit">Edit Coffee</button>
        <button type="button" onClick={handleDelete}>
          Decaffinated Delete
        </button>
        {message}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

