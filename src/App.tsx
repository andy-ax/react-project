import React, { Children, Component, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom'
import routes from './routes';
import './App.css'

class App extends Component {
    ref: React.RefObject<any>;
    constructor(props: any) {
        super(props);
        // ref
        this.ref = React.createRef();
    }
    componentDidMount() {
        ReactDOM.render(routes, this.ref.current);
    }
    render() {
        return <div
            id="app"
            ref={this.ref}
        >
        </div>
    }
}


export default App;
