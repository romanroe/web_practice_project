import * as React from "react";
import * as ReactDOM from "react-dom";
import {enableDevelopmentMode, Store} from "reactivestates/dist/Store";


class Data {
    a = 0;
    b = 1000;
}

class DataStore extends Store<Data> {
    constructor() {
        super(new Data());
    }

    action1() {
        this.action("mutate", d => {
            d.a++;
            d.b++;
        });
    }
}

const st = new DataStore();
enableDevelopmentMode();


class ReactiveStatesReactComponent<S extends Store<any>> extends React.Component<{ store: S }, any> {

    constructor(props: { store: S }) {
        super(props);
    }

    componentDidMount(): void {
        this.props.store.select()
                .subscribe(s => {
                    this.setState(s.data);
                });
    }

    get store() {
        return this.props.store;
    }

}

class GreetingRxStates extends ReactiveStatesReactComponent<DataStore> {

    render() {
        return <div>
            <b>Hello from {this.store.data.a}</b>
            <button onClick={() => this.store.action1()}>click</button>
        </div>;
    }
}


// ReactDOM.render(<GreetingRxStates store={st}/>, document.getElementById("react_rxstates") );
