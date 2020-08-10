//Coding for start and reset:
var playing = false;
var score;
var action;
var timeremain;
var answer;

//if we click on the start button:
document.getElementById("start").onclick = function(){
    //if we already playing:
    if(playing === true){
        resetQuiz();
//        location.reload();//for reload the page
    }
    else{
        //if we are not playing:
        
        //for change to playing mode:
        playing = true;
        
        //set score to zero:
        score = 0;
        document.getElementById("scoreval").innerHTML = score;
        
        //for show time remaining:
        document.getElementById("time").style.display = "block";
        timeremain = 50;
        document.getElementById("timer").innerHTML = timeremain;
        
        //for hide gameover div when the game is over:
        document.getElementById("gameover").style.display = "none";
        
        //for change button to reset:
        document.getElementById("start").innerHTML = "Reset Quiz";
        
        // function for start the countdown:
        countdown();
        
        //function for generates Questions and multiple answers:
        generateQA();
    }
};


//function for confirm reset:
function resetQuiz(){
    var con = confirm("Are you sure to reset the quiz?");
    if(con === true){
        location.reload();
    }
}


//for the function for countdown:
function countdown(){
    action = setInterval(function(){
        timeremain -= 1;
        document.getElementById("timer").innerHTML = timeremain;
        
        //for stop countdown:
        if(timeremain == 0){
            clearInterval(action);
            
            //fow showing gameover div:
            document.getElementById("gameover").style.display = "block";
            
            //for showing gameover msg:
            document.getElementById("gameover").innerHTML = "<p>Time Over!</p><p>Your score is " + score +".</p>";
            
            //for when game is over the timer will be hidden:
            document.getElementById("time").style.display = "none";
            
            //for hide the question div HTML:
            document.getElementById("question").innerHTML = null;
            
            //for hide the options HTML:
            var opts = document.getElementsByClassName("opt");
            for(var i = 0; i < opts.length; i++){
                opts[i].innerHTML = null;
            }
            
            //for hide the correct and try again box when the game is over:
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "none";
            playing = false;
            document.getElementById("start").innerHTML = "Start Game";
        }
    }, 1000);
}

//function for generates questions and multiple answers:
function generateQA(){
    var x = Math.round(Math.random()*14)+1;
    var y = Math.round(Math.random()*9)+1;
    answer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    
    //for positioning the correct answer in the random box:
    var position = 1+Math.round(3*Math.random());
    document.getElementById("opt" + position).innerHTML = answer;
    
    //for filled other options by wrong answers:
    var allanswers = [answer];
    for(var i = 1; i<5; i++){
        if(i !== position){
            var wronganswer;
            do{
                wronganswer = (Math.round(Math.random()*14)+1) * (Math.round(Math.random()*9)+1); //this will generates the wrong answer.
            }while(allanswers.indexOf(wronganswer) > -1);
            
            document.getElementById("opt"+i).innerHTML = wronganswer;
            allanswers.push(wronganswer);
        }
    }
}

//for click on an answer:
//we use for-loop for all options:
for(var j=1; j<5; j++){
    document.getElementById("opt" + j).onclick = function(){
    if(playing === true){
        if(this.innerHTML == answer){
            //so increase the score by 1:
            score++;
            //to store the value in the score box:
            document.getElementById("scoreval").innerHTML = score;
            //and now hide try agin msg and show the correct msg:
            document.getElementById("wrong").style.display = "none";
            document.getElementById("correct").style.display = "block";
            //for show correct msg just for 1 second and hide:
            setTimeout(function(){document.getElementById("correct").style.display = "none";},1000);
            //and generate new random question:
            generateQA();
        }
        else{
            //show the try again msg and hide the correct msg:
            document.getElementById("wrong").style.display = "block";
            document.getElementById("correct").style.display = "none";
            //for show try again msg just for 1 second and hide:
            setTimeout(function(){document.getElementById("wrong").style.display = "none";},1000);
        }
    }
}
}



















