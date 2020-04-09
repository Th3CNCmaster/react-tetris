import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import { render } from '@testing-library/react';
import TetrisRow from "./TetrisRow";

class TetrisGrid extends React.Component {


    render = () => {
        const rows = (item) => <TetrisRow row={item} />;
        const listItems = this.props.list.map(rows);
        return (
            <table>
                {listItems}
            </table>
        );
    }
}

export default TetrisGrid;