const TaskForm = () => {
  return (
    <form>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" />
      <label htmlFor="description">Description</label>
      <input type="text" id="description" />
      <input type="submit"></input>
    </form>
  );
};

export default TaskForm;
