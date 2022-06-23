import { Component } from 'react/cjs/react.production.min';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


import './app.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
        {name: 'Alex M.', salary: 3000, increase: false, rise: false, id: 2},
        {name: 'Carl W.', salary: 5000, increase: true, rise: false, id: 3} 
      ],
      term: '',
      filter: 'all'
    }
    this.currentIndex = this.state.data.length;
    this.countOfRise = 0;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {

        return {
          data: data.filter(item => item.id !== id)
        }
    })
  }

  addItem  = (name, salary) => {
    this.setState(({data}) => {
      this.currentIndex = this.state.data.length + 1;
      const newArr = [...data];
      const obj = {
        name: name,
        salary: salary,
        increase: false,
        rise: false,
        id: this.currentIndex
      }
      newArr.push(obj);
      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    // this.setState(({data}) => {
    //   const index = data.findIndex(elem => elem.id === id);

    //   const old = data[index];
    //   const newItem = {...old, increase: !old.increase};
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

    //   return {
    //     data: newArr
    //   }
    // })
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })  
    }))
  }

  searchEmp = (items, term) => {
    if(term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThan1000':
        return items.filter(item => item.salary > 1000);
      default: 
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  onSalaryChange = (e, id) => {
    this.setState(({data}) => {
      return {
        data: data.map(item => {
          if(item.id === id) {
            return {...item, salary: parseFloat(e.target.value)};
          }
          return item;
        })
      }
    })
  }

  render () {
    const {data, term, filter} = this.state
    let countOfRise = 0;
     this.state.data.forEach(item => {
      if(item.increase) {
        countOfRise++;
      }
    })
    let visibleData = this.searchEmp(data, term);
    visibleData = this.filterPost(visibleData, filter)
    return (
      <div className="app">
          <AppInfo employees={this.state.data.length} riseOfEmployees={countOfRise}/>
  
          <div className="search-panel">
              <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          onSalaryChange={this.onSalaryChange}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
