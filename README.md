<div align="center">

  <a href="https://chat-app-frontend-coral-one.vercel.app">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=40&pause=1000&color=2ecc71&center=true&vCenter=true&width=800&height=100&lines=Chat-App;socket.io" alt="Typing SVG" />
  </a>

[![GitHub Stars](https://img.shields.io/github/stars/akshatharshit/Chat-App?style=for-the-badge&logo=github&logoColor=white&color=0969da)](https://github.com/akshatharshit/Chat-App/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/akshatharshit/Chat-App?style=for-the-badge&logo=git&logoColor=white&color=8250df)](https://github.com/akshatharshit/Chat-App/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/akshatharshit/Chat-App?style=for-the-badge&logo=github&logoColor=white&color=e5534b)](https://github.com/akshatharshit/Chat-App/issues)
[![GitHub License](https://img.shields.io/github/license/akshatharshit/Chat-App?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=2da44e)](https://github.com/akshatharshit/Chat-App/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/akshatharshit/Chat-App?style=for-the-badge&logo=git&logoColor=white&color=f9826c)](https://github.com/akshatharshit/Chat-App/commits)

![JavaScript](https://img.shields.io/badge/JavaScript-f1e05a?style=for-the-badge&logo=javascript&logoColor=white) ![HTML](https://img.shields.io/badge/HTML-e34c26?style=for-the-badge&logo=html&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-563d7c?style=for-the-badge&logo=css&logoColor=white)

### [🌐 Live Demo](https://chat-app-frontend-coral-one.vercel.app)

</div>

<br>
<p align="center"><img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" alt="divider" width="100%" /></p>
<br>

## 📊 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=akshatharshit&repo=Chat-App&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117&text_color=c9d1d9&title_color=58a6ff" alt="GitHub Stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=akshatharshit&theme=radical&layout=compact&hide_border=true&bg_color=0D1117&text_color=c9d1d9&title_color=58a6ff" alt="Top Languages" />
</div>

## 📋 Table of Contents

- [GitHub Stats](#github-stats)
- [Overview](#overview)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Feedback & Issues](#feedback-issues)
- [FAQ](#faq)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Support](#support)

## 📖 Overview

**Chat-App** is a 🖥️ frontend application.

socket.io

## 📸 Screenshots

> Add your screenshots here. The image below is a placeholder!

<div align="center">
  <img src="https://via.placeholder.com/800x400.png?text=Project+Screenshot+or+GIF" alt="Project Screenshot" width="800" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
</div>

## 🛠️ Tech Stack

**Languages:**
- JavaScript — 99.9%
- HTML — 0.0%
- CSS — 0.0%

## 🏗️ Project Structure

<details>
<summary><b>📁 Toggle Directory Tree</b></summary>
<br>
```bash
├── 📁 backend
│   ├── 📂 src
│   │   ├── 🔌 controllers
│   │   │   ├── 📜 auth.controller.js
│   │   │   ├── 📜 call.controller.js
│   │   │   ├── 📜 contact.controller.js
│   │   │   ├── 📜 group.controller.js
│   │   │   ├── 📜 groupmessage.controller.js
│   │   │   └── 📜 message.controller.js
│   │   ├── 📂 lib
│   │   │   ├── 📜 cloudinary.js
│   │   │   ├── 📜 db.js
│   │   │   ├── 📜 socket.js
│   │   │   └── 📜 utils.js
│   │   ├── 🔗 middleware
│   │   │   └── 📜 auth.middleware.js
│   │   ├── 🗃️ models
│   │   │   ├── 📜 call.model.js
│   │   │   ├── 📜 contact.model.js
│   │   │   ├── 📜 group.model.js
│   │   │   ├── 📜 message.model.js
│   │   │   ├── 📜 messageGroup.model.js
│   │   │   ├── 📜 status.model.js
│   │   │   └── 📜 user.model.js
│   │   ├── 🔌 routes
│   │   │   ├── 📜 auth.route.js
│   │   │   ├── 📜 call.routes.js
│   │   │   ├── 📜 contact.routes.js
│   │   │   ├── 📜 group.route.js
│   │   │   ├── 📜 message.route.js
│   │   │   └── 📜 status.routes.js
│   │   ├── 🌱 seeds
│   │   │   └── 📜 user.seed.js
│   │   └── 📜 index.js
│   ├── 🙈 .gitignore
│   ├── 🔒 package-lock.json
│   └── 📦 package.json
├── 📁 frontend
│   ├── 📁 .vite
│   │   └── 📁 deps
│   │       ├── 📋 _metadata.json
│   │       ├── 📜 axios.js
│   │       ├── 📄 axios.js.map
│   │       ├── 📜 chunk-5HNGYYSW.js
│   │       ├── 📄 chunk-5HNGYYSW.js.map
│   │       ├── 📜 chunk-G3PMV62Z.js
│   │       ├── 📄 chunk-G3PMV62Z.js.map
│   │       ├── 📜 chunk-TVFQMRVC.js
│   │       ├── 📄 chunk-TVFQMRVC.js.map
│   │       ├── 📜 lucide-react.js
│   │       ├── 📄 lucide-react.js.map
│   │       ├── 📦 package.json
│   │       ├── 📜 react-dom_client.js
│   │       ├── 📄 react-dom_client.js.map
│   │       ├── 📜 react-hot-toast.js
│   │       ├── 📄 react-hot-toast.js.map
│   │       ├── 📜 react-router-dom.js
│   │       ├── 📄 react-router-dom.js.map
│   │       ├── 📜 react.js
│   │       ├── 📄 react.js.map
│   │       ├── 📜 socket__io-client.js
│   │       ├── 📄 socket__io-client.js.map
│   │       ├── 📜 zustand.js
│   │       └── 📄 zustand.js.map
│   ├── 🌍 public
│   │   ├── 🖼️ avatar.png
│   │   └── 🖼️ vite.svg
│   ├── 📂 src
│   │   ├── 🖼️ assets
│   │   │   └── 🖼️ react.svg
│   │   ├── 🧩 components
│   │   │   ├── 📁 skeletons
│   │   │   │   ├── ⚛️ MessageSkeleton.jsx
│   │   │   │   └── ⚛️ SidebarSkeleton.jsx
│   │   │   ├── ⚛️ AuthImagePattern.jsx
│   │   │   ├── ⚛️ ChatContainer.jsx
│   │   │   ├── ⚛️ ChatHeader.jsx
│   │   │   ├── ⚛️ ContributeSection.jsx
│   │   │   ├── ⚛️ MessageInput.jsx
│   │   │   ├── ⚛️ Navbar.jsx
│   │   │   ├── ⚛️ NoChatSelected.jsx
│   │   │   └── ⚛️ Sidebar.jsx
│   │   ├── 📁 constants
│   │   │   └── 📜 index.js
│   │   ├── 📂 lib
│   │   │   ├── 📜 axios.js
│   │   │   └── 📜 utils.js
│   │   ├── 📄 pages
│   │   │   ├── ⚛️ ConatctList.jsx
│   │   │   ├── ⚛️ CreateContactForm.jsx
│   │   │   ├── ⚛️ CreateGroupPage.jsx
│   │   │   ├── ⚛️ EditContactPage.jsx
│   │   │   ├── ⚛️ GroupDetails.jsx
│   │   │   ├── ⚛️ Home.jsx
│   │   │   ├── ⚛️ HomePage.jsx
│   │   │   ├── ⚛️ LoginPage.jsx
│   │   │   ├── ⚛️ ProfilePage.jsx
│   │   │   ├── ⚛️ SendEmailPage.jsx
│   │   │   ├── ⚛️ SettingsPage.jsx
│   │   │   ├── ⚛️ SignUpPage.jsx
│   │   │   ├── ⚛️ StatusUploader.jsx
│   │   │   ├── ⚛️ StatusViewPage.jsx
│   │   │   └── ⚛️ VideoCallPage.jsx
│   │   ├── 🗄️ store
│   │   │   ├── 📜 useAuthStore.js
│   │   │   ├── 📜 useCallStore.js
│   │   │   ├── 📜 useChatStore.js
│   │   │   ├── 📜 useContactStore.js
│   │   │   ├── 📜 useGroupStore.js
│   │   │   ├── 📜 useStatusStore.js
│   │   │   └── 📜 useThemeStore.js
│   │   ├── ⚛️ App.jsx
│   │   ├── 🎨 index.css
│   │   └── ⚛️ main.jsx
│   ├── 🙈 .gitignore
│   ├── 🔧 eslint.config.js
│   ├── 🌐 index.html
│   ├── 🔒 package-lock.json
│   ├── 📦 package.json
│   ├── 📝 README.md
│   ├── 🎨 tailwind.config.js
│   ├── 📋 vercel.json
│   └── ⚡ vite.config.js
└── 📝 README.md
```
</details>

## 🚀 Getting Started

### Prerequisites

### Installation

```bash
# Clone the repository
git clone https://github.com/akshatharshit/Chat-App.git

# Navigate to project directory
cd Chat-App

```

## 🛣️ Roadmap

- [x] **Phase 1**: Initial Release & Core Features
- [ ] **Phase 2**: Extended Functionality
- [ ] **Phase 3**: Community Integrations & Ecosystem

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contributors

<a href="https://github.com/akshatharshit/Chat-App/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=akshatharshit/Chat-App" alt="Contributors" />
</a>

## 🐛 Feedback & Issues

Have feedback or found a bug? We'd love to hear from you!

- [Report a Bug](https://github.com/akshatharshit/Chat-App/issues/new?assignees=&labels=bug&template=bug_report.md&title=)
- [Request a Feature](https://github.com/akshatharshit/Chat-App/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)

## ❓ FAQ

<details>
  <summary><b>Why should I use this project?</b></summary>
  <br/>
  Because it's awesome and will save you tons of time!
</details>

<details>
  <summary><b>How do I contribute?</b></summary>
  <br/>
  Check out the <a href="#contributing">Contributing</a> section for details.
</details>

## 📄 License

This project does not currently specify a license.

## 🎉 Acknowledgments

- [Awesome Project](https://github.com/awesome/project)
- [Cool Resource](https://example.com)

## 💬 Support & Contact

If you found this project helpful, please consider giving it a ⭐ on [GitHub](https://github.com/akshatharshit/Chat-App)!

For support, business inquiries, or to report an issue, please open an issue in the repository or contact the maintainer.

<br>
<p align="center"><img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" alt="divider" width="100%" /></p>
<br>

<p align="center">Made with ❤️ by <a href="https://github.com/akshatharshit"><b>@akshatharshit</b></a></p>
