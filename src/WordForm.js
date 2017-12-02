import React, { Component } from 'react';

export default class WordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtEn: '',
            txtVn: ''
        };
        this.addNewWord = this.addNewWord.bind(this);
    }

    addNewWord() {
        const { txtEn, txtVn } = this.state;
        this.props.onAddWord({
            en: txtEn, vn: txtVn, isMemorized: false, _id: Math.random() + ''
        });
        this.setState({ txtEn: '', txtVn: '' });
    }

    render() {
        const { txtEn, txtVn } = this.state;
        return (
            <div>
                <input
                    placeholder="English"
                    value={txtEn}
                    onChange={e => this.setState({ txtEn: e.target.value })}
                />
                <br />
                <br />
                <input
                    placeholder="Vietnamese"
                    value={txtVn}
                    onChange={e => this.setState({ txtVn: e.target.value })}
                />
                <br />
                <br />
                <button onClick={this.addNewWord}>Add</button>
            </div>
        );
    }
}
