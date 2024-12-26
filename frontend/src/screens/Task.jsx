import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function Task() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTask();
  }, [tasks]);

  const fetchTask = async () => {
    const res = await fetch("http://localhost:8000/api/v1/task", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    setTasks(data.tasks);
  };

  // Add Task

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [priority, setPriority] = useState("");

  let handleAddTaskButton = async () => {
    let tasks = {
      title,
      description,
      priority,
    };

    let addTask = await fetch("http://localhost:8000/api/v1/task", {
      method: "POST",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (addTask.success) {
      alert("Task Added Succesfully");
    }

    setIsDialogOpen(false);

    setTitle("");
    setDescription("");
    setPriority("");
    setCurrentID("");
  };

  // Delete Task

  const handleDeleteBTN = async (id) => {
    if (confirm("Are you sure you want to delete task?")) {
      await fetch(`http://localhost:8000/api/v1/task/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    }
  };

  // Edit Task

  const [isEdited, setIsEdited] = useState(false);
  const [currentID, setCurrentID] = useState();

  const handleEditBTN = async (task) => {
    setIsDialogOpen(true);
    setIsEdited(true);

    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);

    setCurrentID(task._id);
  };

  const handleUpdateTask = async () => {
    let tasks = {
      title,
      description,
      priority,
    };

    let updateTask = await fetch(
      `http://localhost:8000/api/v1/task/${currentID}`,
      {
        method: "PUT",
        body: JSON.stringify(tasks),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (updateTask.success) {
      alert("Task Update Succesfully");
    }

    setTitle("");
    setDescription("");
    setPriority("");
    setCurrentID();
    setIsEdited(false)
    setIsDialogOpen(false);
  };

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 space-y-8">
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full mr-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8 w-full" placeholder="Search tasks..." />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Task Title"
                    id="title"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Task Description"
                    id="description"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select
                    value={priority}
                    onValueChange={(e) => setPriority(e)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                {isEdited ? (
                  <Button
                    onClick={handleUpdateTask}
                    className="w-full"
                    type="submit"
                  >
                    Update Task
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddTaskButton}
                    className="w-full"
                    type="submit"
                  >
                    Save Task
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Created Date
                </TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {task.description}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={priorityColors[task.priority]}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        onClick={() => handleEditBTN(task)}
                        variant="outline"
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteBTN(task._id)}
                        variant="outline"
                        size="icon"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </div>
  );
}
