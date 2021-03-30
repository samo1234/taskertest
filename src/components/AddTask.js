import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../services/user.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validDescription = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        The description is empty!
      </div>
    );
  }
};

const vtaskname = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The task name must be between 3 and 40 characters.
      </div>
    );
  }
};

const validTags = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          The tags are empty!
        </div>
      );
    }
  };
  

const AddTask = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [taskname, setTaskname] = useState("");
  const [description, setDescription] = useState("");
  const [fiatvalue, setFiatvalue] = useState("");
  const [tags, setTags] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeTaskname= (e) => {
    const taskname = e.target.value;
    setTaskname(taskname);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onChangeFiatvalue = (e) => {
    const fiatvalue = e.target.value;
    setFiatvalue(fiatvalue);
  };

  const onChangeTags = (e) => {
      const tags = e.target.value;
      setTags(tags);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserService.postTask(taskname, description, fiatvalue, tags).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleAddTask} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="taskname">Task Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="taskname"
                  value={taskname}
                  onChange={onChangeTaskname}
                  validations={[required, vtaskname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={onChangeDescription}
                  validations={[required, validDescription]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fiatvalue">Money Value(optional)</label>
                <Input
                  type="fiatvalue"
                  className="form-control"
                  name="fiatvalue"
                  value={fiatvalue}
                  onChange={onChangeFiatvalue}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <Input
                  type="tags"
                  className="form-control"
                  name="tags"
                  value={tags}
                  onChange={onChangeTags}
                  validations={[required, validTags]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Post Task</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default AddTask;
