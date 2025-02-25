import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export default async function addTask(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      const { mytitle, mydescription, mystatus, mypriority, mydueDate, assigned, created, ID } =
        req.body;
      const task = new Task({
        title: mytitle,
        description: mydescription,
        status: mystatus,
        priority: mypriority,
        dueDate: mydueDate,
        assignedTo: assigned,
        createdBy: created,
        identifier: ID
      });
      await task.save();
      return res.status(201).json({ message: "Data Feeded Successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Something Went Wrong" });
    }
  }
}
