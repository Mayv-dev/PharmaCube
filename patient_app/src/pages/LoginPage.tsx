import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonLoading,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  const { login } = useAuth();

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      const { from } = location.state || { from: { pathname: '/main' } };
      history.replace(from);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="login-container">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Please sign in to continue</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={e => setEmail(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type={showPassword ? 'text' : 'password'}
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                required
              />
              <IonIcon
                slot="end"
                icon={showPassword ? eyeOff : eye}
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              />
            </IonItem>

            {error && (
              <IonText color="danger" className="error-message">
                {error}
              </IonText>
            )}

            <div className="ion-padding">
              <IonButton expand="block" type="submit" disabled={isLoading} className="login-button">
                Login
              </IonButton>
              <div className="register-link">
                <IonButton
                  fill="clear"
                  routerLink="/register"
                >
                  Don't have an account? Register
                </IonButton>
              </div>
            </div>
          </form>
        </div>

        <IonLoading isOpen={isLoading} message="Logging in..." />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage; 