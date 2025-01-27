import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const handlesubmit = () => {
    axios
      .post("http://localhost:3000/create", {
        name: task,
      })
      .then((data) => {
        console.log(data);
        alert("data send successfull");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTodos = () => {
    axios.get("http://localhost:3000/alltodos").then((data) => {
      setTodos(data.data);
    });
  };
  useEffect(() => {
    getTodos();
  }, [todos]);

  const handledelete = (id) => {
    axios.delete(`http://localhost:3000/deletetodo/${id}`).then((data) => {
      console.log(data);
      alert("data deleted successfull");
    });
  };

  return (
    <div className=" flex flex-col justify-center items-center ">
      <input
        onChange={(e) => setTask(e.target.value)}
        className=" border border-gray-500 px-4 "
        type="text"
      />
      <button
        onClick={handlesubmit}
        className=" bg-green-500 text-white py-1 px-3 rounded-md"
      >
        Submit
      </button>
      <div>
        <ul>
          {todos.map((item) => {
            return (
              <li className=" mt-3">
                {item.name}{" "}
                <button
                  onClick={() => handledelete(item._id)}
                  className=" bg-red-500 text-white py-1 px-2 rounded-md"
                >
                  delete
                </button>
                <button
                  // onClick={() => handledelete(item._id)}
                  className=" bg-green-500 text-white py-1 px-2 rounded-md"
                >
                  update
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
