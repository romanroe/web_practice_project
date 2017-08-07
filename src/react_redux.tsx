import * as React from "react";
import * as ReactDOM from "react-dom";


class GreetingRedux extends React.Component<any, any> {

    render() {
        return <div>
            <b>Hello from</b>
            <button onClick={() => console.log("test")}>click</button>
        </div>;
    }

}


ReactDOM.render(<GreetingRedux/>, document.getElementById("react_redux"));
