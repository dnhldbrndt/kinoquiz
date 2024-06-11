import React, { Component } from 'react'
import {QuizData} from './QuizData'
import './assets/styles.css'

export class Quiz extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            userAnswer: null,
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true,     
        }
    }

    loadQuiz = () =>  {
        const {currentIndex} = this.state;
        this.setState(() => {
            return {
                question: QuizData[currentIndex].question, 
                options: QuizData[currentIndex].options,
                answer: QuizData[currentIndex].answer
            }
        })
    }

    nextQuestionHandler = () => {
        const  {userAnswer, answer, score} = this.state

        if (userAnswer === answer) {
            this.setState({score: score + 1})
            
        }
        this.setState({
            currentIndex: this.state.currentIndex + 1, 
            userAnswer: null
        })
    }

    componentDidMount() {
        this.loadQuiz();
    }

    checkAnswer = answer => {
        this.setState({userAnswer: answer, 
            disabled: false})
    }

    componentDidUpdate(prevProps, prevState){
        const{currentIndex} = this.state;
        if(this.state.currentIndex !== prevState.currentIndex){
            this.setState(() => {
                return {
                question: QuizData[currentIndex].question, 
                options: QuizData[currentIndex].options, 
                answer: QuizData[currentIndex].answer}
            });
        }
    }
    finishHandler = (   ) =>{
        const {userAnswer, answer, score} = this.state
        if (userAnswer === answer) {this.setState({score: score +1})}
        if(this.state.currentIndex === QuizData.length -1) {
            this.setState({quizEnd:true})
        }

    }


    render() {
        const{question, options, currentIndex, userAnswer, quizEnd} = this.state
		let points = "";
        if (this.state.score > 1 || this.state.score === 0) {
			 points = "points";
		} else {
			 points = "point";
		}
        if (quizEnd){
            return(    
				<div>
					<h1> Game Over. Final score is {this.state.score} { points }.</h1>
					<p> Try again?!</p>
                </div>
            )
        }
        
        return (
            <div>
               <h1> Kino Quiz</h1>
               <h2>{question}</h2> 
               <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
                    {
                        options.map(option =>
                                <p key = {option.id} className={`options ${userAnswer === option? "selected" : null}`}
                                onClick = {() => this.checkAnswer(option)}
                                > 
                                     {option} 
                                </p>
                            )

                    }

                    {currentIndex < QuizData.length - 1 && <button class="btn" disabled= {this.state.disabled} onClick={this.nextQuestionHandler}>
                        Next Question
                    </button> }
                    {currentIndex === QuizData.length - 1 && <button class="btn" onClick = {this.finishHandler} disabled = {this.state.disabled}> Finish </button>}
            </div>
        )
    }
}

export default Quiz
