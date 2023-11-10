<h1 align="center"> DonorLink</h1>
This is the frontend repository for DonorLink, a web application built with Next.js.
<br>

<div align="center">
 <p>

[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)
![GitHub forks](https://img.shields.io/github/forks/sayyedarib/DonorLink?style=flat&logo=github)
![GitHub Repo stars](https://img.shields.io/github/stars/sayyedarib/DonorLink?style=flat&logo=github)
![GitHub contributors](https://img.shields.io/github/contributors/sayyedarib/DonorLink)
![GitHub last commit](https://img.shields.io/github/last-commit/sayyedarib/DonorLink)
![GitHub repo size](https://img.shields.io/github/repo-size/sayyedarib/DonorLink)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)
![GitHub issues](https://img.shields.io/github/issues/sayyedarib/DonorLink)
![GitHub closed issues](https://img.shields.io/github/issues-closed/sayyedarib/DonorLink)
![GitHub pull requests](https://img.shields.io/github/issues-pr/sayyedarib/DonorLink)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/sayyedarib/DonorLink)

</p>
 </div>
 <br>

<details>
   <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started 📌</a>
      <ul>
        <li><a href="#-tech-stack-used">Tech Stacks used 💻</a></li>
      </ul>
    </li>
   <li><a href="#garbtern-email-feature">Grabtern Email Feature</a></li>
    <li><a href="#-prettier-lint-test-and-how-to-fix-it">Prettier lint Test</a></li>
    <li><a href="#contributing">How to contribute?</a></li>
    <li><a href="#author">Author</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#-thank-you-for-your-contribution">Our Contributors</a></li>
  </ol>
</details>

---
Getting Started

### How To SetUp

To get started with Grabtern Frontend, you'll need to install Node.js and npm on your machine. Then, you can clone this repository and install the dependencies:

- Fork The Repo

```
you can do this by clicking on the green coloured fork button
```

- Clone your forked repo

```
$ git clone https://github.com/<your-username>/grabtern-frontend.git
```

- Go to directory

```
cd DonorLink
```

- Install Dependencies

```
npm install
```
- Create .env.local file in root directory
```
NEXT_PUBLIC_BACKEND_URL = https://donor-link-server.vercel.app
NEXT_PUBLIC_FRONTEND_URL = http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID = you can get this id from google cloud console, it's needed only to enable google sigin in feature
```

- Start LocalHost Server

```
npm run dev
```

This will start the development server on http://localhost:3000/.

---

- And if server stop then

```

npm run build
```

npm start

This will start server

## 🧰 Tech Stack Used

<a href="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="NewLogo">
</a>

<a href="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="NewLogo">
</a>

<a href="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
</a>

<a href="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
</a>

<a href="https://img.shields.io/badge/GitHub%20CI/CD-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white">
<img src="https://img.shields.io/badge/GitHub%20CI/CD-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white">
</a>

---

## DonorLink Email Feature

> Our platform's email service is seamlessly integrated into various sections, enhancing communication and user interaction.

> While the backend remains concealed for security, accessing emails is easy with specific credentials.

> You can create an account, verify it, and also act as a volunteer with verification.

> This way, contributors can fully experience our platform by registering as both Volunteer and Donors.

**Login to ethereal mail.com with these credentials:**

```
"user": "kaelyn.rodriguez@ethereal.email",
"password": "5w3dSkuKT1XrxMBGEY"
```

---

## 🧪 Prettier lint test and How to fix it?

Prettier is a code formatter that helps maintain consistent code style and formatting in your projects. It automatically analyzes your code and applies predefined formatting rules to ensure a standardized appearance.

Linting is the process of analyzing code for potential errors, bugs, and code style violations. It helps identify and highlight problematic code patterns, potential bugs, and adherence to coding standards.

`<b>`"Prettier lint test" `</b>` refers to running a linter (such as ESLint) with the Prettier plugin or rules enabled. It means checking your code for both linting errors and code formatting inconsistencies according to Prettier's rules.

To enable automatic code formatting upon saving in Visual Studio Code, you can install the Prettier extension. This extension ensures that your code is consistently formatted and adheres to the defined style guidelines. Once installed, Prettier will format your code automatically whenever you save a file.

In case you prefer not to install the Prettier extension, there are two helpful commands you can use:

1. `npx prettier --check .`.: This command checks your codebase for any formatting issues without making any changes. It identifies areas where the formatting may not align with the defined rules.
2. `npx prettier --write .` .: This command automatically fixes the formatting issues in your codebase. It applies the appropriate formatting changes to ensure consistency and adherence to the defined style guidelines.
   By utilizing these commands, you can easily verify the formatting of your codebase and address any inconsistencies or style violations, even without having the Prettier extension installed.

---

## Contributing

If you'd like to contribute to DonorLink:-

- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/sayyedarib/DonorLink/issues/new) to discuss it, or directly create a pull request after you edit the _README.md_ file with necessary changes.
- Please make sure you check your spelling and grammar.
- Create individual PR for each suggestion.
- Please also read through the [Code Of Conduct](https://github.com//sayyedarib/DonorLink/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

---

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch

   `git checkout -b <new_branch_name>`

3. Save your changes

   `git add .`

4. Commit your Changes

   `git commit -m 'Added some AmazingFeature'`

5. Push to the Branch

   `git push origin <branch_name>`

6. Open a Pull Request

---

## ✨ Thank You for Your Contribution!

<a href="https://github.com/sayyedarib/DonorLink/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sayyedarib/DonorLink" />
</a>

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Sayyed Arib Hussain](https://github.com/sayyedarib)

<h3 align="center">Show some ❤️ by 🌟 this awesome repository!</h3>
