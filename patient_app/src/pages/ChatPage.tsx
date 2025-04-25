import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
} from '@ionic/react';
import axios from 'axios';

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
};

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
            {
              role: 'system',
              content: `You are a healthcare triage assistant embedded in a patient medication app. 
Classify each user message as GREEN, YELLOW, or RED based on how serious and urgent the health concern is.
Then give a short, clear response that matches the tone and urgency of that category.

Here is the patient's medication schedule:
- Mon 06 Jan 2025, 12:03: Take your Wednesday morning medication from compartment 2
- Mon 06 Jan 2025, 19:51: Time for your blood pressure meds in compartment 1
- Tue 07 Jan 2025, 07:32: Don’t forget your antibiotic dose in compartment 3
- Tue 07 Jan 2025, 14:02: Take your evening medication from compartment 2
- Wed 08 Jan 2025, 22:40: Morning pain relief – compartment 4
- Thu 09 Jan 2025, 10:24: Take your cholesterol medication from compartment 1
- Thu 09 Jan 2025, 13:10: Take your diabetes medication from compartment 2
- Thu 09 Jan 2025, 16:12: Evening vitamin D supplement in compartment 5
- Thu 09 Jan 2025, 19:05: Take your antacid tablet from compartment 3
- Fri 10 Jan 2025, 12:14: Take your anxiety medication before bed
- Sat 11 Jan 2025, 15:05: Compartment 6: Allergy medication reminder
- Sat 11 Jan 2025, 15:53: Urgent: Take your heart medication now
- Sat 11 Jan 2025, 16:55: High alert: Blood thinner in compartment 2
- Sat 11 Jan 2025, 17:21: Routine vitamin B12 dose
- Sun 12 Jan 2025, 11:21: Low dose aspirin in compartment 4
- Sun 12 Jan 2025, 11:27: Midday meds – check compartment 3
- Sun 12 Jan 2025, 11:36: Take your immune booster today
- Sun 12 Jan 2025, 11:56: Evening dose for inflammation – compartment 2
- Sun 12 Jan 2025, 12:04: Important: Take your thyroid medication

Always begin with: 'Category: GREEN/YELLOW/RED' followed by a newline, then your advice.

Be extra cautious when symptoms may be serious and default to RED if unsure.`,
            },
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

      let aiReply = res.data.choices[0].message.content;

      if (aiReply.includes('Category: RED')) {
        aiReply += `\n\n If this feels urgent, please contact your local GP or emergency services in Carlingford, County. Louth. Number 1 2 3 4 5 6 7 `;
      } else if (aiReply.includes('Category: YELLOW')) {
        aiReply += `\n\n You may consult Dundalk Pharmacy for guidance on this issue. Number 9 8 7 6 5 4 3`;
      }

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
        <div style={{ padding: '10px' }}>
          {messages.map((msg, i) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    backgroundColor: isUser
                      ? '#DCF8C6'
                      : msg.content.includes('Category: RED')
                      ? '#f8d7da'
                      : msg.content.includes('Category: YELLOW')
                      ? '#fff3cd'
                      : msg.content.includes('Category: GREEN')
                      ? '#d4edda'
                      : '#F1F0F0',
                    color: 'black',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    borderTopLeftRadius: isUser ? '16px' : '4px',
                    borderTopRightRadius: isUser ? '4px' : '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {isUser ? 'You' : 'AI'}
                  </div>
                  <div>{msg.content}</div>
                </div>

                {!isUser && (
                  <IonButton
                    size="small"
                    fill="clear"
                    onClick={() => speak(msg.content)}
                    style={{
                      marginLeft: '8px',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      fontSize: '16px',
                    }}
                  >
                    🔊
                  </IonButton>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ padding: 10 }}>
          <IonInput
            placeholder="e.g. 'I missed my dose today. What should I do?'"
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
  