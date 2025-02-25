import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export default async function getTask(req, res) {

    if (req.method === "POST") {
        try {
            const ID = req.body.userID;
            await dbConnect();
            const data = await Task.find();
            const filterData = data.filter((data) => data.identifier === ID); 
            return res.status(200).send({ filterData });
        } catch (err) {
            return res.status(200).json({ message: "Login First" });
        }
    }
}
