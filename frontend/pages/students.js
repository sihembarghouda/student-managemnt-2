import { useState, useEffect } from "react";
import axios from "axios";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        id: "",
        name: "",
        age: "",
        email: "",
        department: { id: "", name: "" },
        formations: [],
    });
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [formations, setFormations] = useState([]);

    useEffect(() => {
        fetchStudents();
        fetchDepartments();
        fetchFormations();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/students");
            setStudents(res.data);
        } catch (err) {
            console.error("Erreur lors du chargement des étudiants :", err);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/departments");
            setDepartments(res.data);
        } catch (err) {
            console.error("Erreur lors du chargement des départements :", err);
        }
    };

    const fetchFormations = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/formations");
            setFormations(res.data);
        } catch (err) {
            console.error("Erreur lors du chargement des formations :", err);
        }
    };

    const addStudent = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:8000/students", form);
            setStudents([...students, res.data]);
            resetForm();
        } catch (err) {
            console.error("Erreur lors de l'ajout :", err);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/students/${id}`);
            setStudents(students.filter((student) => student.id !== id));
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    const editStudent = (student) => {
        setForm({ ...student });
        setEditMode(true);
        setCurrentId(student.id);
    };

    const updateStudent = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://127.0.0.1:8000/students/${currentId}`, form);
            setStudents(students.map((student) => (student.id === currentId ? res.data : student)));
            resetForm();
        } catch (err) {
            console.error("Erreur lors de la mise à jour :", err);
        }
    };

    const resetForm = () => {
        setForm({
            id: "",
            name: "",
            age: "",
            email: "",
            department: { id: "", name: "" },
            formations: [],
        });
        setEditMode(false);
        setCurrentId(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{editMode ? "Modifier l'Étudiant" : "Ajouter un Étudiant"}</h1>

            <form onSubmit={editMode ? updateStudent : addStudent} className="my-4 flex flex-col gap-2">
                <input
                    type="number"
                    placeholder="ID"
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    required
                    className="border p-2"
                    disabled={editMode}
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="border p-2"
                />
                <input
                    type="number"
                    placeholder="Âge"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    required
                    className="border p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="border p-2"
                />

                {/* Sélection du département */}
                <select
                    value={form.department?.id || ""}
                    onChange={(e) => {
                        const selectedId = parseInt(e.target.value);
                        const selectedDept = departments.find((d) => d.id === selectedId);
                        setForm({
                            ...form,
                            department: selectedDept || { id: "", name: "" },
                        });
                    }}
                    required
                    className="border p-2"
                >
                    <option value="">-- Choisir un département --</option>
                    {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                            {dept.name}
                        </option>
                    ))}
                </select>

                {/* Sélection des formations */}


                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {editMode ? "Mettre à jour" : "Ajouter"}
                </button>
                {editMode && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-500 text-white p-2 rounded mt-2"
                    >
                        Annuler
                    </button>
                )}
            </form>

            <h2 className="text-xl font-semibold mt-4">Liste des étudiants</h2>
            <ul className="mt-4">
                {students.map((student) => (
                    <li key={student.id} className="border p-2 my-2 flex justify-between">
                        {student.name} - {student.age} ans - {student.email} - {student.department?.name || "Aucun département"}
                        <div>
                            <button
                                onClick={() => editStudent(student)}
                                className="bg-yellow-500 text-white p-2 rounded mx-2"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => deleteStudent(student.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
