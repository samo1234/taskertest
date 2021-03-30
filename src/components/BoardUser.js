import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import "./BoardUser.css";
import Tags from './Tags'
import Tasks from './Tasks'


// glumim api
const dummydata = {
  taglist: [
    // dodao sam id polje
    {id: 1, name: "test", enabled: true},
    {id: 2, name: "work", enabled: true},
    {id: 3, name: "error", enabled: true},
    {id: 4, name: "drugi", enabled: true},
    {id: 5, name: "tretji", enabled: false},
    {id: 6, name: "react", enabled: true},
    {id: 7, name: "programiranje", enabled: true},
    {id: 8, name: "blazka", enabled: true},
    {id: 9, name: "buce", enabled: true},
    {id: 10, name: "kajt", enabled: true}
  ],
  // dodao sam tags (mozda su bili ali u onom jadnom json copyju nije.)
  // tags je array. pa moze bit i nekoliko razlicitig tagova..
  data: [
    {id: 26, userId: 4, tags: [1], name: "task delujoci", description: "some task description", fiatvalue: 23},
    {id: 27, userId: 4, tags: [4], name: "drugi delujoci task", description: "to je drugi delujoci task ", fiatvalue: 10},
    {id: 28, userId: 4, tags: [5], name: "tretji delujoci", description: "to je tretji delujoci task", fiatvalue: 3},
    {id: 29, userId: 4, tags: [1,9], name: "nastavi buce", description: "blazka mora nastaviti si buce, ker niso zasraufani", fiatvalue: 2}
  ]
}

const BoardUser = () => {
  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [total, setTotal] = useState(0)

  // to popravi da gleda na api
  useEffect(() => {
    // UserService.getUserBoard().then(
    //   (response) => {
        setTasks(dummydata.data)
        setTags(dummydata.taglist) // <- posto se tags promjeni ovdje to opali i ovaj drugi useeffect da dobijemo default listu i default total
      // },
      // (error) => {
      //   const _content =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString();
      //   console.log("there was an error");
      //   setContent(_content);
      // }
    // );
  }, []); // <- ovo [] znaci opali samo jednom i nikad vise jer je dependancy array prazan (i to je tako okej, saao komentiram kako radi)

  // drugi useeffect, opali samo kada se dependancy [] - tags promjeni
  useEffect(() => {
    // od svih tagova daj mi arr od enablanih, ali samo idjeve
    const enabledTags = tags.filter(tag => tag.enabled).map(tag => tag.id)
    // od taskova mi filtriraj one koji imaju neki od svojih tagova medu ovima gore
    const filtered = tasks.filter(task => task.tags.some(tag => enabledTags.includes(tag)))
    setFilteredTasks(filtered)
    setTotal(filtered.reduce((total, task) => total + task.fiatvalue, 0))
  }, [tags])

  const handleTag = (id) => {
    setTags(oldTags => oldTags.map(tag => tag.id === id? {...tag, enabled: !tag.enabled} : tag))
  }
  const handleAll = () => {
    setTags(oldTags => oldTags.map(tag => ({ ...tag, enabled: true})))
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>User Content</h3>
        <Tags tags={tags} handler={handleTag} handleAll={handleAll} />
        <h3>Tasks:</h3>
        <Tasks tasks={filteredTasks} tags={tags} />
        <div>Total: <strong>${total}</strong></div>
      </header>
    </div>
  );
};

export default BoardUser;