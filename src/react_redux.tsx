import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from "redux";

const initalState = {
    clicks: [1, 2]
};

class AddClick {
    constructor(public timestamp: number) {
    }
}

function todoApp(state = initalState, action: any) {
    if (action instanceof AddClick) {
        return {
            clicks: [...state.clicks, action.timestamp]
        };
    } else {
        return state;
    }
}

let store = createStore(todoApp);


class GreetingRedux extends React.Component<any, any> {

    render() {
        return <div>
            <b>Hello from</b>
            <ul>
                {this.props.store.clicks.map((v: number) => <li>v</li>)}
            </ul>
            <button onClick={() => console.log("test")}>click</button>
        </div>;
    }

}


ReactDOM.render(<GreetingRedux store={store}/>, document.getElementById("react_redux"));

//////////////////////////////////

// class A {
//     mB: B;
// }
//
// class B {
//     mC: C;
// }
//
// class C {
//     mD: D;
// }
//
// class D {
//     value: number;
// }
//
// const a = new A();
// a.mB = new B();
// a.mB.mC = new C();
// a.mB.mC.mD = new D();
// a.mB.mC.mD.value = 1;
//
// const frozen = icepick.freeze(a);
//
//
// function ai<T,
//         P1 extends keyof T,
//         P2 extends keyof T[P1],
//         P3 extends keyof T[P1][P2],
//         P4 extends keyof T[P1][P2][P3],
//         V extends T[P1][P2][P3][P4]>(collection: T, path: [P1, P2, P3, P4], value: V): T {
//
//
//     return icepick.assocIn(collection, path as any, value);
// }
//
//
// ai(a, ["mB", "mC", "mD", "value"], 10);
