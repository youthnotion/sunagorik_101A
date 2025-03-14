FBInstant.initializeAsync().then(() => {
    const googleFont = new FontFace(
        'Oswald',
        'url(https://fonts.gstatic.com/s/oswald/v53/TK3iWkUHHAIjg752GT8G.woff2)'
    );

    googleFont.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        console.log('Font loaded:', loadedFont);
        return document.fonts.ready;
    }).then(() => {
        console.log('Font is ready');
        return preloadImages();
    }).then(() => {
        FBInstant.setLoadingProgress(100);
        return FBInstant.startGameAsync();
    }).then(() => {
        console.log("Game started");
    }).catch((error) => {
        console.error('Error during initialization:', error);
    });
});

const firebaseConfig = {
    apiKey: "AIzaSyB4Pz--PR2t0AM_9f3Zy8EOJlUsqroIa8E",
    authDomain: "sunagorik-io.firebaseapp.com",
    projectId: "sunagorik-io",
    storageBucket: "sunagorik-io.firebasestorage.app",
    messagingSenderId: "712940291812",
    appId: "1:712940291812:web:eab16c3a505e1f52ff4ef1"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();

const questions = [
    {
        image: "./assets/resizedQuestions/Q 1.png",
        question: "আপনার এলাকার পানের দোকানের পাশে প্লাস্টিকের বোতল ফেলা কি আপনার নাগরিক অধিকার?",
        options: [
            { text: "হ্যাঁ, এটা কাউকে কাজ দেয়, আমি সাহায্য করছি!", score: -15 },
            { text: "না, প্লাস্টিক ব্যাগ সাথে নিয়ে ডাস্টবিনে ফেলি।", score: +15 },
            { text: "মাঝে মাঝে না চাইতেও হয়ে যায়।", score: -5 }
        ]
    },
    {
        image: "./assets/resizedQuestions/Q 2.png",
        question: "আপনার কি মনে হয় পাবলিক টয়লেট ব্যবহারের চেয়ে রাস্তাই ভালো?",
        options: [
            { text: "হ্যাঁ, খোলা আকাশের নিচে বেশি আরাম।", score: -20 },
            { text: "না, টয়লেট ব্যবহারে লজ্জা নেই।", score: +15 },
            { text: "শুধু টয়লেট খুঁজে না পেলে।", score: -10 }
        ]
    },
    {
        image: "./assets/resizedQuestions/q 3.png",
        question: "পাবলিক বাসে কি নারী ও প্রবীণদের সিট ছেড়ে দেন?",
        options: [
            { text: "না, সিট আমার রাজত্ব।", score: -15 },
            { text: "হ্যাঁ, সিট ছেড়ে দিতে গর্ব হয়।", score: +20 },
            { text: "কখনো কখনো, যদি দাঁড়াতে ইচ্ছে হয়।", score: 0 }
        ]
    },
    {
        image: "./assets/resizedQuestions/q4.png",
        question: "আপনি কি পার্কে বেড়াতে গিয়ে খাবারের প্যাকেট রেখে আসেন?",
        options: [
            { text: "হ্যাঁ, এটাই তো পিকনিকের মজা।", score: -15 },
            { text: "না, ময়লা সাথে নিয়ে আসি।", score: +20 },
            { text: "কখনো ভুলে রেখে আসি।", score: -5 }
        ]
    },
    {
        image: "./assets/resizedQuestions/q5.jpeg",
        question: "রাস্তায় কাউকে মারতে বা ভাংচুর করতে দেখলে আপনি কি করেন?",
        options: [
            { text: "ভিডিও করি।", score: -10 },
            { text: "পাশ কাটায়ে যাই।", score: 0 },
            { text: "গিয়ে আমিও দু চার ঘা মেরে আসি।", score: +15 }
        ]
    },
    {
        image: "./assets/resizedQuestions/q 6.png",
        question: "আপনার কি মনে হয় স্কুল-কলেজের দেয়ালে পোস্টার লাগানো আর্ট?",
        options: [
            { text: "হ্যাঁ, প্রচারের জন্য জায়গা দরকার।", score: -10 },
            { text: "না, এটা দৃষ্টিকটু।", score: +10 },
            { text: "শুধু জরুরি হলে।", score: -5 }
        ]
    },
    {
        image: "./assets/resizedQuestions/q 7.png",
        question: "আপনি কি ভিড়ের মধ্যে আগে যাওয়ার জন্য ধাক্কা মারা নিজের ‘প্রফেশনাল স্কিল’ ভাবেন?",
        options: [
            { text: "হ্যাঁ, আগে যাওয়াই আসল।", score: -15 },
            { text: "না, আমি লাইনে দাঁড়াই।", score: +15 },
            { text: "যখন খুব জরুরি, তখন সামান্য করি।", score: -5 }
        ]
    },
    {
        image: "./assets/resizedQuestions/q 8.png",
        question: "আপনি কি ময়লা ফেলার সময় ‘ময়লা যেমন তেমন জায়গায় ফেলো’ এই তত্ত্বে বিশ্বাসী?",
        options: [
            { text: "অবশ্যই! কারণ মাটি সবকিছু নেয়।", score: -20 },
            { text: "না, নির্ধারিত জায়গাতেই ফেলি।", score: +20 },
            { text: "যদি ডাস্টবিন অনেক দূরে থাকে, তখন এখানে-ওখানে।", score: -10 }
        ]
    },
    {
        image: "./assets/resizedQuestions/q 9.png",
        question: "আপনি কি মনে করেন ‘ট্যাক্স’ দেওয়া শুধু বড়লোকদের দায়িত্ব?",
        options: [
            { text: "হ্যাঁ, আমার টাকা বাঁচাতে হবে।", score: -20 },
            { text: "না, ট্যাক্স দেওয়া আমার নাগরিক দায়িত্ব।", score: +20 },
            { text: "শুধু সরকার যদি কাজে লাগায়।", score: -5 }
        ]
    },
    {
        image: "./assets/resizedQuestions/q 10.png",
        question: "আপনি কি ট্রাফিক লাইটে লাল সংকেত দেখে নিজেকে ‘আমি VIP’ ভাবেন?",
        options: [
            { text: "হ্যাঁ, লাল সংকেত VIP-দের জন্য নয়।", score: -20 },
            { text: "না, আমি ধৈর্য ধরে অপেক্ষা করি।", score: +20 },
            { text: "শুধু যখন রাস্তাটা খালি থাকে।", score: -10 }
        ]
    },
    {
        image: "./assets/resizedQuestions/11.png",
        question: "আপনি কি নিজের এলাকায় রাস্তায় আলোর খুঁটি ঠিক না থাকলে অভিযোগ করেন?",
        options: [
            { text: "হ্যাঁ, আমি নাগরিক অধিকার নিয়ে সচেতন।", score: +20 },
            { text: "না, আমার কি যায় আসে?", score: -10 },
            { text: "কখনো ভাবিনি।", score: 0 } 
        ]
    }
];

const results = [
    { 
        minScore: 90, 
        title: 'অলরাউন্ডার সুনাগরিক', 
        icon: '🏅',
        imgs: ["./assets/resizedAward/01_Allrounder Sunagorik 1.png"]
    },
    { 
        minScore: 70, 
        title: 'Pookie সুনাগরিক', 
        icon: '🥹🎀',
        imgs: ["./assets/resizedAward/02_Pookie Sunagorik 1.jpg", "./assets/resizedAward/02_Pookie Sunagorik 2.jpg", "./assets/resizedAward/02_Pookie Sunagorik 3.jpeg"]
    },
    { 
        minScore: 50, 
        title: 'প্রেমিক সুনাগরিক', 
        icon: '🥰',
        imgs: ["./assets/resizedAward/03_Premik Sunagorik 01.jpeg", "./assets/resizedAward/03_Premik Sunagorik 02.jpg", "./assets/resizedAward/03_Premik sunagorik 03.jpg"] 
    },
    { 
        minScore: 30, 
        title: 'ইন্টেরিম সুনাগরিক', 
        icon: '⌛',
        imgs: ["./assets/resizedAward/04_Majhemodhye Sunagorik 02.jpeg", "./assets/resizedAward/04_Majhemodhye Sunagorik 03.jpg", "./assets/resizedAward/04_majhemodhye sunagorik.png"]
    },
    { 
        minScore: 0, 
        title: 'পল্টিবাজ সুনাগরিক', 
        icon: '🤸',
        imgs: ["./assets/resizedAward/05_Poltibaj sunagorik 2.jpeg", "./assets/resizedAward/05_Poltibaj sunagorik 3.jpeg", "./assets/resizedAward/05_Poltibaj sunagorik.png"]
    },
    { 
        minScore: -20, 
        title: 'ঘুমন্ত সুনাগরিক', 
        icon: '😴',
        imgs: ["./assets/resizedAward/06_Ghumonto sunagorik 02.jpeg", "./assets/resizedAward/06_ghumonto sunagorik 03.jpeg", "./assets/resizedAward/06_ghumonto sunagorik.png"] 
    },
    { 
        minScore: Number.MIN_SAFE_INTEGER, 
        title: 'ডেড ইনসাইড সুনাগরিক', 
        icon: '😵',
        imgs: ["./assets/resizedAward/07_Ded inside sunagorik 1.jpeg", "./assets/resizedAward/07_Ded inside sunagorik 2.webp", "./assets/resizedAward/07_Ded inside sunagorik 3.png"] 
    },
];

const preloadedImages = [];
let loadedImages = 0;
const totalImages = questions.length + results.reduce((acc, result) => acc + result.imgs.length, 0);

function preloadImages() {
    return new Promise((resolve) => {
        if (totalImages === 0) {
            resolve();
            return;
        }

        function updateProgress() {
            const progress = Math.round((loadedImages / totalImages) * 100);
            FBInstant.setLoadingProgress(progress);
            if (loadedImages === totalImages) {
                resolve();
            }
        }

        questions.forEach(q => {
            const img = new Image();
            img.src = q.image;
            img.onload = () => {
                loadedImages++;
                updateProgress();
            };
            preloadedImages.push(img);
        });

        results.forEach(result => {
            result.imgs.forEach(imgSrc => {
                const img = new Image();
                img.src = imgSrc;
                img.onload = () => {
                    loadedImages++;
                    updateProgress();
                };
                preloadedImages.push(img);
            });
        });
    });
}


let currentQuestion = 0;
let totalScore = 0;

const startSec = getElementbyID("start");
const startBtn = getElementbyID("start-btn");
const quizSec = getElementbyID("quiz");
const resultSec = getElementbyID("result");
const retryBtn = getElementbyID("retry-btn");
const skipBtn = getElementbyID('skip-email-btn')
const submitBtn = getElementbyID('submit-email-btn');
const emailSec = getElementbyID("email-collection");
const shareBtn = getElementbyID('share-btn');

startBtn.addEventListener('click', startQuiz);
retryBtn.addEventListener('click', retryQuiz);
skipBtn.addEventListener('click', showResult);
submitBtn.addEventListener('click', emailSubmit);
shareBtn.addEventListener('click', shareGame);


function getElementbyID(id) {
    return document.getElementById(id);
}

function hideComponent(comp) {
    if(!comp.classList.contains("hidden")){
        comp.classList.add("hidden")
    }
}

function showComponent(comp) {
    if(comp.classList.contains("hidden")){
        comp.classList.remove("hidden")
    }
}


function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showCustomDialog(message) {
    const dialog = getElementbyID('custom-dialog');
    const dialogMessage = getElementbyID('dialog-message');
    const dialogOk = getElementbyID('dialog-ok');

    dialogMessage.textContent = message;
    dialog.classList.remove("hidden");

    const hideDialog = () => {
        dialog.classList.add("hidden");
    };

    dialogOk.addEventListener('click', hideDialog);

    setTimeout(() => {
        if (!dialog.classList.contains("hidden")) {
            hideDialog();
        }
    }, 3000);
}

function emailSubmit() {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        showCustomDialog('অনুগ্রহ করে সঠিক ই-মেইলটি দিন!');
        return;
    }

    const userData = {
        email: email,
        score: totalScore,
        timestamp: new Date().toISOString()
    };

    database.collection('participant-emails').add(userData)
    .then(() => {
        showCustomDialog('আপনার ই-মেইল প্রদানের জন্য ধন্যবাদ!');
        document.getElementById('email').value = '';
        showResult();
    })
    .catch((error) => {
        showCustomDialog('একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন!');
        console.error('Error submitting email: ', error);
    });
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const imageElement = document.querySelector('.image-box img');
    const progressBar = document.querySelector('.progress-bar div');

    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    const preloadedImg = preloadedImages.find(img => img.src.includes(question.image));
    imageElement.src = preloadedImg ? preloadedImg.src : question.image;
    optionsElement.innerHTML = '';

    const shuffledOptions = shuffle([...question.options]);
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = `option`;
        button.textContent = option.text;
        button.onclick = () => handleAnswer(option.score);
        optionsElement.appendChild(button);
    });

    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function handleAnswer(score) {
    totalScore += score;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showEmailCol();
    }
}

