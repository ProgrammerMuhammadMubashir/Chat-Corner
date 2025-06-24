# Chat App - Real-Time Messaging Platform



A modern, responsive chat application with real-time bi-directional messaging, user authentication, and dark mode support.

## ✨ Features

### 🔒 Authentication & Security
- **Cookie-Session Authentication**: Secure user sessions with encrypted cookies
- **Forget Password Functionality**: Self-service password reset via email
- **Protected Routes**: Ensure only authenticated users can access chats

### 💬 Real-Time Chat
- **Bi-Directional Messaging**: Instant message delivery between users
- **Online Status Indicators**: See who's currently active
- **Typing Indicators**: Visual feedback when others are typing

### 🎨 UI/UX
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Fully Responsive**: Works on desktop, tablet, and mobile devices
- **Modern Interface**: Clean, intuitive user interface

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (or MongoDB Atlas)
- npm or yarn


### 🖥️ Usage
- Register a new account or login  
- Use the password reset feature if needed  
- Toggle dark/light mode from the settings  
- Start chatting with other users  
- See real-time typing indicators  

### 🛠️ Built With
- **Frontend**: Plain HTML and CSS
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Real-Time**: Socket.io  
- **Authentication**: cookie-session  

### 🤝 Contributing
Contributions are welcome! Please follow these steps:  
1. Fork the project  
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some amazing feature'`)  
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/chat-app.git
cd chat-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit the .env file with your credentials

# Start the development server
npm run dev
