
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      firstMin:25,
      lastMin: 5,
      secend: 0,
      timing: false,
    }
    this.decrementLastMin = this.decrementLastMin.bind(this);
    this.incrementLastMin = this.incrementLastMin.bind(this);
    this.decrementFistmin = this.decrementFistmin.bind(this);
    this.incrementFistmin = this.incrementFistmin.bind(this);
    this.startStop = this.startStop.bind(this);
    this.ChangeSec = this.ChangeSec.bind(this);
    this.startTiming = this.startTiming.bind(this);
    this.stopTiming = this.stopTiming.bind(this);
    this.reset = this.reset.bind(this);
    this.url = "https://bigsoundbank.com/UPLOAD/mp3/0023.mp3";
    this.audio = new Audio(this.url);

  }                                 /* Finish constructor and Start Functions */
  decrementLastMin(){
    if(this.state.lastMin > 0){
      this.setState({
        lastMin: this.state.lastMin -=1
      })
    }
  }
  incrementLastMin(){
    if(this.state.lastMin < 30){
      this.setState({
        lastMin: this.state.lastMin +=1
      })
    }
  }
  decrementFistmin(){
    if(this.state.firstMin > 0){
      this.setState({
        firstMin: this.state.firstMin -=1
      })
    }
  }
  incrementFistmin(){
    if(this.state.firstMin < 60){
      this.setState({
        firstMin: this.state.firstMin +=1
      })
    }else{
      this.setState({ secend : 0})
    }
  }                                /* Finish of Button Increment and Decrement */
  ChangeSec(){                            /*start Timing Machin*/
    if(this.state.secend > 0 ){
      this.setState({
        secend: this.state.secend -= 1
      })
      if(this.state.secend < 10){this.setState({secend: '0'+ this.state.secend})}
      if(this.state.secend == '00'){this.setState({secend: 0})};
    }else if (this.state.secend === 0 && this.state.firstMin !== 0){
      this.setState({
        secend: 59,
        firstMin: this.state.firstMin -= 1
      })
    }else if(this.state.firstMin === 0 && this.state.secend ===0){
      this.stopTiming();
      setTimeout(()=>{this.setState({
        firstMin: this.state.lastMin
      })
      this.startTiming();
      }, 5000)
      this.audio.play();
    } 
  }
  startTiming(){
    this.secVar = setInterval(this.ChangeSec,1000);
    this.setState({timing : true})
  }
  stopTiming(){
    clearInterval(this.secVar)
    this.setState({ timing: false})
  }
  startStop(){
    if(this.state.timing){
        this.stopTiming();
      }else{
        this.startTiming();
    }
  }                                   /* Finish Functions and Start Render() */
  reset(){
    this.stopTiming();
    this.setState({
      firstMin:25,
      lastMin: 5,
      secend: 0,
      timing: false,
    })
  }
  render(){       
    return(
      <div>
        <h1>زمان سنج</h1>
        <div id="flexiv">             {/* <!--its flex div to keep side by side -->*/}
          <div id="leftDiv">              {/*<!--Break State --> */}
            <h2 id="break-label">مدت زمان برگشتی</h2>
            <div id="leftOfLeft">
              <button id="break-decrement" onClick={this.decrementLastMin}><img src="https://img.icons8.com/metro/30/000000/minus.png" alt=''/></button>
              {this.state.lastMin}
              <button id="break-increment"  onClick={this.incrementLastMin}><img src="https://img.icons8.com/metro/30/000000/plus.png" alt=''/></button>
            </div>
          </div>                          {/*<!-- Session State -->*/}
          <div id="rightDiv">
            <h2 id="session-label">مدت زمان اولیه</h2>
            <div id="rightOfRight">
              <button id="session-decrement" onClick={this.decrementFistmin}><img src="https://img.icons8.com/metro/30/000000/minus.png" alt=''/></button>
              {this.state.firstMin}
              <button id="session-increment" onClick={this.incrementFistmin}><img src="https://img.icons8.com/metro/30/000000/plus.png" alt=''/></button>
            </div>
          </div>
        </div>                              {/*<!-- Showing Timer State -->*/}
        <div id="bordering" style={this.state.firstMin === 0 ? {color: 'darkred', border : 'solid 4px darkred', transition: '1s'}:{}}>
          <h2 id="timer-label">موعود</h2>
          <div id="tik">
            {this.state.firstMin}
            <div id="TikTak" style={this.state.timing ?{'animation-name':'tiktok'}:{}}> :
            </div>
            {this.state.secend}
          </div>
        </div>
        <div>                               {/*<!-- Btn of Timer -->*/}
          <button id="start_stop" onClick={this.startStop}><img src="https://img.icons8.com/ios-filled/30/000000/resume-button.png" alt=''/></button>
          <button id="reset" onClick={this.reset}><img src="https://img.icons8.com/ios-filled/30/000000/refresh.png" alt=''/></button>
        </div>
        <p id='author'>disigne & code by mahdi bayat</p>
      </div>
    )
  }
}
ReactDOM.render(<Timer />, document.getElementById('root'))