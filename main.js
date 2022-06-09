Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xKP7zp0u7/model.json', modelLoaded);

function modelLoaded() {
    console.log('model loaded!');
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        gesture = results[0].label;

        toSpeak = "";
        if (gesture == "fist") {
            toSpeak = "is this a fist";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9994;";
        } else if (gesture == "high five") {
            toSpeak = "is this a high five";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9995;";
        } else if (gesture == "thumbs up") {
            toSpeak = "is this a thumbs up";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
        } else if (gesture == "thumbs down") {
            toSpeak = "is this a thumbs down";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128078;";
        } else if (gesture == "flat hand") {
            toSpeak = "is this a flat hand";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128400;";
        }
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}