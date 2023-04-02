# Mini Trello Project

This is a mini Trello project consisting of a backend built with Django and Django-graphene and a frontend built with React, react-beautiful-dnd, and Apollo GraphQL.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Description

The mini Trello project is a simple clone of Trello, a popular project management tool. It allows users to create lists, and cards to organize and manage their tasks. The backend of the project is built with Django and Django-graphene, while the frontend is built with React, react-beautiful-dnd, and Apollo GraphQL.

## Features

The mini Trello currently supports the following features:

- List creation and deletion
- Card creation, deletion, and movement between lists
- Real-time updates with polling (for now).

## Technologies

The mini Trello project uses the following technologies:

- Django: A high-level Python web framework for rapid development
- Django-graphene: A library for building GraphQL APIs with Django
- React: A JavaScript library for building user interfaces
- react-beautiful-dnd: A library for adding drag-and-drop functionality to React applications
- headlessui: A library for building accessible, headless UI components
- Apollo GraphQL: A library for building GraphQL clients

## Installation

To install and run the mini Trello project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/iamtinsae/mini-trello.git
```

2. Install the dependencies for the backend:

```bash
cd mini-trello/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Run the Django migrations:

```bash
python manage.py migrate
```

4. Start the Django server:

```bash
python manage.py runserver
```

5. Install the dependencies for the frontend:

```bash
cd mini-trello/frontend
npm install
```

6. Start the React development server:

```bash
npm start
```

7. Open the application in your browser at http://localhost:PORT

## Usage

To use the mini Trello project, follow these steps:

1. Add lists to the board by clicking the "Add a List" button.
2. Add cards to the lists by clicking the "Add a Card" button.
3. Drag and drop cards between lists to organize your tasks.
4. Click on a card to view its details and edit or delete it.
5. Real-time updates will be shown automatically with polling (currently).

## Docker

To run the mini Trello project with Docker, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/iamtinsae/mini-trello.git
```

2. Build the Docker images:

```bash
cd mini-trello/backend
docker build -t backend .
cd ../frontend
docker build -t frontend .
```

3. Run the Docker containers:

```bash
docker run -d -p 8000:8000 backend
docker run -d -p 3000:3000 frontend
```

4. Open the application in your browser at http://localhost:PORT

## Contributing

Contributions are welcome! If you would like to contribute to the mini Trello project, please open a pull request on GitHub.

## License

The mini Trello project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
