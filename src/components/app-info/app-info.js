import { Component } from "react/cjs/react.production.min";
import "./app-info.css";

class AppInfo extends Component{
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className="app-info">
                <h1>Учет сотрудников в компании N</h1>
                <h2>Общее число сотрудников: {this.props.employees}</h2>
                <h2>Премию получат: {this.props.riseOfEmployees}</h2>
            </div>
        )
    }
}

export default AppInfo;

