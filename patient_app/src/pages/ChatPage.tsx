import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import axios from 'axios';

const ChatPage: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...newMessages,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiReply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error: any) {
      console.error('❌ OpenAI API Error:', error);

      if (error.response) {
        console.error('🔴 Status:', error.response.status);
        console.error('📦 Data:', error.response.data);
      } else if (error.request) {
        console.error('📡 No response:', error.request);
      } else {
        console.error('⚠️ Error:', error.message);
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Try again.' },
      ]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AI Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {messages.map((msg, i) => (
            <IonItem key={i}>
              <IonLabel>
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <div style={{ padding: 10 }}>
          <IonInput
            placeholder="Type a message"
            value={userInput}
            onIonChange={(e) => setUserInput(e.detail.value!)}
          />
          <IonButton expand="block" onClick={sendMessage}>
            Send
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChatPage;
