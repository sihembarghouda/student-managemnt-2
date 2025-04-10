
# 🎓 Gestion des Étudiants - Projet Web Fullstack

Ce projet est une application web complète permettant de gérer des étudiants, leurs départements, et les formations qu'ils suivent. Il comporte :

- ✅ Une API Backend développée avec **FastAPI**.
- ✅ Un Frontend Étudiant avec **Next.js**.
- ✅ Un Frontend Admin avec **Angular**.
- ✅ Une base de données **PostgreSQL** (ou MongoDB/Neon).
- ✅ Des pages publiques comme Accueil, Contact, et Services.

---

## 🔧 Fonctionnalités

### Côté Étudiant (Next.js)
- Inscription d'un nouvel étudiant.
- Choix du département.
- Inscription à une ou plusieurs formations.
- Visualisation du profil et des formations suivies.

### Côté Admin (Angular)
- CRUD Étudiants.
- CRUD Formations.
- Visualisation des départements.
- Affichage de statistiques.

### Backend (FastAPI)
- Endpoints pour gérer les étudiants, les départements et les formations.
- Middleware CORS configuré.
- Données sauvegardées dans une base PostgreSQL ou MongoDB.

---

## 🗃️ Exemple de données initiales

### Départements
- Informatique
- Génie Civil
- Génie Électrique

### Formations
- Développement Web
- Intelligence Artificielle
- Réseaux Informatiques
- Gestion de Projet
- Bases de Données Avancées

---

## ⚙️ Stack technique

| Côté       | Technologie      |
|------------|------------------|
| Frontend 1 | Next.js (React)  |
| Frontend 2 | Angular           |
| Backend    | FastAPI (Python) |
| BDD        | PostgreSQL / MongoDB |

---

## 🚀 Lancement du projet

### 1. Backend (FastAPI)
```bash
uvicorn main:app --reload
```

### 2. Frontend Étudiant (Next.js)
```bash
cd frontend-next
npm install
npm run dev
```

### 3. Frontend Admin (Angular)
```bash
cd frontend-angular
npm install
ng serve
```

---

## 📝 Documentation du code

Chaque partie du code est commentée et expliquée :
- 📁 `main.py` contient toutes les routes API.
- 📁 `students.js` gère les formulaires d'ajout, d'édition et de visualisation.
- La logique de sélection des départements et formations est entièrement intégrée.

---

## 📞 Pages Publiques
- `/` : Page d'accueil
- `/contact` : Formulaire de contact
- `/services` : Liste des fonctionnalités offertes

---

## 🧠 Auteur
Projet réalisé dans le cadre d’un stage pour apprendre à créer des applications web fullstack avec gestion complète de données.
