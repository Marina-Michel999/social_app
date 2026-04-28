import { passFeedback } from "@/types/passwordFeedback";

export function checkPassStrength(password : string) {
    let strength = 0;
    const feedback : passFeedback ={text:"" , width: 0 , background:""}
    if (password.length>8) {
        strength++
    };
    if (/[A-Z]/.test(password)) {
        strength++
    };
    if (/[a-z]/.test(password)) {
        strength++
    };
    if (/[0-9]/.test(password)) {
        strength++
    };
    if (/[!@#$%^&*_-]/.test(password)) {
        strength++
    };
    if (password.length>12) {
        strength++
    };    
    switch (strength) {
    case 1:
        feedback.text='Very weak';
        feedback.background='red';
        feedback.width= 16.66
        break;
    case 2:
        feedback.text='Weak';
        feedback.background='orange';
        feedback.width= 33.33
        break;
    case 3:
        feedback.text='Fair';
        feedback.background='yellow';
        feedback.width= 50
        break;
    case 4:
        feedback.text='Good';
        feedback.background='green';
        feedback.width= 66.66
        break;
    case 5:
        feedback.text='Strong';
        feedback.background='green';
        feedback.width= 83.33
        break;
    case 6:
        feedback.text='Very strong';
        feedback.background='green';
        feedback.width= 100
        break;
 
}
return feedback
}
