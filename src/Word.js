import React, { Component } from 'react';

export default class Word extends Component {
    render() {
        const { en, vn, isMemorized, _id } = this.props.word;
        const { onRemoveWord, onToggleWord } = this.props;
        const color = isMemorized ? 'green' : 'red';
        return (
            <div>
                <h3 style={{ color }}>{ en }</h3>
                <p>{ vn }</p>
                <button onClick={() => onRemoveWord(_id)}>Remove</button>
                <button onClick={() => onToggleWord(_id)}>Toggle</button>
            </div>
        );
    }
}
