from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# ✅ Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En prod, remplace "*" par ton frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------- Modèles ---------
class Department(BaseModel):
    id: int
    name: str

class Formation(BaseModel):
    id: int
    name: str

class Student(BaseModel):
    id: int
    name: str
    age: int
    email: str
    department: Department
    formations: List[Formation] = []

# --------- Bases de données temporaires ---------
students_db: List[Student] = []
departments_db: List[Department] = [
    Department(id=1, name="Informatique"),
    Department(id=2, name="Génie Civil"),
    Department(id=3, name="Génie Électrique")
]
formations_db: List[Formation] = []

# --------- Routes API ---------

# 1️⃣ Étudiants
@app.get("/students", response_model=List[Student])
def get_students():
    return students_db

@app.post("/students", response_model=Student)
def add_student(student: Student):
    students_db.append(student)
    return student

@app.put("/students/{student_id}", response_model=Student)
def update_student(student_id: int, updated_student: Student):
    for i, student in enumerate(students_db):
        if student.id == student_id:
            students_db[i] = updated_student
            return updated_student
    raise HTTPException(status_code=404, detail="Étudiant non trouvé")

@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    for i, student in enumerate(students_db):
        if student.id == student_id:
            del students_db[i]
            return {"message": "Étudiant supprimé avec succès"}
    raise HTTPException(status_code=404, detail="Étudiant non trouvé")

# 2️⃣ Départements
@app.get("/departments", response_model=List[Department])
def get_departments():
    return departments_db

@app.post("/departments", response_model=Department)
def add_department(department: Department):
    departments_db.append(department)
    return department

# 3️⃣ Formations
@app.get("/formations", response_model=List[Formation])
def get_formations():
    return formations_db

@app.post("/formations", response_model=Formation)
def add_formation(formation: Formation):
    formations_db.append(formation)
    return formation
