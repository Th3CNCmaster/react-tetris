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
                            <TetrisGrid list={this.props.everything.game} />
                        </td>
                        <td>
                            <TetrisGrid list={this.props.everything.next} />
                        </td>
                        <td>
                            <h2>
                                Score: {this.props.everything.score}
                            </h2>
                            <h1>
                                {this.props.everything.lose}
                            </h1>
                            <h2>
                                Level: {this.props.everything.level}
                            </h2>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default PlayerView;