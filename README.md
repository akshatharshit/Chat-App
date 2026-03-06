
# Chat-App

![License](https://img.shields.io/badge/license-ISC-green)

## 📝 Description

Chat-App is a dynamic real-time communication platform built using Express.js and Socket.io. This web-based application enables users to engage in instantaneous, low-latency messaging, providing a seamless and interactive chat experience directly in the browser. By leveraging the power of web sockets, Chat-App ensures reliable and high-speed data transmission for modern web communication.

## ✨ Features

- 🕸️ Web


## 🛠️ Tech Stack

- 🚀 Express.js


## 📦 Key Dependencies

```
bcryptjs: ^3.0.2
cloudinary: ^2.6.1
cookie-parser: ^1.4.7
cors: ^2.8.5
dotenv: ^16.5.0
express: ^5.1.0
jsonwebtoken: ^9.0.2
mongoose: ^8.14.3
multer: ^2.0.1
nodemailer: ^7.0.3
socket.io: ^4.7.2
```

## 🚀 Run Commands

- **dev**: `npm run dev`
- **start**: `npm run start`
- **heroku-postbuild**: `npm run heroku-postbuild`


## 📁 Project Structure

```
.
├── backend
│   ├── package.json
│   └── src
│       ├── controllers
│       │   ├── auth.controller.js
│       │   ├── call.controller.js
│       │   ├── contact.controller.js
│       │   ├── group.controller.js
│       │   ├── groupmessage.controller.js
│       │   └── message.controller.js
│       ├── index.js
│       ├── lib
│       │   ├── cloudinary.js
│       │   ├── db.js
│       │   ├── socket.js
│       │   └── utils.js
│       ├── middleware
│       │   └── auth.middleware.js
│       ├── models
│       │   ├── call.model.js
│       │   ├── contact.model.js
│       │   ├── group.model.js
│       │   ├── message.model.js
│       │   ├── messageGroup.model.js
│       │   ├── status.model.js
│       │   └── user.model.js
│       ├── routes
│       │   ├── auth.route.js
│       │   ├── call.routes.js
│       │   ├── contact.routes.js
│       │   ├── group.route.js
│       │   ├── message.route.js
│       │   └── status.routes.js
│       └── seeds
│           └── user.seed.js
└── frontend
    ├── .vite
    │   └── deps
    │       ├── _metadata.json
    │       ├── axios.js
    │       ├── axios.js.map
    │       ├── chunk-5HNGYYSW.js
    │       ├── chunk-5HNGYYSW.js.map
    │       ├── chunk-G3PMV62Z.js
    │       ├── chunk-G3PMV62Z.js.map
    │       ├── chunk-TVFQMRVC.js
    │       ├── chunk-TVFQMRVC.js.map
    │       ├── lucide-react.js
    │       ├── lucide-react.js.map
    │       ├── package.json
    │       ├── react-dom_client.js
    │       ├── react-dom_client.js.map
    │       ├── react-hot-toast.js
    │       ├── react-hot-toast.js.map
    │       ├── react-router-dom.js
    │       ├── react-router-dom.js.map
    │       ├── react.js
    │       ├── react.js.map
    │       ├── socket__io-client.js
    │       ├── socket__io-client.js.map
    │       ├── zustand.js
    │       └── zustand.js.map
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── public
    │   ├── avatar.png
    │   └── vite.svg
    ├── src
    │   ├── App.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── AuthImagePattern.jsx
    │   │   ├── ChatContainer.jsx
    │   │   ├── ChatHeader.jsx
    │   │   ├── ContributeSection.jsx
    │   │   ├── MessageInput.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── NoChatSelected.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── skeletons
    │   │       ├── MessageSkeleton.jsx
    │   │       └── SidebarSkeleton.jsx
    │   ├── constants
    │   │   └── index.js
    │   ├── index.css
    │   ├── lib
    │   │   ├── axios.js
    │   │   └── utils.js
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── ConatctList.jsx
    │   │   ├── CreateContactForm.jsx
    │   │   ├── CreateGroupPage.jsx
    │   │   ├── EditContactPage.jsx
    │   │   ├── GroupDetails.jsx
    │   │   ├── Home.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   ├── SendEmailPage.jsx
    │   │   ├── SettingsPage.jsx
    │   │   ├── SignUpPage.jsx
    │   │   ├── StatusUploader.jsx
    │   │   ├── StatusViewPage.jsx
    │   │   └── VideoCallPage.jsx
    │   └── store
    │       ├── useAuthStore.js
    │       ├── useCallStore.js
    │       ├── useChatStore.js
    │       ├── useContactStore.js
    │       ├── useGroupStore.js
    │       ├── useStatusStore.js
    │       └── useThemeStore.js
    ├── tailwind.config.js
    ├── vercel.json
    └── vite.config.js
```

## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/akshatharshit/Chat-App.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

---
*This README was generated with ❤️ by ReadmeBuddy*
