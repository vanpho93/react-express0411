import React, { Component } from 'react';
import axios from 'axios';
import Word from './Word';
import WordForm from './WordForm';

export default class ListWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: []
        };
        this.onAddWord = this.onAddWord.bind(this);
        this.onRemoveWord = this.onRemoveWord.bind(this);
        this.onToggleWord = this.onToggleWord.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/word')
        .then(res => this.setState({ words: res.data.words }))
        .catch(err => console.log(err));
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
