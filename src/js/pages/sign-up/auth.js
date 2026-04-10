import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from '../../firebase/firebase.js';

const signUpForm = document.querySelector('.sign-up__form');

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const avatarFile = document.getElementById('file').files[0];

    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        let photoURL = "";
        if (avatarFile) {
            const storageRef = ref(storage, `avatars/${user.uid}`);
            await uploadBytes(storageRef, avatarFile);
            photoURL = await getDownloadURL(storageRef);
        }

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            fio: document.getElementById('name').value,
            email: email,
            phone: document.getElementById('tel').value,
            country: document.getElementById('country').value,
            region: document.getElementById('region').value,
            city: document.getElementById('city').value,
            address: document.getElementById('adress').value,
            isFop: signUpForm.fop.checked,
            photoURL: photoURL,
            createdAt: new Date()
        });

        signUpForm.reset();

        alert("Регистрация прошла успешно!");

    } catch (error) {
        console.error("Ошибка при регистрации:", error.message);
        alert("Ошибка: " + error.message);
    }
});
