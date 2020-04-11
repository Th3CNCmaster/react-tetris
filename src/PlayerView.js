import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import { render } from '@testing-library/react';
import TetrisGrid from './TetrisGrid';

class PlayerView extends React.Component {


    render = () => {

        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <TetrisGrid list={this.props.game} />
                        </td>
                        <td>
                            <TetrisGrid list={this.props.next} />
                        </td>
                        <td>
                            <h2>
                                Score: {this.props.score}
                            </h2>
                            <h1>
                                {this.props.lose}
                            </h1>
                            <h2>
                                Level: {this.props.level}
                            </h2>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default PlayerView;