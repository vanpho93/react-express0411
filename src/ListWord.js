import React, { Component } from 'react';
import Word from './Word';
import WordForm from './WordForm';

export default class ListWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [
                {
                    "_id": "5a22055ad32c6d0d16d58963",
                    "vn": "MOT",
                    "en": "one",
                    "__v": 0,
                    "isMemorized": true
                },
                {
                    "_id": "5a2220260af2f816490b4762",
                    "en": "four",
                    "vn": "bon",
                    "__v": 0,
                    "isMemorized": false
                }
            ]
        };
        this.onAddWord = this.onAddWord.bind(this);
        this.onRemoveWord = this.onRemoveWord.bind(this);
        this.onToggleWord = this.onToggleWord.bind(this);
    }

    onAddWord(word) {
        const { words } = this.state;
        this.setState({ words: words.concat(word) })
    }

    onRemoveWord(id) {
        const { words } = this.state;
        this.setState({ words: words.filter(word => word._id !== id) });
    }

    onToggleWord(id) {
        const { words } = this.state;
        this.setState({ words: words.map(word => {
            if(word._id !== id) return word;
            return { ...word, isMemorized: !word.isMemorized }
        })});
    }

    render() {
        return (
            <div>
                <WordForm onAddWord={this.onAddWord} />
                {this.state.words.map(word => (
                    <Word
                        key={word._id}
                        word={word} 
                        onRemoveWord={this.onRemoveWord}
                        onToggleWord={this.onToggleWord}
                    />
                ))}
            </div>
        );
    }
}
