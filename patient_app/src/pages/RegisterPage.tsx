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
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { register } = useAuth();

  const handleChange = (field: keyof typeof formData) => (
    e: CustomEvent
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.detail.value!,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      history.replace('/main');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="register-container">
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Please fill in your details to register</p>
          </div>
          <form onSubmit={handleRegister} className="register-form">
            <IonItem>
              <IonLabel position="floating">First Name</IonLabel>
              <IonInput
                value={formData.firstName}
                onIonChange={handleChange('firstName')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Last Name</IonLabel>
              <IonInput
                value={formData.lastName}
                onIonChange={handleChange('lastName')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={handleChange('email')}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onIonChange={handleChange('password')}
                required
              />
              <IonIcon
                slot="end"
                icon={showPassword ? eyeOff : eye}
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onIonChange={handleChange('confirmPassword')}
                required
              />
            </IonItem>

            {error && (
              <IonText color="danger" className="error-message">
                {error}
              </IonText>
            )}

            <div className="ion-padding">
              <IonButton expand="block" type="submit" disabled={isLoading} className="register-button">
                Register
              </IonButton>
              <div className="login-link">
                <IonButton
                  fill="clear"
                  routerLink="/login"
                >
                  Already have an account? Login
                </IonButton>
              </div>
            </div>
          </form>
        </div>

        <IonLoading isOpen={isLoading} message="Registering..." />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage; 