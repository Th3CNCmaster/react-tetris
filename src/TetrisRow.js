import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import { render } from '@testing-library/react';

class TetrisRow extends React.Component {

    render = () => {
        const makeRow = (item) => {
            let q = ["black", "red", "blue", "green", "yellow", "pink", "magenta", "gray", "beige"];
            return (<td style={{ backgroundColor: q[item], width: "25px", height: "25px", }}>{item}</td>);
        };
        const listItems = this.props.row.map(makeRow);
        return (
            <tr>
                {listItems}
            </tr>
        );
    }
}
export default TetrisRow;