let randomImgSrc;
let preloadedResultImg;
let result;

function showResult() {
    hideComponent(emailSec);
    showComponent(resultSec);
    const image = document.querySelector('.resImg');
    const resultTitle = document.querySelector('.result-title');
    const badge = document.querySelector('.badge');


    result = results.find(r => totalScore >= r.minScore);

    randomImgSrc = result.imgs[Math.floor(Math.random() * result.imgs.length)];
    preloadedResultImg = preloadedImages.find(img => img.src.includes(randomImgSrc));
    image.src = preloadedResultImg ? preloadedResultImg.src : randomImgSrc;

    resultTitle.textContent = result.title;
    badge.textContent = result.icon;

    hideComponent(quizSec);
    showComponent(resultSec);
}

function startQuiz() {
    hideComponent(startSec);
    shuffle(questions);
    loadQuestion();
    showComponent(quizSec);
}

function retryQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    hideComponent(resultSec);
    showComponent(startSec);
}

function shareGame() {
<<<<<<< HEAD
    const userPic = FBInstant.player.getPhoto();
    const userName = FBInstant.player.getName();
=======
    const result = results.find(r => totalScore >= r.minScore);
    const randomImgSrc = result.imgs[Math.floor(Math.random() * result.imgs.length)];
    const preloadedResultImg = preloadedImages.find(img => img.src.includes(randomImgSrc));
    const userPic = FBInstant.player.getPhoto(); // Get user profile picture
    const userName = FBInstant.player.getName();
    console.log("User Pic:", userPic);
    console.log("User Name:", userName);
    console.log("Preloaded Image:", preloadedResultImg ? preloadedResultImg.src : randomImgSrc);
>>>>>>> c4a9707c3c0e33867bf5955252be4eb63f3bbb16

    function generateShareImage(callback) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

<<<<<<< HEAD
        canvas.width = 800;
        canvas.height = 800;
=======
        canvas.width = 800;  // Adjust as needed
        canvas.height = 800;  // Adjust as needed
>>>>>>> c4a9707c3c0e33867bf5955252be4eb63f3bbb16

        let bgImage = new Image();
        bgImage.src = preloadedResultImg ? preloadedResultImg.src : randomImgSrc;
        bgImage.crossOrigin = 'Anonymous';

        bgImage.onload = function () {
<<<<<<< HEAD
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

            let profileSize = 115;
            let profileX = 340;
            let profileY = canvas.height - 250;

            ctx.font = "bold 50px Oswald, Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#FFFFFF";

            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 8;

            ctx.strokeText(userName, 400, profileY + profileSize + 45);
            ctx.fillText(userName, 400, profileY + profileSize + 45);

            ctx.strokeText(`আমি ${result.title} ${result.icon}`, 400, profileY + profileSize + 100);
            ctx.fillText(`আমি ${result.title} ${result.icon}`, 400, profileY + profileSize + 100);

=======
            // Draw user's profile image
>>>>>>> c4a9707c3c0e33867bf5955252be4eb63f3bbb16
            let profileImg = new Image();
            profileImg.src = userPic;
            profileImg.crossOrigin = 'Anonymous';

            profileImg.onload = function () {
<<<<<<< HEAD
                ctx.beginPath();
                ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2 + 5, 0, Math.PI * 2);
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 8;
                ctx.stroke();
                ctx.closePath();
=======

                ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

                let profileSize = 120;
                let profileX = 340;
                let profileY = canvas.height - 350;
>>>>>>> c4a9707c3c0e33867bf5955252be4eb63f3bbb16

                ctx.beginPath();
                ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
<<<<<<< HEAD

                ctx.drawImage(profileImg, profileX, profileY, profileSize, profileSize);
        
=======
                ctx.drawImage(profileImg, profileX, profileY, profileSize, profileSize);
                ctx.restore();

                // Save the canvas state
                ctx.save();

                // Draw user name (just below the profile image)
                ctx.fillStyle = "#FF0000";
                ctx.font = "bold 40px Arial";
                ctx.textAlign = "center";

                textY = 200;
                textX = 200;

                // Debugging text settings
                console.log("Font Settings:", ctx.font, ctx.textAlign, ctx.fillStyle);

                // Adjust text position to make sure it's centered
                ctx.fillText(userName, textX, textY);

                // Debugging text drawing
                console.log("Drawing user name at:", textX, textY);
                
                // Draw score on the next line under the user name
                ctx.fillText(`আমি ${result.title}`, textX + 50, textY + 90);  // Adjusted to next line
                
                // Debugging text drawing
                console.log("Drawing score at:", textX + 50, textY + 90);

                // Restore the canvas state
                ctx.restore();
                
                // Convert canvas to Base64 image
>>>>>>> c4a9707c3c0e33867bf5955252be4eb63f3bbb16
                let dataURL = canvas.toDataURL("image/png");
                callback(dataURL);
            };
            profileImg.onerror = function() {
                console.error('Profile image failed to load');
            };
        };
        bgImage.onerror = function() {
            console.error('Background image failed to load');
        };
    }

    generateShareImage((base64Image) => {
        const payload = {
            intent: 'SHARE',
            image: base64Image,
            text: `আমি ${result.title}!\nআপনি কত ভালো সুনাগরিক? পরীক্ষা করে দেখুন!`,
            data: {
                myResult: result.title,
                score: totalScore
            }
        };
<<<<<<< HEAD
=======
        console.log('Payload:', payload);
>>>>>>> c4a9707c3c0e33867bf5955252be4eb63f3bbb16
    
        if (FBInstant.shareAsync) {
            FBInstant.shareAsync(payload)
            .then(() => console.log('Share Successful!'))
            .catch(error => console.error('Error sharing: ', error));
        } else {
            console.error('FBInstant.shareAsync is not available.');
        }        
    });
}

function showEmailCol() {
    hideComponent(quizSec);
    showComponent(emailSec);
}

