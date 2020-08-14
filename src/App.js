import React from "react";
import { notes } from "./notes";
import "./App.css";

class NoteCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class NoteRow extends React.Component {
  render() {
    const note = this.props.note;
    const name = note.name;
    const example = note.example;
    const description = note.description;

    return (
      <tr>
        <td>{name}</td>
        <td>{example}</td>
        <td>{description}</td>
      </tr>
    );
  }
}

class NoteTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const selectOnly = this.props.selectOnly;
    const notes = this.props.notes;

    const rows = [];
    let lastCategory = null;

    notes.forEach((note) => {
      if (note.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      } else if (!selectOnly) {
        if (note.category !== lastCategory) {
          rows.push(
            <NoteCategoryRow category={note.category} key={note.category} />
          );
        }
        rows.push(<NoteRow note={note} key={note.name} />);
        lastCategory = note.category;
      }
      if (selectOnly !== note.category) {
        return;
      }
      if (note.category !== lastCategory) {
        rows.push(
          <NoteCategoryRow category={note.category} key={note.category} />
        );
      }
      rows.push(<NoteRow note={note} key={note.name} />);
      lastCategory = note.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleSelectChange(e) {
    this.props.onSelectChange(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <select
            type="text"
            onChange={this.handleSelectChange}
            value={this.props.selectOnly}
            required
          >
            <option value="">All</option>
            <option value="HTML">HTML</option>
            <option value="ES6">ES6</option>
            <option value="Javascript">Javascript</option>
            <option value="Advanced Javascript">Advanced Javascript</option>
            <option value="Javascript Concepts">Javascript Concepts</option>
            <option value="Debugging">Debugging</option>
            <option value="Terminal Commands">Terminal Commands</option>
            <option value="GIT">GIT</option>
            <option value="React">React</option>
            <option value="Redux">Redux</option>
          </select>
        </p>
      </form>
    );
  }
}

class FilterableNoteTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: notes,
      filterText: "",
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleSelectChange(selectOnly) {
    this.setState({
      selectOnly: selectOnly,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { notes } = this.state,
      name = this.refs.name.value,
      category = this.refs.category.value,
      example = this.refs.example.value,
      description = this.refs.description.value;

    this.setState(
      {
        notes: [
          ...notes,
          {
            name,
            category,
            example,
            description,
          },
        ],
      },

      () => {
        this.refs.name.value = "";
        this.refs.category.value = "";
        this.refs.example.value = "";
        this.refs.description.value = "";
      }
    );
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
          selectOnly={this.state.selectOnly}
          onSelectChange={this.handleSelectChange}
        />
        <div className="center mw7 mw-7-ns br3 hidden ba b--black-10 mv4">
          <h2 className="tc mt3">Add a note</h2>
          <form onSubmit={this.handleSubmit}>
            <label className="input-reset center pa2 db w-90">
              Name:
              <input
                className="input-reset ba b--black-20 pa2 db w-50"
                ref="name"
                type="text"
                required
              />
            </label>
            <label className="input-reset center pa2 db w-90">
              Category:
              <select
                className="input-reset ba b--black-20 pa2 db w-50"
                ref="category"
                type="text"
                defaultValue="select category"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="HTML">HTML</option>
                <option value="ES6">ES6</option>
                <option value="Javascript">Javascript</option>
                <option value="Advanced Javascript">Advanced Javascript</option>
                <option value="Javascript Concepts">Javascript Concepts</option>
                <option value="Debugging">Debugging</option>
                <option value="Terminal Commands">Terminal Commands</option>
                <option value="GIT">GIT</option>
                <option value="React">React</option>
                <option value="Redux">Redux</option>
              </select>
            </label>
            <label className="input-reset center pa2 db w-90">
              Example:
              <textarea
                className="input-reset ba b--black-20 pa2 db w-100"
                ref="example"
                type="text"
                rows="5"
                required
              />
            </label>
            <label className="input-reset center pa2 db w-90">
              Description:
              <textarea
                className="input-reset ba b--black-20 pa2 db w-100"
                ref="description"
                type="text"
                rows="5"
                required
              />
            </label>
            <input
              className="center pa2 db w-30 mb3 br3 ba black"
              type="submit"
              value="Add"
            />
          </form>
        </div>
        <NoteTable
          notes={this.state.notes}
          filterText={this.state.filterText}
          selectOnly={this.state.selectOnly}
        />
      </div>
    );
  }
}

function App() {
  return <FilterableNoteTable />;
}

export default App;
