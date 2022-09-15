song = '';
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(700, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.poseNet(video, modelLoaded);
    PoseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is Initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.y;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}

function draw() {
    image(video, 0, 0, 700, 600);

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY < 100) {
            document.getElementById("SpeedTag").innerHTML = "Speed: 0.5";
            song.rate(0.5);
        }
        if (rightWristY > 100 && rightWristY < 200) {
            document.getElementById("SpeedTag").innerHTML = "Speed: 1";
            song.rate(1);
        }
        if (rightWristY > 200 && rightWristY < 300) {
            document.getElementById("SpeedTag").innerHTML = "Speed: 1.5";
            song.rate(1.5);
        }
        if (rightWristY > 300 && rightWristY < 400) {
            document.getElementById("SpeedTag").innerHTML = "Speed: 2";
            song.rate(2);
        }
        if (rightWristY > 400 && rightWristY < 500) {
            document.getElementById("SpeedTag").innerHTML = "Speed: 2.5";
            song.rate(2.5);
        }
    }

    if (scoreLeftWrist > 0.2) {
        
        circle(leftWristX, leftWristY, 20);

        LeftWristNumber = Number(leftWristY);
        NewLeftWristNumber = floor(LeftWristNumber);
        volume = NewLeftWristNumber/500;
        document.getElementById("VolumeTag").innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }
}

function PlayMusic() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}