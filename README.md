# Yam Master

![screencapture-localhost-8081-2024-05-12-23_46_31](https://github.com/jul-fls/Epsi-Architecture-Applicatives-Yam/assets/93679283/cf5f74cd-6510-4cbe-ae44-5514d75dc9a1)


## 1) Jeu en ligne
https://github.com/jul-fls/Epsi-Architecture-Applicatives-Yam/assets/93679283/3ecf3de9-caae-4075-95c3-6218a868c07a

## 2) En attente de joueur
https://github.com/jul-fls/Epsi-Architecture-Applicatives-Yam/assets/93679283/f911fdf1-d292-4504-a6b7-998496e6ab17

## 3) Résumé de la partie
https://github.com/jul-fls/Epsi-Architecture-Applicatives-Yam/assets/93679283/81f731e2-7eb7-4cc3-a2a5-97cfe6b2a851



Yam Master is a strategic dice game where players aim to score points by placing their pieces on the game board, creating alignments, and blocking their opponent's pieces. The objective is to achieve the highest score or to create a horizontal, vertical, or diagonal alignment of five pieces.

## Description

Yam Master is an adaptation of the classic dice game Yam's. Players take turns rolling five dice and trying to achieve different combinations, which allow them to place their pieces on the game board. The game continues until one player runs out of pieces or achieves an alignment of five pieces, resulting in an instant victory.

## Game Rules

For detailed rules of the game, please refer to the [Game Rules](https://regle.escaleajeux.fr/yamma_rg.pdf) section below.

## Installation

### 1. Clone the repository:

   ```bash
   git clone https://github.com/jul-fls/Epsi-Architecture-Applicatives-Yam.git
   ```

### 2. Install dependencies:

- FRONT :
  ```bash
  npm install
  ```

- BACK (Web Socket) :
  ```bash
  cd backend/
  npm install
  ```

### 3. Navigate to the project directory:

![image](https://github.com/jul-fls/Epsi-Architecture-Applicatives-Yam/assets/93679283/7f8c2d2c-00ba-4710-9bfa-964a2d675561)

- FRONT :
  ```bash
  cd app/
  ```

- BACK (Web Socket) :
  ```bash
  cd backend/
  ```

## Usage

### 1. Prepare two terminals so as to launch FRONT and BACK
   
- FRONT :
  ```bash
  npx expo start
  ```

- BACK (Web Socket) :
  ```bash
  cd backend/
  npm run start
  ```

### 2. (WEB) Enter `127.0.0.1:8081` in your navigator.

### 3. (MOBILE) Follow the instructions provided to run the application on your desired platform (e.g., iOS simulator, Android emulator or [expo go](https://expo.dev/go)).



## Contributors
- Julien FLUSIN
- Sangmin SHIM

(4/15/2024 ~ 5/12/2024)
