//temp file:
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import "./BoardUser.css";

let tagsarray = [];

let testdata = function getDataFromApi() {
  UserService.getUserBoard().then(
    (response) => {
      console.log("we are in response");
      let responseData = response.data.taglist;
      return responseData;
    },
    (error) => {
      console.log("there was an error", error);
      return error;
    }
  )
};

const BoardUser = () => {
console.log(testdata);

return "hello";
};
/*
const BoardUser = () => {
  const [content, setContent] = useState("");
  const [tagslist, setTaglist] = useState("");

  console.log(testdata);

  function fullFetchFunction() {
    UserService.getUserBoard().then(
      (response) => {
        //        console.log("vars", response.data);
        tagsarray = response.data.taglist;
//        var fiatsum = 0;
        const tasksArray = response.data.data.map((task, index) =>
          //          {fiatsum = fiatsum + task.fiatvalue}
          <div>
            <p key={index}><strong>{task.name}</strong>,<br />{task.description} value: <strong>${task.fiatvalue}</strong><br />{task.tags}</p>
          </div>)
        setContent(tasksArray);
        const tagslist = tagsarray.map((taglist, index) => {
          if (taglist.enabled === true)
            return <button key={index} className="button" onClick={() => handleAlert(index, taglist.name)}>{taglist.name}</button>
          return <button key={index} className="buttondisabled" onClick={() => handleAlert(index, taglist.name)}>{taglist.name}</button>
        })
        setTaglist(tagslist);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log("there was an error");
        setContent(_content);
      }
    );
  }
  useEffect(() => {
//    fullFetchFunction();
  }, []);

  function handleAlert(buttonnumber, tagname) {
    //    response.data.taglist[buttonnumber].enabled = false;
    tagsarray[buttonnumber].enabled = !tagsarray[buttonnumber].enabled;
    console.log(tagsarray);
    //    console.log(buttonnumber, tagname);

    //    alert("index num: " + buttonnumber);
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>User Content</h3>
        {tagslist}
        <button className="button" onClick={(event) => { this.setTaglist(tagslist) }}>Toggle All</button>
        <br />
        {content}
      </header>
    </div>
  );
};
*/
export default BoardUser;

//--------------------------------old---------------------------------

import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import "./BoardUser.css";

let tagsarray = [];
const BoardUser = () => {
  const [content, setContent] = useState("");
  const [tagslist, setTaglist] = useState("");

  const closedunction = {
    
  }
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        //        console.log("vars", response.data);
        tagsarray = response.data.taglist;
        var fiatsum = 0;
        const tasksArray = response.data.data.map((task, index) =>
          //          {fiatsum = fiatsum + task.fiatvalue}
          <div>
            <p key={index}><strong>{task.name}</strong>,<br />{task.description} value: <strong>${task.fiatvalue}</strong><br />{task.tags}</p>
          </div>)
        setContent(tasksArray);
        const tagslist = tagsarray.map((taglist, index) => {
          if (taglist.enabled === true)
            return <button key={index} className="button" onClick={() => handleAlert(index, taglist.name)}>{taglist.name}</button>
          return <button key={index} className="buttondisabled" onClick={() => handleAlert(index, taglist.name)}>{taglist.name}</button>
        })
        setTaglist(tagslist);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log("there was an error");
        setContent(_content);
      }
    );
  }, []);

  function handleAlert(buttonnumber, tagname) {
    //    response.data.taglist[buttonnumber].enabled = false;
    tagsarray[buttonnumber].enabled = !tagsarray[buttonnumber].enabled;
    console.log(tagsarray);
    //    console.log(buttonnumber, tagname);

    //    alert("index num: " + buttonnumber);
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>User Content</h3>
        {tagslist}
        <button className="button" onClick={ (event) => { this.setTaglist(tagslist)}}>Toggle All</button>
        <br />
        {content}
      </header>
    </div>
  );
};

export default BoardUser;
------------------------- cut ------------------------
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

import "./BoardUser.css";

function fetchData() {
  UserService.getUserBoard()
    .then(response => {
      console.log("no error");
      console.log(response.data);
      return response.data;
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log("there was an error");
        return _content;
      })
}
function handleAlert(){
  return 1
}
const BoardUser = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const getresults = async () => {
      const result = await fetchData()
      console.log(result);
      const tagslist = result.data.taglist.map((taglist, index) => {
        if (taglist.enabled === true)
          return <button key={index} className="button" onClick={() => handleAlert(index, taglist.name)}>{taglist.name}</button>
      })
      setData(tagslist);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>User Content</h3>
        {data}
        <button className="button" onClick={ (event) => { this.setTaglist(data.taglist)}}>Toggle All</button>
        <br />
      </header>
    </div>
  )
};

export default BoardUser;
