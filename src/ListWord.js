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
        axios.get('https://rn0411.herokuapp.com/word')
        .then(res => this.setState({ words: res.data.words }))
        .catch(err => console.log(err));
    }

    onAddWord(word) {
        const { words } = this.state;
        axios.post('https://rn0411.herokuapp.com/word', word)
        .then(res => this.setState({ words: words.concat(res.data.word) }))
        .catch(err => console.log(err));
        // this.setState({ words: words.concat(word) })
    }

    onRemoveWord(id) {
        axios.delete(`https://rn0411.herokuapp.com/word/${id}`)
        .then(() => {
            const { words } = this.state;
            this.setState({ words: words.filter(word => word._id !== id) });
        })
        .catch(err => console.log(err));
    }

    onToggleWord(word) {
        const data = { ...word, isMemorized: !word.isMemorized };
        axios.put('https://rn0411.herokuapp.com/word', data)
        .then(() => {
            const { words } = this.state;
            this.setState({ words: words.map(w => {
                if(w._id !== word._id) return w;
                return { ...w, isMemorized: !w.isMemorized }
            })});
        })
        // const { words } = this.state;
        // this.setState({ words: words.map(word => {
        //     if(word._id !== id) return word;
        //     return { ...word, isMemorized: !word.isMemorized }
        // })});
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
// https://www.youtube.com/watch?v=cUIOyVUquFI
// https://www.youtube.com/watch?v=yxf7_A2jAlQ

