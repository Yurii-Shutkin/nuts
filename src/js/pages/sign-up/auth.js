import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from '../../firebase/firebase.js';

const signUpForm = document.querySelector('.sign-up__form');
let isSubmitting = false;

async function submitSignUpForm() {
    if (isSubmitting) {
        return;
    }
    isSubmitting = true;

    try {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const avatarFile = document.getElementById('file').files[0];
        const name = document.getElementById('name').value.trim();
        const tel = document.getElementById('tel').value.trim();
        const country = document.getElementById('country').value.trim();
        const region = document.getElementById('region').value.trim();
        const city = document.getElementById('city').value.trim();
        const address = document.getElementById('adress').value.trim();
        const isFop = signUpForm.fop.checked;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        let photoURL = "";
        if (avatarFile) {
            try {
                const storageRef = ref(storage, `avatars/${user.uid}/${avatarFile.name}`);
                await uploadBytes(storageRef, avatarFile);
                photoURL = await getDownloadURL(storageRef);
            } catch (storageError) {
                console.error("Ошибка при загрузке аватара:", storageError);
            }
        }

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            fio: name,
            email: email,
            phone: tel,
            country: country,
            region: region,
            city: city,
            address: address,
            isFop: isFop,
            photoURL: photoURL,
            createdAt: new Date()
        });

        signUpForm.reset();
        alert("Регистрация прошла успешно!");
    

    } catch (error) {
        let errorMessage = "Ошибка при регистрации";
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "Этот email уже зарегистрирован";
                break;
            case 'auth/weak-password':
                errorMessage = "Пароль слишком слабый. Минимум 6 символов";
                break;
            case 'auth/invalid-email':
                errorMessage = "Некорректный email адрес";
                break;
            case 'auth/operation-not-allowed':
                errorMessage = "Операция не разрешена. Обратитесь в поддержку";
                break;
            default:
                errorMessage = error.message || "Неизвестная ошибка при регистрации";
        }
        
        console.error("Ошибка регистрации:", error);
        alert("❌ " + errorMessage);
    } finally {
        isSubmitting = false;
    }
}

window.submitSignUpForm = submitSignUpForm;
