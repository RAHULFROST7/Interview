let startTime = null;
let endTime = null;
let questions = ["What is machine learning?", "What is Artificial Intelligence?", "What is data science?", "What is data structures?", "What is deep learning?"];
let answers1 = ["Ml is a branch of AI that involves developing algorithms and models that can learn from data and make predictions or decisions without being explicitly programmed. There are three main types of machine learning: supervised, unsupervised, and reinforcement learning.", "Artificial Intelligence (AI) refers to the ability of machines to perform tasks that typically require human-like intelligence, such as learning, reasoning, problem-solving, perception, and natural language processing.", "Data science is the art of turning data into actionable insights. It involves using data to answer business questions, identify opportunities for growth, and make informed decisions. This requires a combination of analytical skills, business acumen, and technical expertise", "A data structure is a way of organizing and storing data in a computer so that it can be accessed and used efficiently. Examples of data structures include arrays, linked lists, stacks, and queues", "Deep learning is a subset of machine learning that uses artificial neural networks with multiple layers to model and solve complex problems. It involves training these networks on large datasets to learn patterns and make predictions."]
let currentQuestionIndex = 0;
let i = 0;
let count = 0;
let randomQuestions = []
window.addEventListener("load", () => {
    console.log(questions.length);
    // console.log(document.getElementsByClassName("startButton").addEventListener);

    // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    //   const tab = tabs[0];
    //   document.getElementById("modify-iframe").addEventListener("click", () => {
    //     chrome.scripting.executeScript({
    //       target: {tabId: tab.id},
    //       function: () => {
    //         const iframe = document.getElementById("myIframe");
    //         if(iframe.style.width == "400px")
    //         {
    //           iframe.style.width = "100px";
    //         }
    //         else
    //         {
    //           iframe.style.width =  "400px";
    //         }
    //       }
    //     });
    //   });
    // });


    chrome.runtime.sendMessage({ command: "face" });
    fetch('http://localhost:3000/face')
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.log(error));

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    randomQuestions = shuffle(questions)

    console.log(randomQuestions);
    fetch('http://localhost:3000/ranques', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ques:randomQuestions })
    }).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err))



    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        document.getElementById("modify-iframe").addEventListener("click", () => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    const iframe = document.getElementById("myIframe");

                    const startingWidth = parseInt(iframe.style.width) || iframe.offsetWidth;
                    const targetWidth = startingWidth == 400 ? 80 : 400;
                    const duration = 250; // milliseconds
                    const startTime = performance.now();

                    function animate() {
                        const elapsedTime = performance.now() - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const newWidth = startingWidth + (targetWidth - startingWidth) * progress;
                        iframe.style.width = `${newWidth}px`;

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }

                    }

                    animate();
                }
            });
        });
    });
    // Store the initial display values of the hidden elements
    const hiddenElements = document.getElementsByClassName("hidden");
    const initialDisplays = [];
    for (let i = 0; i < hiddenElements.length; i++) {
        initialDisplays.push(hiddenElements[i].style.display);
    }

    // Add a click listener to the button
    // document.getElementById("modify-iframe").addEventListener("click", () => {
    //   for (let i = 0; i < hiddenElements.length; i++) {
    //     if (hiddenElements[i].style.display === "none") {
    //       hiddenElements[i].style.display = initialDisplays[i];
    //     } else {
    //       hiddenElements[i].style.display = "none";
    //     }
    //   }
    // });
    let prevBackground = null;
    const bodyStyle = window.getComputedStyle(document.body);
    const initialBackground = bodyStyle.getPropertyValue('background');

    document.getElementById("modify-iframe").addEventListener("click", () => {
        const arrowBtn = document.getElementById("modify-iframe");

        for (let i = 0; i < hiddenElements.length; i++) {
            if (hiddenElements[i].style.display === "none") {
                hiddenElements[i].style.display = initialDisplays[i];
            } else {
                hiddenElements[i].style.display = "none";
            }
        }

        if (prevBackground === null) {
            prevBackground = initialBackground;
        }

        if (document.body.style.background === "transparent") {
            document.body.style.background = prevBackground;
            prevBackground = null;
        } else {
            prevBackground = document.body.style.background;
            document.body.style.background = "transparent";
        }
    });



    //   function animate() {
    //   const elapsedTime = performance.now() - startTime;
    //   const progress = Math.min(elapsedTime / duration, 1);
    //   const newWidth = startingWidth + (targetWidth - startingWidth) * progress;
    //   iframe.style.width = `${newWidth}px`;

    //   // Get an array of all the body elements
    //   const bodyElements = Array.from(document.getElementsByTagName("body")[0].children);

    //   // If the iframe width is 400px, show all body elements except the button
    //   if (newWidth == 400) {
    //     bodyElements.forEach((element) => {
    //       if (element.id === "modify-iframe") {
    //         element.classList.remove("hidden");
    //       } else {
    //         element.classList.add("hidden");
    //       }
    //     });
    //   }
    //   // If the iframe width is 100px, hide all body elements
    //   else if (newWidth == 100) {
    //     bodyElements.forEach((element) => {
    //       element.classList.add("hidden");
    //     });
    //   }

    //   if (progress < 1) {
    //     requestAnimationFrame(animate);
    //   }
    // }

    function speech(text) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }

    // document.addEventListener('DOMContentLoaded', function () {
    //     var finishButton = document.getElementById('finish-button');
    //     finishButton.addEventListener('click', function () {
    //         chrome.runtime.sendMessage({ action: 'run_app' }, function (response) {
    //             var resultDiv = document.getElementById('result');
    //             resultDiv.textContent = response.result;
    //         });
    //     });
    // });

    function startTimestamp() {
        if ('speechSynthesis' in window) {
            speech('Welcome to the virtual interview i am Walter White, your AI interviewer, all the best for your interview and now lets begin with the first question ' + randomQuestions[i]);
        }
        else {
            console.log('chrome has no speech to text');
        }


        chrome.runtime.sendMessage({ command: "start" });
        //console.log('in start');
        startTime = new Date().getTime();
        //console.log("Start time: " + formatTimestamp(startTime));
        document.getElementsByClassName("startButton")[0].style.display = "none";
        document.getElementsByClassName("endButton")[0].style.display = "block";
        displayQuestion();
        fetch('http://localhost:3000/start')
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.log(error));
        count = 1



    }

    function endTimestamp() {

        // chrome.runtime.sendMessage({command: "app"});
        // fetch('http://localhost:3000/app')
        // .then(response => response.text())
        // .then(message => console.log(message))
        // .catch(error => console.log(error));

        if (count === 1) {
            speech('Your next question is ' + randomQuestions[1])
        }
        else if (count === 2) {
            speech('Your next question is' + randomQuestions[2])
        }
        else if (count === 3) {
            speech('Your next question is ' + randomQuestions[3])
        }
        else if (count === 4) {
            speech('The final question is ' + randomQuestions[4])
        }


        console.log(startTime);
        endTime = new Date().getTime();
        let duration = endTime - startTime;
        const formattedDuration = formatDuration(duration);
        let starttime = formatTimestamp(startTime);
        let endtime = formatTimestamp(endTime);
        console.log("Start time: " + formatTimestamp(startTime));
        console.log("End time: " + formatTimestamp(endTime));
        console.log(`question ${currentQuestionIndex + 1} duration : ${formattedDuration} `);

        fetch('http://localhost:3000/timestamps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start: starttime, end: endtime })
        }).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err))

        document.getElementsByClassName("endButton")[0].style.display = "block";
        document.getElementsByClassName("startButton")[0].style.display = "none";

        if (count < 4) {
            displayQuestion();
        }
        else if (count === 4) {
            displayQuestion();
            document.getElementsByClassName("endButton")[0].style.display = "none";
            document.getElementsByClassName("finishButton")[0].style.display = "block";
            document.getElementsByClassName("finishButton")[0].addEventListener("click", finish);
        }
        else {
            document.getElementsByClassName("endButton")[0].style.display = "none";
            document.getElementsByClassName("finishButton")[0].style.display = "block";
            document.getElementsByClassName("finishButton")[0].addEventListener("click", finish);
        }
        count++
        startTime = endTime;
    }

    function displayQuestion() {
        document.getElementsByClassName("question")[0].innerHTML = randomQuestions[count];
        document.getElementsByClassName("duration")[0].innerHTML = "";
    }

    function displayMessage(message) {
        document.getElementsByClassName("question")[0].innerHTML = message;
        document.getElementsByClassName("duration")[0].innerHTML = "";
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // function displayResult() {
    //   fetch('/test.py').then(response => {
    //     return response.json();
    //   }).then(data => {
    //     document.getElementsById('result').innerHTML = data.result;
    //   });
    // }

    function formatDuration(duration) {
        const milliseconds = parseInt((duration % 1000) / 100);
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));
        const parts = [];
        if (days > 0) {
            parts.push(`${days} day${days > 1 ? "s" : ""}`);
        }
        if (hours > 0) {
            parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
        }
        if (minutes > 0) {
            parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
        }
        if (seconds > 0) {
            parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
        }
        if (milliseconds > 0) {
            parts.push(`${milliseconds} millisecond${milliseconds > 1 ? "s" : ""}`);
        }
        return parts.join(", ");
    }

    function finish() {
        chrome.runtime.sendMessage({ command: "end" });
        fetch('http://localhost:3000/end')
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.log(error));



        endTime = new Date().getTime();
        duration = startTime - endTime
        let end_time = formatTimestamp(endTime)
        let start_time = formatTimestamp(startTime);

        fetch('http://localhost:3000/timestamps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start: start_time, end: end_time })
        }).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err))


        displayMessage("The interview is done!  View your Scores by clicking 'VIEW RESULTS'")
        document.getElementsByClassName("finishButton")[0].style.display = "none";
        document.getElementsByClassName("results")[0].style.display = "block";
        document.getElementsByClassName("results")[0].addEventListener("click", results);
    }

    function results() {

        chrome.runtime.sendMessage({ command: "app" });
        fetch('http://localhost:3000/app')
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.log(error));
        var xhr = new XMLHttpRequest();

        // open a GET request to the HTML file
        xhr.open('GET', 'final.html', true);

        // set the response type to document
        xhr.responseType = 'document';

        // send the request
        xhr.send();

        // listen for the onload event
        xhr.onload = function () {
            // check if the request was successful
            if (xhr.status === 200) {
                // get the HTML content from the response
                var htmlContent = xhr.response.documentElement.outerHTML;
                // display the HTML content on the page
                document.body.innerHTML = htmlContent;
            }
        };

        setInterval(() => {
            fetch("result.json")
                .then(response => response.json())
                .then(data => {
                    let table = "<tr><th>Question</th><th>Result</th><th>Remarks</th></tr>";
                    for (let i = 0; i < data.results.length; i++) {
                        let result = data.results[i].result;
                        if (result == '-1') {
                            let load = 'loading...'
                            table += `<tr><td>${data.results[i].question}</td><td>${load}</td><td>NIL</td></tr>`;

                        }
                        else {
                            if (result > 90) {
                                table += `<tr><td>${data.results[i].question}</td><td>${result}</td><td>GOOD</td></tr>`;

                            }
                            else {
                                table += `<tr><td>${data.results[i].question}</td><td>${result}</td><td>${answers1[i]}</td></tr>`;

                            }

                        }
                    }
                    document.getElementById("resultTable").innerHTML = table;
                });
        }, 1000);

    }



    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].url.includes("meet.google.com")) {
            displayMessage("Google Meet Extension");
            //console.log(document.getElementsByClassName("startButton").length); 
            document.getElementsByClassName("startButton")[0].style.display = "block";

            document.getElementsByClassName("endButton")[0].addEventListener("click", endTimestamp);
            document.getElementsByClassName("startButton")[0].addEventListener("click", startTimestamp);
        }
        else {
            displayMessage("This is a Google Meet Extension")
        }
    })

})