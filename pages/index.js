// pages/index.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  let temp = 0;
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [feedTask, setFeedTask] = useState({
    mytitle: "",
    mydescription: "",
    mystatus: "",
    mypriority: "",
    mydueDate: "",
  });

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    getData();
  }, []);

  const addTask = async (e) => {
    const assigned = "User";
    const created = "User";
    e.preventDefault();
    try {
      const { mytitle, mydescription, mystatus, mypriority, mydueDate } =
        feedTask;
      const res = await axios.post("/api/addTask", {
        mytitle,
        mydescription,
        mystatus,
        mypriority,
        mydueDate,
        assigned,
        created,
        ID: userID,
      });
      alert(res.data.message);
      getData();
      setFeedTask({
        mytitle: "",
        mydescription: "",
        mystatus: "",
        mypriority: "",
        mydueDate: "",
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.post("/api/getTask", { userID });
      setTasks(res.data.filterData);
    } catch (err) {
      alert(res.data.message);
    }
  };

  const ShowTaskColumns = async () => {
    document.querySelector(".showTaskColumn").style.display = "flex";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const delTask = async (id) => {
    try {
      const res = await axios.post("/api/delTask", { id });
      alert(res.data.message);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      <Button
        className="ml-5"
        variant="contained"
        color="secondary"
        onClick={ShowTaskColumns}
      >
        Add Task
      </Button>

      <form
        onSubmit={addTask}
        className="mt-5 showTaskColumn"
        style={{ display: "none", gap: "4rem", marginBottom: "1rem" }}
      >
        <input
          className="border-2 border-gray-200 w-32 rounded-lg"
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) =>
            setFeedTask({ ...feedTask, mytitle: e.target.value })
          }
          value={feedTask.mytitle}
        />
        <input
          className="border-2 border-gray-200 w-32 rounded-lg"
          type="text"
          name="description"
          placeholder="Description"
          onChange={(e) =>
            setFeedTask({ ...feedTask, mydescription: e.target.value })
          }
          value={feedTask.mydescription}
        />
        <TextField
          select
          label="Status"
          value={feedTask.mystatus}
          onChange={(e) =>
            setFeedTask({ ...feedTask, mystatus: e.target.value })
          }
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <TextField
          select
          label="Priority"
          value={feedTask.mypriority}
          onChange={(e) =>
            setFeedTask({ ...feedTask, mypriority: e.target.value })
          }
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <TextField
          label="Due Date Before"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={feedTask.mydueDate}
          onChange={(e) =>
            setFeedTask({ ...feedTask, mydueDate: e.target.value })
          }
          size="small"
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>

      {/* Task From Database */}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-semibold">Title</TableCell>
            <TableCell className="font-semibold">Status</TableCell>
            <TableCell className="font-semibold">Priority</TableCell>
            <TableCell className="font-semibold">Due Date</TableCell>
            <TableCell className="font-semibold">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                {new Date(task.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() =>delTask(task._id)}
                >
                  Done
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
