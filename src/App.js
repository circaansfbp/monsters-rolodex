import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  /**A través de una función flecha, la keyword `this` se define automáticamente como perteneciente
   * al contexto en el cual la función handleChange fue creada. En este caso, en el context de la
   * componente App
   */
  handleChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    /**
     * Saca las propiedades del objeto state (el arreglo de monsters y searchField, en este caso)
     * y los almacena en dos constantes, por separado.
     * Equivalente a:
     * const monsters = this.state.monsters;
     * const searchField = this.state.searchField;
     */
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder="Search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
