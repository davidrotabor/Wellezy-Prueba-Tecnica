'use client'

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { auth, GoogleAuthProvider, signInWithPopup } from "../../config/firebase";
import styles from "./login.module.sass";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const handleGoogleLogin = async (router: AppRouterInstance | string[]) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    router.push('/');
  } catch (error) {

  }
};

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Debes iniciar sesión</h1>
      <br />
      <button className={styles.button} onClick={() => handleGoogleLogin(router)}>
        Inicia sesión con Google
      </button>
    </div>
  );
}