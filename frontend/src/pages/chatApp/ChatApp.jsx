import OpenAI from "openai";
import {
  TextField,
  Container,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useState, useEffect } from "react";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});
const emptyThread = await openai.beta.threads.create();

const thread_id = emptyThread.id;

const assistant_id = "asst_vF3Hh83NYYlLvpluB8JvRYOr";

export default function ChatApp() {
  useEffect(() => {});

  //   async function createThread() {

  //     console.log(emptyThread);
  //   }

  //createThread();

  //   async function createMessage() {
  //     const threadMessages = await openai.beta.threads.messages.create(
  //       "thread_fP8I9oLl55GrQFzU1xnlIelv",
  //       { role: "user", content: "How does AI work? Explain it in simple terms." }
  //     );

  //     console.log(threadMessages);
  //   }

  //   createMessage()

  //   async function createRun() {
  //     const run = await openai.beta.threads.runs.create(
  //       "thread_fP8I9oLl55GrQFzU1xnlIelv",
  //       { assistant_id: "asst_vF3Hh83NYYlLvpluB8JvRYOr" }
  //     );

  //     console.log(run);
  //   }

  //  createRun()

  async function listMessages() {
    const threadMessages = await openai.beta.threads.messages.list(thread_id);

    console.log(threadMessages.data);
  }

  setTimeout(() => {
    listMessages();
  }, 10000);

  //   async function getRunStatus() {
  //     const run = await openai.beta.threads.runs.retrieve(
  //       "thread_fP8I9oLl55GrQFzU1xnlIelv",
  //       "run_779X4D2J6tceOuPSwl98Zs0k"
  //     );

  //     console.log(run);
  //   }

  //   getRunStatus()

  const generateRandomMessage = (sender) => {
    const messages = [
      "Hello!"
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    const text = messages[randomIndex];

    return {
      text,
      sender,
    };
  };

  // Use this function to generate initial random messages
  const initialMessages = Array.from({ length: 1 }, () =>
    generateRandomMessage("assistant")
  );

  const [messages, setMessages] = useState(initialMessages);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    async function listMessages() {
      const threadMessages = await openai.beta.threads.messages.list(thread_id);

      // setMessages[...messages,threadMessages.data.map((message)=>message.content.text.value)]

    //   const message = JSON.stringify(threadMessages.data.map((message)=>message))

    //   setMessages(message)

       //setMessages(threadMessages.data.map((message) => message.content.map((content)=>content.text.value)));
       setMessages(
        transformResponse(
        threadMessages.data.map((message) => {
        return {
          content: message.content.map((content) => {
            return {
              text: {
                value: content.text.value
              }
            };
          })
        };
      })
      
       ));

      function transformResponse(inputResponse) {
        const transformedResponse = [];
    
        inputResponse.forEach(entry => {
            entry.content.forEach(item => {
                const textValue = item.text.value;
                if (textValue.toLowerCase() === 'hello! how can i assist you today?') {
                    transformedResponse.push({ text: 'Do you have any specific questions?', sender: 'assistant' });
                } else {
                    transformedResponse.push({ text: textValue, sender: 'assistant' });
                }
            });
        });
    
        return transformedResponse;
    }


      
    }

    setTimeout(() => {
       listMessages();
       
    }, 5000);

     setMessages([...messages, { text: userInput, sender: "user" }]);
    setUserInput("");

    const threadMessages = await openai.beta.threads.messages.create(
      thread_id,
      { role: "user", content: userInput }
    );

    console.log(threadMessages, "message");
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: assistant_id,
    });

    console.log(run, "run object");
  };

  const styles = {
    chatContainer: {
      width: 400,
      border: "1px solid #ccc",
      borderRadius: 8,
      overflow: "hidden",
    },
    chatBox: {
      height: 300,
      overflow: "auto",
      padding: "16px",
    },
    userMessage: {
      textAlign: "right",
      background: "#4caf50",
      color: "#fff",
      padding: "8px",
      borderRadius: "8px",
      marginBottom: "8px",
    },
    assistantMessage: {
      textAlign: "left",
      background: "#eee",
      padding: "8px",
      borderRadius: "8px",
      marginBottom: "8px",
    },
    userInput: {
      display: "flex",
      alignItems: "center",
      padding: "8px",
    },
    inputField: {
      flex: 1,
      marginRight: "8px",
    },
  };

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Cool Chat App
      </Typography>
      <Container style={styles.chatContainer}>
        <Paper style={styles.chatBox} elevation={0}>
          {messages.reverse().map((message, index) => (
            <div
              key={index}
              style={
                message.sender === "user"
                  ? styles.userMessage
                  : styles.assistantMessage
              }
            >
              {message.text}
            </div>
          ))}
          {/* {JSON.stringify(messages)} */}
        </Paper>
        <div style={styles.userInput}>
          <TextField
            style={styles.inputField}
            variant="outlined"
            label="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </Container>
    </Box>
  );
}
